import { toast } from "react-toastify";

import { evmChain } from "@/collocate";
import { WindowWithWallets } from "@/interface";

import { walletList } from "../walletInfo/walletList";

/**
 * 监听 EVM 钱包地址切换事件
 *
 * 此函数用于监听指定 EVM 钱包的地址变更事件，并在账户发生变化时调用回调函数。
 * 主要用于前端应用确保能够实时更新钱包的地址信息。
 *
 * @param walletName - 钱包名称，用于从 walletList 中获取对应的钱包配置信息
 * @param fun - 可选回调函数，在检测到账户变化时执行
 */
export const watchSetAddressEvm = async (
  walletName: string,
  fun?: Function
) => {
  try {
    // 获取指定钱包的配置信息
    const walletInfo = walletList[walletName];

    // 检查钱包信息是否存在，并且钱包已在全局 window 对象中定义
    if (walletInfo && walletInfo.walletIs in window) {
      // 获取指定钱包的 EVM 提供者
      const providerEvm = (window as WindowWithWallets)[walletInfo.walletIs];
      // 移除所有 'accountsChanged' 事件监听，避免重复触发
      providerEvm.removeAllListeners("accountsChanged");

      // 监听 `accountsChanged` 事件，当账户变化时执行回调函数
      providerEvm.once("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          fun && fun();
        }
      });
    }
  } catch (e) {
    // 发生错误时，打印错误信息
    console.log("watchSetChain", e);
  }
};

/**
 * 监听 EVM 钱包网络切换事件
 *
 * 此函数用于监听指定 EVM 钱包的网络变更事件，并在链 ID 发生变化时调用回调函数。
 * 还会检查新的链 ID 是否在支持的链列表中，如果不支持，则显示警告信息。
 *
 * @param walletName - 钱包名称，用于从 walletList 中获取对应的钱包配置信息
 * @param fun - 可选回调函数，在检测到网络变化时执行
 */
export const watchSetNetWorkEvm = async (
  walletName: string,
  fun?: Function
) => {
  try {
    // 获取指定钱包的配置信息
    const walletInfo = walletList[walletName];

    // 检查钱包信息是否存在，并且钱包已在全局 window 对象中定义
    if (walletInfo && walletInfo.walletIs in window) {
      // 获取指定钱包的 EVM 提供者
      const providerEvm = (window as WindowWithWallets)[walletInfo.walletIs];
      // 移除所有 'chainChanged' 事件监听，避免重复触发
      providerEvm.removeAllListeners("chainChanged");

      // 监听 `chainChanged` 事件，当链 ID 发生变化时执行回调函数
      providerEvm.once("chainChanged", (chainid: string) => {
        fun && fun();

        // 处理链 ID：转换为字符串，并去掉可能的 "n" 后缀
        const chainId = chainid.toString();
        const chainIdWithoutSuffix = chainId.endsWith("n")
          ? Number(chainId.slice(0, -1))
          : Number(chainId);

        // 检查新的链 ID 是否在支持的 EVM 链列表中
        const hasMatch = evmChain.includes(chainIdWithoutSuffix);
        if (!hasMatch) {
          // 显示警告通知，提醒用户当前链不可用
          toast.warning(
            `您当前处于 ${chainIdWithoutSuffix} 链，无法为您提供服务。`
          );
        }
      });
    }
  } catch (e) {
    // 发生错误时，打印错误信息
    console.log("watchSetChain", e);
  }
};
