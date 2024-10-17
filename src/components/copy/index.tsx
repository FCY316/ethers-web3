import { CopyOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify'
/**
 * @description: 复制组件
 * @return {*}
 */
const Copy = ({ msg, iconClass = 'text-sm' }: { msg: string, iconClass?: string }) => {
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
            toast.success('复制成功', { autoClose: 1000 });
        } catch (e) {
            toast.error('复制失败', { autoClose: 1000 });
        }
    };
    return (
        <>
            <CopyOutlined className={`cursor-pointer  ${iconClass}`} onClick={() => { handleCopyClick(msg || '') }}>copy</CopyOutlined>
        </>
    )
}

export default Copy