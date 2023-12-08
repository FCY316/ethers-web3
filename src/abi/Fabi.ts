import { Interface, InterfaceAbi } from "ethers";

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
const erc20Abi = require("./erc20.json");
let FContact: objKeyObjectType = {
  erc20: { abi: erc20Abi, address: "" },
};
console.log("环境", process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV === "development") {
  //开发环境
  FContact.erc20.address = "";
} else if (process.env.REACT_APP_ENV === "test") {
  // 测试环境
  FContact.erc20.address = "";
} else {
  //生产环境
  FContact.erc20.address = "";
}
export default FContact;
