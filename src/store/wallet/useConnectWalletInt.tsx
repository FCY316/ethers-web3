import { useEffect } from 'react';

import {
    SELECTED_PROVIDER_STORAGE_KEY,
    useConnectWalletEvmStore,
} from './connectWallet/useWalletEvm';
import { getLocal } from './tools/strage';

/**
 * 应用启动时恢复上一次 EVM 钱包会话。
 *
 * 恢复流程必须等待 EIP-6963 公告列表中出现已保存的 rdns。由于 uuid 只在当前页面会话内有效，
 * 刷新后需先通过 rdns 找到新公告的 provider，再以该 provider 新的 uuid 调用 eth_accounts 静默检查
 * 授权状态；不会触发 eth_requestAccounts，但当前网络不符合项目要求时会请求切换到默认支持链。
 * @param removeLocalToken 地址或网络变化后需要清理业务登录态时传入的回调。
 */
const useConnectWalletInt = (removeLocalToken?: Function) => {
    const {
        addressEvm,
        connectWalletEvmStore,
        discoverWalletProviders,
        walletProviders,
    } = useConnectWalletEvmStore();
    useEffect(() => {
        const providerRdns = getLocal(SELECTED_PROVIDER_STORAGE_KEY);
        // 每次页面加载都会出现新的 uuid；rdns 是本地保存的钱包偏好匹配键。
        const providerDetail = walletProviders.find(
            ({ info }) => info.rdns === providerRdns
        );
        if (
            providerRdns &&
            !addressEvm &&
            providerDetail
        ) {
            // 恢复会话仅以 eth_accounts 检查授权；若链不匹配，连接逻辑会请求切换到 evmChain[0]。
            connectWalletEvmStore(
                providerDetail.info.uuid,
                removeLocalToken,
                true,
                false
            );
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
export default useConnectWalletInt;
