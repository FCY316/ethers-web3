import { useEffect } from 'react';

import { useConnectWalletEvmStore } from './connectWallet/useWalletEvm';
import { getLocal } from './tools/strage';

/**
 * 自定义 Hook，用于在组件中初始化 Solana 钱包连接
 * @param chain 当前区块链类型
 */
export const useConnectWalletInt = (removeLocalToken?: Function) => {
    const { connectWalletEvmStore } = useConnectWalletEvmStore();
    useEffect(() => {
        const chainType = getLocal("chainType")
        if (chainType === "evm") {
            const walletNameEvmLocal = getLocal("walletEvm");
            if (walletNameEvmLocal) {
                connectWalletEvmStore(walletNameEvmLocal, removeLocalToken);
            }
        }
    }, [connectWalletEvmStore, removeLocalToken]);
};
