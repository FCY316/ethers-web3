import { Suspense } from "react";
import { RouterGuard } from "./RouteGuard";
import Layout from "@/Layout";
import Home from '@/pages/home'
import My from '@/pages/my'
const routeConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my",
        element: <My />,
      },
    ],
  },
];

const AppRouter = () => {
  const element = RouterGuard(routeConfig);
  return <Suspense > {element}</Suspense >;
};
export default AppRouter;
