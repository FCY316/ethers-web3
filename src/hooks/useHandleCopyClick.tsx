import { App } from "antd";
import changeLocalStorage from "./useChangeLocalStorage";

const useHandleCopyClick = () => {
    // 本地缓存的地址类型  本地缓存的语言
    const { language } = changeLocalStorage.useContainer()
    const { message } = App.useApp();
    // 复制
    const handleCopyClick = (data: string | number) => {
        try {
            data = data + "";
            const textField = document.createElement("textarea");
            textField.innerText = data;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand("copy");
            textField.remove();
            message.success(language === 'en' ? 'Copy successfully ' : "复制成功");
        } catch (e) {
            message.error(language === 'en' ? 'Copy unsuccessful ' : "复制失败");

        }
    };
    return { handleCopyClick }
}

export default useHandleCopyClick