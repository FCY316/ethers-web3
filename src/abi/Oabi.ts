import { Interface, InterfaceAbi } from "ethers";
const HelloWeb3 = require("./json/HelloWeb3.json");
type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
let OContact: objKeyObjectType = {
  HelloWeb3: { abi: HelloWeb3, address: "" },
};
console.log("环境", process.env.REACT_APP_ENV);
if (process.env.REACT_APP_ENV === "development") {
  //开发环境
  OContact.HelloWeb3.address = "0x8f1d220F168448D1F9968Ad7dA6562C41b81a4Aa";
} else if (process.env.REACT_APP_ENV === "test") {
} else {
}
export default OContact;
