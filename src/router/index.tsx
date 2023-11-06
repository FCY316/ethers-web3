import React, { lazy, Suspense } from "react";
import LoadingPage from "./LoadingPage";
import { RouterGuard } from "./RouteGuard";
import Layout from "@/Layout";

const Home = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/home")
);
const My = lazy(
  async () => await import(/* webpackChunkName: "home" */ "@/pages/my")
);
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
  return <Suspense fallback={<LoadingPage />}>{element}</Suspense>;
};
export default AppRouter;
