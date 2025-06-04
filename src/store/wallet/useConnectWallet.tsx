import {
  ChainsBigType,
  ChainsTypeKeyFun,
  ChainsTypeKeyStr,
} from '@/interface';

import { useConnectWalletEvmStore } from './connectWallet/useWalletEvm';
import { changeChainID } from './tools/setChain/changeChain';

/**
 * 钱包连接钩子
 * 根据指定的链类型，返回与该链相关的钱包连接信息和操作函数
 *
 * @param chain 链类型，用于指定需要连接的钱包链
 * @returns 返回一个对象，包含指定链的钱包地址、连接钱包函数、断开钱包函数、provider、钱包名称和连接状态
 */
const useConnectWallet = (chainType: ChainsBigType = 'evm') => {
    // 使用EVM钱包状态管理
    const { addressEvm, connectWalletEvmStore, disconnectWalletEvmStore, providerEvm, walletNameEvm, chainId, signer, contractEvm } = useConnectWalletEvmStore()

    // 定义一个对象，用于根据链类型获取钱包地址
    const addressData: ChainsTypeKeyStr = {
        evm: addressEvm,
    }

    // 定义一个对象，用于根据链类型获取连接钱包的函数
    const connectWalletStore: ChainsTypeKeyFun = {
        evm: (walletName: string, watchChangeFun: Function) => {
            connectWalletEvmStore(walletName, watchChangeFun)
        },

    }

    // 定义一个对象，用于根据链类型获取断开钱包连接的函数
    const disconnectWalletStore: ChainsTypeKeyFun = {
        evm: disconnectWalletEvmStore,
    }

    // 定义一个对象，用于根据链类型获取provider
    const providerData = {
        evm: providerEvm,
    }

    // 定义一个对象，用于根据链类型获取钱包名称
    const walletNameData = {
        evm: walletNameEvm,
    }
    const changeChainIDFun = (chainID: number) => {
        providerData["evm"] && changeChainID(providerData["evm"], chainID)
    }
    // 返回与指定链相关的钱包连接信息和操作函数
    return {
        address: addressData[chainType],
        connectWalletStore: connectWalletStore[chainType],
        disconnectWalletStore: disconnectWalletStore[chainType],
        provider: providerData[chainType],
        walletName: walletNameData[chainType],
        chainId: chainId, // evm 专用
        changeChainIDFun, // evm 专用 切链
        signer, // evm 专用 签名
        contractEvm, // evm 专用 合约
    }
}

export default useConnectWallet