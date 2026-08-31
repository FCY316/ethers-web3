// 导入自定义钱包连接 hook
import useConnectWallet from "@/store/wallet/useConnectWallet";
// 导入 Ant Design 的 Button 组件
import { Button } from "antd";
import React from "react";
// 导入国际化 hook
import { useTranslation } from "react-i18next";

/**
 * 主按钮组件，支持钱包连接逻辑和国际化显示。
 *
 * @param text 按钮显示文本
 * @param onClick 按钮点击事件（已连接钱包时触发）
 * @param className 自定义样式类
 * @param block 是否块级显示
 * @param loading 是否加载中
 */
const ButtonPrimary = ({
    text,
    onClick,
    className,
    block,
    loading,
    htmlType,
    disabled
}: {
    text: string | React.ReactNode
    onClick?: () => void
    className?: string
    block?: boolean
    loading?: boolean
    htmlType?: "button" | "submit" | "reset",
    disabled?: boolean
}) => {
    // 获取钱包地址和连接方法
    const { address, connectWalletStore } = useConnectWallet()
    // 国际化方法
    const { t } = useTranslation()
    /**
     * 按钮点击事件：
     * - 已连接钱包时，执行传入的 onClick 方法
     * - 未连接钱包时，触发钱包连接流程
     */
    const btnClick = () => {
        if (address) {
            onClick && onClick()
        } else {
            connectWalletStore()
        }
    }
    // 渲染主按钮，显示钱包连接或自定义文本
    return (
        <Button htmlType={htmlType} disabled={disabled} type="primary" loading={loading} onClick={btnClick} className={`h-9.5  ${className}`} block={block}>
            {address ? text : t('header.connectWallet')}
        </Button>
    )
}

// 导出主按钮组件
export default ButtonPrimary
