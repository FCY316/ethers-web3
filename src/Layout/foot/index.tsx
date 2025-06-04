import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { routeConfig } from '@/router';

// 底部导航栏组件
const Foot = () => {
    const { pathname } = useLocation(); // 获取当前路由路径
    // 计算所有 foot 为 true 的路由节点，使用pathname来遍历出当前路由是否展示 foot 用于底部导航显示
    // footRoutes 是可以渲染的底部导航路由节点
    // current 是当前路由是否展示 foot
    const footShow = useMemo(() => {
        const result: any[] = [];

        // 遍历路由配置，收集 foot 为 true 的节点
        const traverse = (nodes: any[]) => {
            for (const node of nodes) {
                if (node.foot && node.path) {
                    result.push(node);
                }
                if (Array.isArray(node.children)) {
                    traverse(node.children);
                }
            }
        };

        traverse(routeConfig);

        // 去重并查找当前激活的底部路由
        const footRoutes = Array.from(new Set(result));
        const current = footRoutes.find((item) => pathname === item.path);
        return { footRoutes, current };
    }, [pathname]);


    return (
        <div></div>
    );
};

export default Foot;