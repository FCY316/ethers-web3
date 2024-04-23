import { Provider, Signer } from "ethers";
import { create } from "zustand";
type walletType = {
  provider: Provider | null;
  signer: Signer | null;
  address: string;
  walletName: string;
};
interface AppState {
  wallet: walletType;
  setWallet: (token: walletType) => void;
  clearWallet: () => void;
}

export const useWallet = create<AppState>((set) => ({
  // 初始化的值
  wallet: {
    provider: null,
    signer: null,
    address: "",
    walletName: localStorage.getItem("walletName") || "",
  },
  // 修改
  setWallet: (wallet: walletType) => {
    return set({ wallet });
  },
  // 清空
  clearWallet: () => {
    return set({
      wallet: { provider: null, signer: null, address: "", walletName: "" },
    });
  },
}));

export default useWallet;
