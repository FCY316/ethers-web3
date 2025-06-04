import './style/index.css';

import AppRouter from '@/router';

import StyleProvider from './components/StyleProvider';

// import "@/log/index";
function MyApp() {

  return (
    <div className="MyApp">
      <StyleProvider >
        <AppRouter />
      </StyleProvider>
    </div>
  );
}

export default MyApp;
