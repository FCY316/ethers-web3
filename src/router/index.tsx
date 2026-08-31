import { Suspense } from 'react';

import Layout from '@/Layout';
import Home from '@/page/home';

import { RouterGuard } from './RouteGuard';


export const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    auth: true,
    children: [
      {
        path: "/",
        element: <Home />,   // tab 首页
        header: true, // 是否显示头部
        foot: true, // 是否显示底部
        footTitle: 'foot.homePage', // tab 标题
        headerTitle: 'foot.homePage', // 页面标题
        auth: true,
      }
    ],
  },
];

const AppRouter = () => {
  const element = RouterGuard(routeConfig);
  return <Suspense> {element}</Suspense>;
};
export default AppRouter;
