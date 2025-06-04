// 引入 zustand 库，用于创建全局状态管理
import { create } from 'zustand';

// 定义滑点的预设数组
export const slippageArr = ['0.1', '0.5', '1'];
// 非专家模式的最大滑点
export const maxSlippage = '20';
// 专家模式下的最大滑点
export const maxSlippageExpert = '100';
// 定义交易设置的接口
interface TransactionSetting {
    swapSlippage: string;     // 交换滑点
    swapTradingHour: string;  // 交换交易时间
    swapSpecialist: boolean;  // 交换专家模式
    mobilitySlippage: string; // 流动性滑点
    mobilityTradingHour: string; // 流动性交易时间
    mobilitySpecialist: boolean; // 流动性专家模式
}

// 定义全局状态接口
interface AppState {
    transactionSetting: TransactionSetting; // 交易设置
    setSwapSlippage: (swapSlippage: string) => void; // 设置交换滑点
    setSwapTradingHour: (swapTradingHour: string) => void; // 设置交换交易时间
    setSwapSpecialist: (swapSpecialist: boolean) => void; // 设置交换专家模式
    setMobilitySlippage: (mobilitySlippage: string) => void; // 设置流动性滑点
    setMobilityTradingHour: (mobilityTradingHour: string) => void; // 设置流动性交易时间
    setMobilitySpecialist: (mobilitySpecialist: boolean) => void; // 设置流动性专家模式
}

// 定义交易设置的初始值
const initTransactionSetting: TransactionSetting = {
    swapSlippage: slippageArr[1], // 默认滑点为 0.5
    swapTradingHour: '20', // 默认交易时间为 20 分钟
    swapSpecialist: false, // 默认关闭交换专家模式
    mobilitySlippage: slippageArr[0], // 默认流动性滑点为 0.1
    mobilityTradingHour: '20', // 默认流动性交易时间为 20 分钟
    mobilitySpecialist: false, // 默认关闭流动性专家模式
};

// 从 localStorage 加载交易设置
function loadTransactionSetting(): TransactionSetting {
    try {
        const local = JSON.parse(localStorage.getItem("transactionSetting") || "{}");
        return { ...initTransactionSetting, ...local }; // 合并本地存储和默认值
    } catch (e) {
        return initTransactionSetting; // 如果解析失败，返回默认值
    }
}

// 使用 zustand 创建全局状态管理
export const useTransactionSetting = create<AppState>((set) => ({
    // 初始化交易设置
    transactionSetting: loadTransactionSetting(),

    // 设置交换滑点
    setSwapSlippage: (swapSlippage: string) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                swapSlippage,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },

    // 设置交换交易时间
    setSwapTradingHour: (swapTradingHour: string) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                swapTradingHour,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },

    // 设置交换专家模式
    setSwapSpecialist: (swapSpecialist: boolean) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                swapSpecialist,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },

    // 设置流动性滑点
    setMobilitySlippage: (mobilitySlippage: string) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                mobilitySlippage,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },

    // 设置流动性交易时间
    setMobilityTradingHour: (mobilityTradingHour: string) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                mobilityTradingHour,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },

    // 设置流动性专家模式
    setMobilitySpecialist: (mobilitySpecialist: boolean) => {
        set((state) => {
            const updated = {
                ...state.transactionSetting,
                mobilitySpecialist,
            };
            localStorage.setItem("transactionSetting", JSON.stringify(updated)); // 更新 localStorage
            return { transactionSetting: updated }; // 更新状态
        });
    },
}));

// 导出 useTransactionSetting 以供其他组件使用
export default useTransactionSetting;