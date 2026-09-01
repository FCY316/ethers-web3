import { ChainsBigType } from "@/interface";

import { useConnectWalletEvmStore } from "./connectWallet/useWalletEvm";
import { changeChainID } from "./tools/setChain/changeChain";

/**
 * 页面使用的钱包连接 Hook。
 *
 * 该 Hook 将 Zustand 中 EVM 专用字段整理为组件可直接使用的 API。调用
 * connectWalletStore() 不带 UUID 时会打开全局钱包选择弹窗；弹窗再将用户选择的
 * EIP-6963 UUID 传回 connectWalletStore(uuid)，从而保证连接对象确定且可追溯。
 */
const useConnectWallet = (chainType: ChainsBigType = "evm") => {
  const {
    addressEvm,
    connectWalletEvmStore,
    disconnectWalletEvmStore,
    discoverWalletProviders,
    walletProviders,
    providerEvm,
    walletNameEvm,
    walletProviderUuidEvm,
    chainId,
    signer,
    contractEvm,
  } = useConnectWalletEvmStore();

  /** 当前已连接 provider 才可以切链；未连接时返回 false 便于调用方安全判断。 */
  const changeChainIDFun = (chainID: number): Promise<boolean> => {
    if (providerEvm) return changeChainID(providerEvm, chainID);
    return Promise.resolve(false);
  };

  // 当前项目只有 EVM 实现，显式报错可防止未来加入链类型时静默返回错误状态。
  if (chainType !== "evm") {
    throw new Error(`Unsupported chain type: ${chainType}`);
  }

  return {
    address: addressEvm,
    connectWalletStore: connectWalletEvmStore,
    disconnectWalletStore: disconnectWalletEvmStore,
    discoverWalletProviders,
    walletProviders,
    provider: providerEvm,
    walletName: walletNameEvm,
    walletProviderUuid: walletProviderUuidEvm,
    chainId,
    changeChainIDFun,
    signer,
    contractEvm,
  };
};

export default useConnectWallet;
