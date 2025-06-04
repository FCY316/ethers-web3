import {
  BrowserProvider,
  JsonRpcSigner,
} from 'ethers';
import { create } from 'zustand';

import { evmChain } from '@/collocate';
import { objKeyObjectType } from '@/interface';

import connectedWalletEvm from '../tools/connected/connectedWalletEvm';
import contractEvm, { intContractEvm } from '../tools/contract/contractEvm';
import { changeChainID } from '../tools/setChain/changeChain';
import {
  removeLocal,
  setLocal,
} from '../tools/strage';
import {
  watchSetAddressEvm,
  watchSetNetWorkEvm,
} from '../tools/watch/watchEvm';

/**
 * 定义 EVM 兼容钱包的连接状态接口
 */
interface ConnectWalletSolState {
  connectWalletEvmStore: (
    walletName: string,
    watchChangeFun?: Function,
    changeChain?: boolean
  ) => Promise<void>; // 连接 EVM 钱包的函数,第二个参数是当钱包地址发生变化时，需要执行的函数
  disconnectWalletEvmStore: Function; // 断开 EVM 钱包连接的函数
  chainId: number | null; // 当前连接的钱包链ID
  walletNameEvm: string | null; // 当前连接的钱包名称
  addressEvm: string; // 当前连接的钱包地址
  providerEvm: BrowserProvider | null; // EVM 钱包的提供者对象
  signer: JsonRpcSigner | null; // EVM 钱包的签名者对象
  contractEvm: objKeyObjectType; // EVM 钱包的合约对象
}

/**
 * 使用 Zustand 创建一个管理 EVM 兼容钱包连接状态的 store
 * 该 store 提供钱包的连接、断开和状态管理功能
 */
export const useConnectWalletEvmStore = create<ConnectWalletSolState>(
  (set, get) => {
    // 初始化钱包名称变量
    const walletNameEvm: string | null = "";
    /**
     * 连接 EVM 兼容钱包
     * @param walletName 钱包名称
     * @param watchChangeFun 当钱包地址发生变化时执行的回调函数
     */
    const connectWalletEvmStore = async (
      walletName: string,
      watchChangeFun?: Function,
      changeChain: boolean = true
    ) => {
      try {
        // 调用工具函数连接钱包，获取地址和提供者
        const result = await connectedWalletEvm(walletName); // 连接钱包并获取地址和提供者
        if (!result) {
          throw new Error("connectedWalletEvm returned undefined");
        }
        const { addressEvm, providerEvm, signer } = result;
        const network = await providerEvm.getNetwork();
        // 输出当前连接的链的信息
        // 将链 ID 转换为字符串，并去掉后缀 "n"
        const chainId = network.chainId.toString(); // 将链 ID 转换为字符串以便处理
        const chainIdWithoutSuffix = chainId.endsWith("n")
          ? Number(chainId.slice(0, -1)) // 去掉后缀 "n"，将链 ID 转换为数字
          : Number(chainId);
        if (!evmChain.includes(chainIdWithoutSuffix) && changeChain) {
          changeChainID(providerEvm, evmChain[0]);
        }
        // 设置地址切换监听器，确保地址变化时能够自动重新连接
        await watchSetAddressEvm(walletName, async () => {
          const isAddressEvm = get().addressEvm;
          if (!isAddressEvm) return; // 如果没有地址代表用户已经退出钱包，则不进行任何操作
          // 用户地址出现变化后，需要重新进行签名，但是用户的地址是一直存在的，只是发生变化，而token是会清空的，如果token先被清空的话，需要重新进行签名，然后地址发生更新，又进行签名，会出现两次
          // 所以需要先改变地址，让后进行删除token，这样才不会出现两次签名
          await connectWalletEvmStore(walletName, watchChangeFun, false);
          watchChangeFun && watchChangeFun(); // 只有在 watchChangeFun 存在时才调用
        });
        await watchSetNetWorkEvm(walletName, async () => {
          const isAddressEvm = get().addressEvm;
          if (!isAddressEvm) return; // 如果没有地址代表用户已经退出钱包，则不进行任何操作
          // 用户网络发生变化后，需要重新进行签名，但是用户的地址是一直存在的，只是发生变化，而token是会清空的，如果token先被清空的话，需要重新进行签名，然后地址发生更新，又进行签名，会出现两次
          // 所以需要先改变地址，让后进行删除token，这样才不会出现两次签名
          await connectWalletEvmStore(walletName, watchChangeFun, false);
          watchChangeFun && watchChangeFun(); // 只有在 watchChangeFun 存在时才调用
        });
        // new出合约
        const contract = contractEvm(chainIdWithoutSuffix, signer);
        // 将钱包名称存储到本地存储中
        setLocal("walletEvm", walletName);
        // 将链的类型存入本地存储
        setLocal("chainType", "evm");
        // 更新 Zustand 的状态
        set({
          addressEvm,
          providerEvm,
          signer,
          contractEvm: contract,
          walletNameEvm: walletName,
          chainId: chainIdWithoutSuffix,
        });
      } catch (e) {
        console.log("error-connectedWalletEvm", e);
      }
    };

    /**
     * 断开当前连接的 EVM 兼容钱包
     */
    const disconnectWalletEvmStore = () => {
      try {
        // 移除本地存储中的钱包名称
        removeLocal("walletEvm"); // 清除本地存储中的钱包名称
        // 移除本地存储中的链类型
        removeLocal("chainType"); // 清除本地存储中的链类型
        // 清空 Zustand 状态以重置连接信息
        set({
          addressEvm: "",
          providerEvm: null,
          walletNameEvm: "",
          signer: null,
          contractEvm: intContractEvm,
        });
        // 获取当前提供者并调用断开连接的方法
        const providerEvm = get().providerEvm;
        (providerEvm as any)?.disconnect(); // 调用钱包提供者的断开方法，可能会导致钱包状态被重置
      } catch (e) {
        console.log("error-disconnectWalletEvmStore", e);
      }
    };

    return {
      connectWalletEvmStore, // 连接钱包方法
      addressEvm: "", // 钱包地址，初始为空
      walletNameEvm, // 钱包名称，初始为空
      disconnectWalletEvmStore, // 断开钱包方法
      chainId: null, // 当前链ID，初始为空
      providerEvm: null, // 钱包提供者，初始为 null
      signer: null, // 钱包签名者，初始为 null
      contractEvm: intContractEvm,
    };
  }
);
