import React from 'react';
import AppRouter from '@/router'
import './MyApp.scss';
import useListenerNetWork from '@/web3Hooks/useListenerNetWork';
import useWatchWalletAddress from '@/web3Hooks/useWatchWalletAddress';
import { App } from 'antd';
// import "@/log/index";
function MyApp() {
  // 监听网络
  useListenerNetWork()
  // 监听地址
  useWatchWalletAddress()
  return (
    <div className="MyApp">
      <App>
        <AppRouter />
      </App>
    </div>
  );
}

export default MyApp;
