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
            <ToastContainer theme='dark' />
            <ConfigProvider
                theme={{
                    components: {

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