import './style/index.css'
import AppRouter from '@/router'
import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
import { App } from 'antd';
import useNewContract from './web3Hooks/useNewContract';
import { useEffect } from 'react';
import useConnectedWallet from './web3Hooks/useConnectedWallet';
import useWallet from './store/useWallet';
// import "@/log/index";
function MyApp() {
  // 存的缓存
  const { wallet: { walletName } } = useWallet()
  // 连接钱包的方法
  const { connected } = useConnectedWallet()
  // 监听网络
  useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  // new 出合约
  useNewContract()
  // 在页面初始化的时候检测本地是都有缓存，有的话连接，没有的话不管
  useEffect(() => {
    if (walletName) {
      connected()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="MyApp">
      <App>
        <AppRouter />
      </App>
    </div>
  );
}

export default MyApp;
