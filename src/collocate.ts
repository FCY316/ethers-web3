export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const evmChain = [12306];
export const chainParams: any = {
  12306: {
    chainId: 12306,
    chainName: "Fibochain", // 自定义链的名称
    nativeCurrency: {
      name: "FIBO",
      symbol: "FIBO",
      decimals: 18,
    },
    rpcUrls: ["https://node1.fibo-rpc.asia"],
    blockExplorerUrls: ["https://scan.fibochain.org/"],
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
