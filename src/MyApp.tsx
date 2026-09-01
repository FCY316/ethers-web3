import './style/index.css';

import AppRouter from '@/router';

import StyleProvider from './components/StyleProvider';
import WalletProviderModal from './components/WalletProviderModal';

// import "@/log/index";
function MyApp() {

  return (
    <div className="MyApp">
      <StyleProvider >
        {/* 全局挂载：任何页面发起连接时，都可展示同一份 EIP-6963 provider 列表。 */}
        <WalletProviderModal />
        <AppRouter />
      </StyleProvider>
    </div>
  );
}

export default MyApp;
