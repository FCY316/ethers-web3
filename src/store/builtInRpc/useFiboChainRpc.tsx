import {
  Contract,
  JsonRpcProvider,
} from 'ethers';
import { create } from 'zustand';

import { chainParams } from '@/collocate';

import { evmCAddress } from '../wallet/tools/contract/cAddress';

interface AppState {
  providerEvmReadOnly: JsonRpcProvider | null;
  routerAbiReadOnly: Contract | null;
  factoryAbiReadOnly: Contract | null;
  error?: string | null;
}

const useFiboChainRpc = create<AppState>((set) => {
  let providerEvmReadOnly: JsonRpcProvider | null = null;
  let routerAbiReadOnly: Contract | null = null;
  let factoryAbiReadOnly: Contract | null = null
  let error: string | null = null;
  try {
    // 尝试创建 provider
    providerEvmReadOnly = new JsonRpcProvider(chainParams[12306].rpcUrls[0]);

    // 尝试创建合约实例
    routerAbiReadOnly = new Contract(
      evmCAddress[12306].router.address,
      evmCAddress[12306].router.abi,
      providerEvmReadOnly
    );
    factoryAbiReadOnly = new Contract(
      evmCAddress[12306].factory.address,
      evmCAddress[12306].factory.abi,
      providerEvmReadOnly
    );
  } catch (err) {
    error = (err as Error).message || '初始化失败';
    console.error('初始化 FiboChain RPC 失败:', err);
  }

  return {
    providerEvmReadOnly,
    routerAbiReadOnly,
    factoryAbiReadOnly,
    error,
  };
});

export default useFiboChainRpc;