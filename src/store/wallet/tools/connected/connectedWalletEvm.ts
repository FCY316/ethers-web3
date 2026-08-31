import { ethers } from 'ethers';

import { WindowWithWallets } from '@/interface';

import { walletList } from '../walletInfo/walletList';

// 连接 EVM 钱包，并返回提供者和地址信息
const connectedWalletEvm = async (walletName: string) => {
  try {
    // 从钱包列表中获取指定钱包的配置信息
    const walletInfo = walletList[walletName];

    // 检查钱包是否存在且可用
    if (walletInfo && walletInfo.walletIs in window) {
      // 获取钱包的 EVM 提供者
      const providerEvm = new ethers.BrowserProvider(
        walletInfo.ethereum
          ? (window as WindowWithWallets)[walletInfo.walletIs][
              walletInfo.ethereum
            ]
          : (window as WindowWithWallets)[walletInfo.walletIs]
      );
      // 连接钱包并获取签名者
      const signer = await providerEvm.getSigner();
      // 获取钱包的 EVM 地址
      const addressEvm = signer.address;
      // 返回包含地址、签名者和提供者的对象
      return {
        providerEvm,
        addressEvm,
        signer,
      };
    } else {
      // 如果钱包未安装，打开钱包的下载页面
      // window.open(walletInfo?.download);
    }
  } catch (e) {
    // 捕获并处理连接过程中可能发生的错误
    console.log(`EVM Error connecting to wallet ${walletName}:`, e);
  }
};

export default connectedWalletEvm;
