import { CopyOutlined } from '@ant-design/icons';
import { App } from 'antd'
/**
 * @description: 复制组件
 * @return {*}
 */
const Copy = ({ msg, iconClass = 'text-sm' }: { msg: string, iconClass?: string }) => {
    const { message } = App.useApp();
    // 复制 function
    const handleCopyClick = (data: string | number) => {
        try {
            data = data + "";
            const textField = document.createElement("textarea");
            textField.innerText = data;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
            message.success('复制成功');
        } catch (e) {
            message.error('复制失败');
        }
    };
    return (
        <>
            <CopyOutlined className={`cursor-pointer  ${iconClass}`} onClick={() => { handleCopyClick(msg || '') }}>copy</CopyOutlined>
        </>
    )
}

export default Copy