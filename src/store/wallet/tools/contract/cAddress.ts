import { Interface, InterfaceAbi } from "ethers"; // 从 ethers.js 中引入 Interface 类型和 ABI 接口类型
import Erc20 from "./abi/Erc20.json"; // 引入 Router 合约的 ABI
import FlexibleStaking from "./abi/FlexibleStaking.json";
import Lottery from "./abi/Lottery.json";
import OrderHistory from "./abi/OrderHistory.json";
import QueryFunction from "./abi/QueryFunction.json";
import RegularStaking from "./abi/RegularStaking.json";
import { evmChain } from "@/collocate";
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
  [evmChain[0]]: {
    // 代币ERC20合约
    TokenErc20: {
      // address: "0x8AB13cEF518432124Ca9823264bDcF18B9C72a42",
      address: "0xFb80f39FAB83B5e503dB51d892713169e68D2e5A",
      abi: Erc20,
    },
    // 活期质押合约
    FlexibleStaking: {
      // address: "0x0972Fe828d40ff20E33506CE2C8b7F92d112bf97",
      address: "0x0990a704713ECeA2FEB122C0EDE901aaB6822719",
      abi: FlexibleStaking,
    },
    // 抽奖合约
    Lottery: {
      // address: "0x3946BB2B70d8EFdE302EF0DCb68D3706FF8c3fd8",
      address: "0x7a3CC9e0eBBF1a68FA079ab36c3E3dBC3F291668",
      abi: Lottery,
    },
    // 订单历史合约
    OrderHistory: {
      // address: "0xaaecf2eE9529CD2c81CB9C2527df6FBf46EE6760",
      address: "0x1edeCd14B5545B9C68a4a440Ad2d0af0c9fB72bC",
      abi: OrderHistory,
    },
    // 查询功能合约
    QueryFunction: {
      // address: "0xF965C4CA6307c150c3eE9eDa83B4Fe256aA43e3b",
      address: "0x46877b0e4527628Fb0aD5aA22B7F23C00983D738",
      abi: QueryFunction,
    },
    // 定期质押合约
    RegularStaking: {
      // address: "0xe1507C3F2e5CA9EA864c87F9150FCeb3AF4Cf4FA",
      address: "0x7F7B51ec5b9A0DcAB27F2d006C80E9d1b6Ac2271",
      abi: RegularStaking,
    },
  },
};
