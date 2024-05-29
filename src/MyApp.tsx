import './style/index.css'
import AppRouter from '@/router'
import { App } from 'antd';
// import "@/log/index";
function MyApp() {
  return (
    <div className="MyApp">
      <App>
        <AppRouter />
      </App>
    </div>
  );
}

export default MyApp;
