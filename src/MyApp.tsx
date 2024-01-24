import './style/index.css'
import AppRouter from '@/router'
import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
import { App } from 'antd';
import useNewContract from './web3Hooks/useNewContract';
// import "@/log/index";
function MyApp() {
  // 监听网络
  useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  // new 出合约
  useNewContract()
  return (
    <div className="MyApp">
      <App>
        <AppRouter />
      </App>
    </div>
  );
}

export default MyApp;
