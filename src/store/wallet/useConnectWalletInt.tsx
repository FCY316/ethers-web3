import { useEffect } from 'react';

import {
    SELECTED_PROVIDER_STORAGE_KEY,
    useConnectWalletEvmStore,
} from './connectWallet/useWalletEvm';
import { getLocal } from './tools/strage';

/**
 * 应用启动时恢复上一次 EVM 钱包会话。
 *
 * 恢复流程必须等待 EIP-6963 公告列表中出现已保存的 UUID，再以 eth_accounts 静默检查
 * 授权状态；不会因为页面刷新而触发 eth_requestAccounts 或 wallet_switchEthereumChain。
 * @param removeLocalToken 地址或网络变化后需要清理业务登录态时传入的回调。
 */
export const useConnectWalletInt = (removeLocalToken?: Function) => {
    const {
        addressEvm,
        connectWalletEvmStore,
        discoverWalletProviders,
        walletProviders,
    } = useConnectWalletEvmStore();
    useEffect(() => {
        const chainType = getLocal("chainType")
        const providerUuid = getLocal(SELECTED_PROVIDER_STORAGE_KEY);
        if (
            chainType === "evm" &&
            providerUuid &&
            !addressEvm &&
            walletProviders.some(({ info }) => info.uuid === providerUuid)
        ) {
            // 恢复会话只检查既有授权，绝不触发 eth_requestAccounts 或自动切链。
            connectWalletEvmStore(providerUuid, removeLocalToken, false, false);
        }

        // 每次 effect 运行均请求公告，保证 provider 晚注入时 walletProviders 会刷新并触发恢复。
        discoverWalletProviders();
    }, [
        addressEvm,
        connectWalletEvmStore,
        discoverWalletProviders,
        removeLocalToken,
        walletProviders,
    ]);
};
