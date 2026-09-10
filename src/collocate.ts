export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const evmChain = [1678];
export const chainParams: any = {
  1678: {
    chainId: 1678,
    chainName: "intl-text.net", // 自定义链的名称
    nativeCurrency: {
      name: "HUGE",
      symbol: "HUGE",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.interstellarchain.org/"],
    // 用于新区块、Transfer、Approval 等实时事件订阅。
    // webSocketUrls: ["ws://16.162.168.95:8546"],
    webSocketUrls: ["wss://rpc.interstellarchain.org"],
    blockExplorerUrls: ["https://scan.interstellarchain.org/"],
  },
  56: {
    chainId: 56,
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  97: {
    chainId: 97,
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-testnet-rpc.publicnode.com"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
};
// 代币符号
export const SYMBOL = "NFX";
export const MAINNET_SYMBOL = "FIBO";
// 桥链接
export const BRIDGE_LINK = "https://bridge.nfx-rwa.org/";
// 联系链接
export const CONTACT_LINK = {
  officialWebsite: "https://www.nfx-rwa.org",
  twitter: "http://x.com/NfxFinance",
  telegram: "https://t.me/NFXGlobalCommunity",
  discord: "https://discord.gg/3U4Xpyv6hA",
};
// 语言选项
/**
 * 语言菜单的框架无关数据结构。
 *
 * 此前仅为了复用 Ant Design 的 MenuProps 而引入 antd；项目当前没有使用其 Menu 组件，
 * 因此保留实际所需字段即可，未来任意菜单组件都可复用这份配置。
 */
export const languageItems: Array<{ key: string; label: string }> = [
  {
    key: "zh",
    label: "中文",
  },
  {
    key: "en",
    label: "English",
  },
  {
    key: "ja",
    label: "わぶん",
  },
  {
    key: "ko",
    label: "한국어",
  },
];
