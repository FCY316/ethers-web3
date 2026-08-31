import { create } from "zustand";

interface AppState {
  addressType: string;
  setAddressType: () => void;
}
const def = ["hg", "0x"];
export const useAddressType = create<AppState>((set, get) => {
  // 初始化 token，尝试从本地存储中获取
  let initialAddressType: string = def[0];
  if (typeof window !== "undefined") {
    initialAddressType = localStorage.getItem("addressType") || def[0];
  }
  return {
    // 初始化的值
    addressType: initialAddressType,
    // 设置token
    setAddressType: () => {
      const addressType = def[0] === get().addressType ? def[1] : def[0];
      localStorage.setItem("addressType", addressType);
      return set({ addressType });
    },
  };
});

export default useAddressType;
