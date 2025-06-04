import 'react-toastify/dist/ReactToastify.css';

import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

// 从@ant-design/cssinjs中导入px2rem转换器和样式提供者
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';

// 定义一个样式提供者组件，它将使用状态管理和样式转换来包装其子组件
const StyleProviderCom = ({ children }: { children: React.ReactNode }) => {

    return (
        <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]} >
            <ToastContainer />
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            defaultBg: "#00BF40", // 默认按钮背景色
                            defaultColor: "#fff", // 默认按钮文本颜色
                            defaultBorderColor: "#00BF40", // 默认按钮边框颜色
                            defaultActiveColor: "#fff", // 默认按钮激活态文字颜色
                            defaultActiveBg: "#00BF40", // 默认按钮激活态背景色
                            defaultActiveBorderColor: "#00BF40", // 默认按钮激活态边框颜色
                            defaultHoverBg: "#00BF40", // 默认按钮悬浮态背景色
                            defaultHoverBorderColor: "#00BF40", // 默认按钮悬浮态边框颜色
                            defaultHoverColor: "#fff", // 默认按钮悬浮态文字颜色
                            colorBgContainerDisabled: "#B7EAC8",
                            borderColorDisabled: "#B7EAC8",
                            colorTextDisabled: "#fff",
                        },
                        Dropdown: {
                            paddingXXS: 0,
                            controlPaddingHorizontal: 10,
                            paddingBlock: 10,
                            borderRadiusLG: 10
                        },

                        InputNumber: {
                            colorPrimary: "transparency", // 选项卡的主色
                            hoverBorderColor: "transparency", // 悬浮态边框色
                            paddingBlock: 0, // 输入框的上下内边距
                            inputFontSize: 13, // 输入框的字体大小
                            lineWidth: 0,
                            paddingInline: 0,
                            activeShadow: "transparency",
                        },
                        Switch: {
                            colorPrimary: "#00BF40",
                            colorPrimaryHover: "#00BF40",
                        },
                        Select: {
                            colorPrimary: "#00BFB9", // 选项卡的主色
                            hoverBorderColor: "#00BFB9", // 激活态边框色
                            optionSelectedBg: "#00BFB9", // 选项被选中时的背景色
                            optionSelectedColor: "#fff", // 选项被选中时的文本颜色
                            fontSize: 13, // 输入框的字体大小
                        },

                        Form: {
                            fontSize: 12, // 字体大小
                        },
                        Input: {
                            colorPrimary: "#E2E5EB", // 选项卡的主色
                            hoverBorderColor: "#E2E5EB", // 悬浮态边框色
                            paddingBlock: 4, // 输入框的上下内边距
                            inputFontSize: 13, // 输入框的字体大小
                        },
                        Spin: {
                            colorPrimary: "#00BFB9", // 主题色
                        },
                        Modal: {
                            borderRadiusLG: 10, // 模态框的圆角

                        },
                        Drawer: {
                            lineWidth: 0
                        },
                        Slider: {
                            handleColor: "#79CD95", // 滑块的颜色
                            handleActiveColor: "#79CD95",
                            handleActiveOutlineColor: "#79CD95",
                            handleLineWidthHover: 1,
                            railBg: "#E2F0E7",
                            railHoverBg: "#E2F0E7",
                            trackBg: "#79CD95",
                            trackHoverBg: "#79CD95",
                        }
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </StyleProvider>
    )
}

// 导出样式提供者组件作为默认导出
export default StyleProviderCom