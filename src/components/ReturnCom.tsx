// 使用  指令，表明该组件在客户端渲染

import { useNavigate } from 'react-router-dom';

import arrows from '@/image/arrows.svg'; // 返回按钮的图标资源

import Icon from './Icon';

// 定义 ReturnCom 组件，用于返回上一页
const ReturnCom = ({ title }: { title: string }) => {
    const router = useNavigate(); // 获取路由对象

    return (
        // 点击组件时调用 router.back() 返回上一页
        <div
            onClick={() => router(-1)}
            className="flex items-center mr-3  text-sm font-semibold"
        >
            <Icon src={arrows} className='w-6 mr-1.75  rotate-90' /> {/* 渲染返回图标 */}

            <span className='text-lg'>{title}</span> {/* 显示传入的标题 */}
        </div>
    );
};

// 导出 ReturnCom 组件
export default ReturnCom;