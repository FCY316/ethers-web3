import { useEffect } from "react";
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
// 定义好接口，用与函数传入的router
interface RouteObject {
    // 翻译是区分大小写
    caseSensitive?: boolean;
    // 你懂的
    children?: RouteObject[];
    // 你懂的
    element?: React.ReactNode;
    // 你懂的
    path?: string;
    // 权限校验
    auth?: boolean;
  }
//递归查询对应的路由
function queryRouting(path: string,routes: RouteObject[]): RouteObject | null {
    for (let item of routes) {
      if (item.path === path) return item;
      if (item.children) {
        return queryRouting(path, item.children);
      }
    }
    return null;
  }
  //全局路由守卫
function guard(
    location: Location,//类型在react-router-dom中导入
    navigate: NavigateFunction,//类型在react-router-dom中导入
    routes: RouteObject[]
  ) {
    const { pathname } = location;
    //找到对应的路由信息，判断有没有权限控制
    const routedetail = queryRouting(pathname, routes);
    //没有找到路由，跳转404
    if (!routedetail) {
      return navigate("/404");
      // return false;
    }
    //如果需要权限验证
    if (routedetail.auth) {
      const token = localStorage.getItem("betoken");
      if (!token) {
        return navigate(-1);
      }
    }
  }
  export const RouterGuard = (routes: RouteObject[]) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      guard(location, navigate, routes);
    }, [location, navigate, routes]);
    const Route = useRoutes(routes);
    return Route;
  };