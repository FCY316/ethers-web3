import { Contract } from "ethers";
import create from "zustand";

type ContractType = {
  erc20: Contract | null;
};
const initialState: ContractType = {
  erc20: null,
};
interface AppState {
  contract: ContractType;
  setContract: (token: ContractType) => void;
  clearContract: () => void;
}

export const useContract = create<AppState>((set) => ({
  // 初始化的值
  contract: initialState,
  // 修改
  setContract: (contract: ContractType) => {
    return set({ contract });
  },
  // 清空
  clearContract: () => {
    return set({
      contract: initialState,
    });
  },
}));

export default useContract;
