
// 引入 ethers 库中的 Contract 和 JsonRpcProvider，用于与区块链交互
import { Contract, JsonRpcProvider } from 'ethers';
// 引入 zustand 用于创建全局状态管理
import { create } from 'zustand';

// 引入链参数配置
import { chainParams } from '@/collocate';

// 引入 EVM 合约地址和 ABI 配置
import { evmCAddress } from '../wallet/tools/contract/cAddress';


// AppState 定义了 FiboChain RPC 相关的全局状态结构
interface AppState {
  // 只读 EVM provider
  providerEvmReadOnly: JsonRpcProvider | null;
  // Router 合约只读实例
  routerAbiReadOnly: Contract | null;
  // Factory 合约只读实例
  factoryAbiReadOnly: Contract | null;
  // 错误信息
  error?: string | null;
}


/**
 * useFiboChainRpc
 * 用于初始化 FiboChain 的只读 provider 及相关合约实例，并通过 zustand 管理全局状态。
 * 主要用于前端只读访问链上数据。
 */
const useFiboChainRpc = create<AppState>((set) => {
  let providerEvmReadOnly: JsonRpcProvider | null = null;
  let routerAbiReadOnly: Contract | null = null;
  let factoryAbiReadOnly: Contract | null = null;
  let error: string | null = null;
  try {
    // 创建只读 provider，连接 FiboChain 的 RPC 节点
    providerEvmReadOnly = new JsonRpcProvider(chainParams[12306].rpcUrls[0]);

    // 创建 Router 合约只读实例
    routerAbiReadOnly = new Contract(
      evmCAddress[12306].router.address,
      evmCAddress[12306].router.abi,
      providerEvmReadOnly
    );
    // 创建 Factory 合约只读实例
    factoryAbiReadOnly = new Contract(
      evmCAddress[12306].factory.address,
      evmCAddress[12306].factory.abi,
      providerEvmReadOnly
    );
  } catch (err) {
    // 捕获初始化异常并记录错误信息
    error = (err as Error).message || '初始化失败';
    console.error('初始化 FiboChain RPC 失败:', err);
  }

  // 返回全局状态
  return {
    providerEvmReadOnly,
    routerAbiReadOnly,
    factoryAbiReadOnly,
    error,
  };
});


// 导出 useFiboChainRpc 供全局使用
export default useFiboChainRpc;