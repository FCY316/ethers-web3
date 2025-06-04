import { Outlet } from 'react-router';

import Foot from './foot';
import Header from './header';

const Layout = () => {
  return (
    <>
      <Header />
      <main
      >
        <Outlet />
      </main >
      <Foot />
    </>
  );
};

export default Layout;
