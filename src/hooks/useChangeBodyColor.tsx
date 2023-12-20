import { useEffect } from "react";
import { useLocation } from "react-router-dom"
// 颜色名单
const data = [{
    pathname: '/cast',
    bg: '#f9f9f9'
}]
const useChangeBodyColor = () => {
    // 获取路由信息
    const location = useLocation();
    // 监听路由信息
    useEffect(() => {
        const bgObj = data.find(item => location.pathname === item.pathname);
        const body = document.body;
        if (bgObj) {
            body.style.backgroundColor = bgObj.bg;
        } else {
            body.style.backgroundColor = '#fff';
        }
    }, [location])
}

export default useChangeBodyColor