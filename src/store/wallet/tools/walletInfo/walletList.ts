import bitget from '@/image/bitget.png';
import metaMask from '@/image/metaMask.png';
import okx from '@/image/okx.png';

// 可支持的钱包的列表
export const walletList: {
  [key: string]: {
    walletIs: string; // 检查是否有钱包 tp钱包检查是看ethereum.isTokenPocket 而连接仍是ethereum
    ethereum?: "ethereum";
    download: string; // 下载链接
    logo: string; // logo
  };
} = {
  MetaMask: {
    walletIs: "ethereum",
    download: "https://metamask.io/download/",
    logo: metaMask,
  },
  OkxWallet: {
    walletIs: "okxwallet",
    download: "https://www.okx.com/download",
    logo: okx,
  },
  BitgetWallet: {
    walletIs: "bitkeep",
    ethereum: "ethereum",
    download: "https://web3.bitget.com/wallet-download",
    logo: bitget,
  },
};
