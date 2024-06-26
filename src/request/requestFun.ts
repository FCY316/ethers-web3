import { MyResponseType } from "@/interface";
import $axios from "./axios";
// 发送 GET 请求的函数示例
export const getRequest = async <T>(
  url: string,
  params?: any
): Promise<MyResponseType<T>> => {
  try {
    const { data } = await $axios.get(url, {
      params,
    });
    return data;
  } catch (e: any) {
    throw e;
  }
};

// 发送 POST 请求的函数示例
export const postRequest = async <T>(
  url: string,
  params?: any
): Promise<MyResponseType<T>> => {
  try {
    const { data } = await $axios.post(url, params);
    return data;
  } catch (e: any) {
    throw e;
  }
};
