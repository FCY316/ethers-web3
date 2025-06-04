// Header 组件：负责显示页面头部区域，包含导航菜单、语言选择及钱包连接等功能
import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { routeConfig } from '@/router';

// 定义 Header 组件
const Header = () => {
  const { pathname } = useLocation(); // 当前路由路径
  // 解析路由配置，提取所有设置了 header 的页面路径与标题
  const headerShow = useMemo(() => {
    const result: any[] = [];

    // 遍历路由配置，收集 header 为 true 的节点
    const traverse = (nodes: any[]) => {
      for (const node of nodes) {
        if (node.header && node.path) {
          result.push(node);
        }
        if (Array.isArray(node.children)) {
          traverse(node.children);
        }
      }
    };

    traverse(routeConfig);
    const headerRoutes = Array.from(new Set(result));
    const headerPath = headerRoutes.map(item => item.path);
    const current = headerRoutes.find((item) => pathname === item.path);

    return { current, headerPath, headerRoutes };
  }, [pathname]);
  return (
    <div></div>
  );
};

export default Header;