import { ReactNode } from "react";

import { Contract } from "ethers";

export type LocalesType = "en" | "zh" | "ja" | "ko";
export type ChainsBigType = "evm";
export interface WindowWithWallets extends Window {
  [key: string]: any;
}
export interface RouteObjects {
  // 让不让menu读取
  menuReady?: boolean;
  name?: string;
  // 你懂的
  children?: RouteObjects[];
  // 你懂的
  element?: React.ReactNode;
  // 你懂的
  path?: string;
  // 权限校验
  auth?: boolean;
}
export type objKeyObjectType = {
  [key: string]: Contract | null;
  router: Contract | null;
  factory: Contract | null;
};

export interface numKeyObj {
  [key: number]: { chainName: string; symbol: string; chainID: number };
}
export interface strKeyReactNode {
  [key: string]: ReactNode;
}
export interface strKeyStr {
  [key: string]: string;
}
export type ChainsTypeKeyFun = {
  [key in ChainsBigType]: Function;
};
export type ChainsTypeKeyStr = {
  [key in ChainsBigType]: string;
};
export type ChainsTypeKeyNum = {
  [key in ChainsBigType]: number;
};
export type ChainsTypeKeyArr<T> = {
  [key in ChainsBigType]: T[];
};
// axios 返回的数据格式
export interface MyResponseType<T> {
  code: number;
  msg: string;
  data: T;
}
