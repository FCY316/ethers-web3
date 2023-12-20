import { useEffect, useState } from "react"
import { createContainer } from "unstated-next"
type dataType = {
    language: string | null,
    addressType: string | null
}
const initialState: dataType = {
    language: localStorage.getItem('language'),
    addressType: localStorage.getItem('addressType')
}
const useChangeLocalStorage = (props = initialState) => {
    const [data, setData] = useState<dataType>(props);
    let changeLanguage = (language = 'cn') => changeLanguageF(language);
    let changeAddressType = (addressType = 'fb') => changeAddressTypeF(addressType);
    // 连接钱包 获取本地缓存的语言
    const changeLanguageF = (language: string) => {
        localStorage.setItem('language', language)
        setData({ ...data, language })
    }
    // 连接钱包 获取本地缓存的地址类型
    const changeAddressTypeF = (addressType: string) => {
        localStorage.setItem('addressType', addressType)
        setData({ ...data, addressType })
    }
    // 在页面初始化的时候检测本地是都有缓存，有的话连接，没有的话不管
    useEffect(() => {
        if (!initialState.language) {
            changeLanguage()
        }
        if (!initialState.addressType) {
            changeAddressType()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return { ...data, changeLanguage, changeAddressType }
}
const changeLocalStorage = createContainer(useChangeLocalStorage)
export default changeLocalStorage
