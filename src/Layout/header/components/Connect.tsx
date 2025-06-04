// 引入 React 的 useState 钩子
import { useState } from 'react';

// 引入 Ant Design 的 Dropdown 和 Modal 组件
import {
  Dropdown,
  Modal,
} from 'antd';

// 引入自定义的 Icon 组件和相关资源
import Icon from '@/components/Icon';
import useAddressConvert from '@/hooks/useAddressConvert';
import arrows from '@/image/arrows.svg';
import breakIcon from '@/image/breakIcon.svg';
import walletIcon from '@/image/walletIcon.svg';
// 引入钱包列表和相关状态管理工具
import { walletList } from '@/store/wallet/tools/walletInfo/walletList';
import useConnectWallet from '@/store/wallet/useConnectWallet';
import { useConnectWalletInt } from '@/store/wallet/useConnectWalletInt';
import useWalletPop from '@/store/walletPop';
import { mobileHidden } from '@/utils';

// 将钱包列表转换为数组格式，方便后续渲染
const walletArray = Object.entries(walletList).map(([name, config]) => ({
    name,
    ...config,
}));

// 定义 Connect 组件
const Connect = () => {
    // 初始化连接钱包的逻辑
    useConnectWalletInt();
    const { addressConvert } = useAddressConvert();

    // 从 useConnectWallet 中获取连接状态和方法
    const { connectWalletStore, address, disconnectWalletStore } = useConnectWallet();

    // 定义本地状态，用于存储选中的钱包名称
    const [walletName, setWalletName] = useState('');

    // 从全局状态中获取钱包弹窗的状态和控制方法
    const { openWallet, setOpenWallet } = useWalletPop();

    // 显示钱包连接弹窗
    const showModal = () => {
        setOpenWallet(true);
        walletName && setWalletName(''); // 如果已有选中的钱包名称，重置为空
    };

    // 确认连接钱包
    const handleOk = () => {
        if (!walletName) return; // 如果未选择钱包，不执行操作
        setOpenWallet(false); // 关闭弹窗
        connectWalletStore(walletName); // 调用连接钱包方法
        setWalletName(''); // 重置钱包名称
    };

    // 取消连接钱包
    const handleCancel = () => {
        setOpenWallet(false); // 关闭弹窗
        walletName && setWalletName(''); // 如果已有选中的钱包名称，重置为空
    };

    // 定义下拉菜单的选项
    const items = [
        {
            key: '0',
            label: (
                <div onClick={() => disconnectWalletStore()} className='flex items-center text-mainBlack text-xs'>
                    <Icon src={breakIcon} className={"w-4.5 mr-2.5"} />
                    <span>断开</span>
                </div>
            ),
        },
    ];

    return (
        <>
            {
                // 如果已连接钱包，显示地址和断开按钮
                address ? (
                    <Dropdown arrow menu={{ items }} placement="bottom">
                        <button className="ml-3 text-sm bg-white font-medium rounded-lg h-6.5 shadow border border-d3">
                            <div className='flex items-center px-1'>
                                <Icon src={walletIcon} className={"w-3.5 mr-1"} />
                                <p className='bg-f5 rounded-lg leading-none p-1 text-xs font-normal mr-0.5'>
                                    {mobileHidden(addressConvert(address), 5, 4)} {/* 隐藏部分地址 */}
                                </p>
                                <Icon src={arrows} className={"w-3"} />
                            </div>
                        </button>
                    </Dropdown>
                ) : (
                    // 如果未连接钱包，显示“连接”按钮
                    <button onClick={showModal} className="ml-3 px-2 text-sm bg-white font-medium rounded-lg h-6.5 shadow border border-d3">
                        连接
                    </button>
                )
            }
            {/* 钱包连接弹窗 */}
            <Modal
                centered
                keyboard
                closeIcon={false}
                open={openWallet}
                onCancel={handleCancel}
                footer={null}
                className='w-75.5 md:w-95 '
            >
                <div className='text-mainBlack mb-5 pt-4 px-2.5'>
                    <div className='font-medium text-lg pb-4.75 text-center'>连接钱包</div>
                    {/* 渲染钱包列表 */}
                    {walletArray.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    setWalletName(item.name);
                                }}
                                className={` cursor-pointer  last:mb-0 rounded-1.25 mb-1.25 flex items-center h-7.5 pl-2.5 ${walletName === item.name ? 'bg-dd' : 'bg-f1'}`}
                            >
                                <img className='w-6 rounded-md mr-2.5' src={item.logo} alt="" />
                                <span className='text-xs'>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                {/* 弹窗底部按钮 */}
                <div className='box-border border-t border-e2 flex items-center justify-between h-14 text-base'>
                    <button
                        onClick={handleCancel}
                        className='w-1/2 h-full text-86 border-r border-e2 rounded-0.3125 text-xs font-medium'
                    >
                        取消
                    </button>
                    <button
                        onClick={() => { handleOk() }}
                        className={`w-1/2 h-full rounded-0.3125 text-xs font-medium ${walletName ? 'text-mainBlack' : 'text-gray-400'}`}
                    >
                        确定
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Connect;