import { create } from "zustand";

interface AppState {
  addressType: string;
  setAddressType: (token: string) => void;
}

export const useAddressType = create<AppState>((set) => ({
  // 初始化的值
  addressType: localStorage.getItem("addressType") || "fb",
  // 设置token
  setAddressType: (addressType: string) => {
    localStorage.setItem("addressType", addressType);
    return set({ addressType });
  },
}));

export default useAddressType;
