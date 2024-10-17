import './style/index.css'
import AppRouter from '@/router'
import { ToastContainer } from 'react-toastify'
// import "@/log/index";
function App() {
  return (
    <div className="MyApp">
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
