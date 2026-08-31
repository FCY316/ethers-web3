import { BrowserProvider } from 'ethers';

import { chainParams } from '@/collocate';

/**
 * 切换以太坊网络链
 * @param provider - 以太坊浏览器提供者 (BrowserProvider)
 * @param chainID - 目标链的 ID (number)
 */
export const changeChainID = async (
  provider: BrowserProvider,
  chainID: number
) => {
  try {
    // 调用以太坊钱包的方法进行链切换
    provider &&
      (await (provider as any).send("wallet_switchEthereumChain", [
        { chainId: `0x${chainID.toString(16)}` }, // 将链 ID 转换为 16 进制格式
      ]));
  } catch (e: any) {
    console.log("changeChainID", e);
    // 当错误码不是 4001 时（即用户未主动拒绝），尝试添加新链
    if (e?.info?.error?.code !== 4001) {
      addChainID(provider, chainID);
    }
  }
};

/**
 * 添加新的以太坊网络链
 * @param provider - 以太坊浏览器提供者 (BrowserProvider)
 * @param chainID - 目标链的 ID (number)
 */
export const addChainID = async (
  provider: BrowserProvider,
  chainID: number
) => {
  try {
    // 构造链的配置信息
    const data = {
      ...chainParams[chainID], // 获取对应链 ID 的参数配置
      chainId: `0x${chainID.toString(16)}`, // 转换为 16 进制格式
    };
    // 调用以太坊钱包的方法添加新的链
    provider &&
      (await (provider as any).send("wallet_addEthereumChain", [data]));
  } catch (e) {
    console.log("useChangeChain", e);
  }
};
