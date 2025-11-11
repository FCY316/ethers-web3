import { Interface, InterfaceAbi } from "ethers"; // 从 ethers.js 中引入 Interface 类型和 ABI 接口类型
import erc20 from "./abi/erc20.json"; // 引入 Router 合约的 ABI
/**
 * 定义一个对象 `evmCAddress`，用于存储 EVM 链（以 chainId 为键）上部署的所有合约地址与 ABI 信息
 * 格式为：
 * {
 *   [chainId: string]: {
 *     [contractName: string]: {
 *       address: string;      // 合约地址
 *       abi: Interface | InterfaceAbi;  // 合约 ABI，可以是 ethers 的 Interface 实例或原始 ABI 对象
 *     }
 *   }
 * }
 */
export const evmCAddress: {
  [key: string]: {
    [contractName: string]: { address: string; abi: Interface | InterfaceAbi };
  };
} = {
  12306: {
    // Erc20 合约配置
    erc20: {
      address: "0xDA92E22463F655310d2438295F64C46EC4540d73", // 合约地址
      abi: erc20, // 合约 ABI（ERC20 格式）
    },
  },
};
