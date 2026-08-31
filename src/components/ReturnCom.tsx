// 使用  指令，表明该组件在客户端渲染

import { useNavigate } from 'react-router-dom';

import leftRight from '@/image/leftRight.svg'; // 返回按钮的图标资源

import Icon from './Icon';

// 定义 ReturnCom 组件，用于返回上一页
const ReturnCom = ({ title }: { title: string }) => {
    const router = useNavigate(); // 获取路由对象

    return (
        // 点击组件时调用 router.back() 返回上一页
        <div
            className='flex items-center text-white '
        >
            <div onClick={() => router(-1)} className=' rounded-full bg-footBorder w-10 h-10 flex items-center justify-center mr-2.5'>
                <Icon src={leftRight} className='w-6 mr-1.75 text-white' /> {/* 渲染返回图标 */}
            </div>
            <span className='text-sm'>{title}</span> {/* 显示传入的标题 */}
        </div>
    );
};

// 导出 ReturnCom 组件
export default ReturnCom;