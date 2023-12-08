import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";
import { message } from "antd";
const href = process.env.BASE_URL;
const $axios = axios.create({
  baseURL: href, // 设置你的API基础URL
  timeout: 5000, // 设置请求超时时间
});
// 添加请求拦截器
$axios.interceptors.request.use(
  (config: AxiosRequestConfig & { headers: AxiosRequestHeaders }) => {
    // 在请求发送之前可以做一些处理，例如添加请求头等
    // config.headers.Authorization = "Bearer "; // 你可以添加身份验证头部
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
$axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在响应数据之前可以做一些处理
    return response.data;
  },
  (error: any) => {
    // ERR_BAD_REQUEST 是后端人员
    if (error.code === "ERR_BAD_REQUEST")
      return Promise.reject(error.response.data);
    else {
      message.error(error.message);
      return Promise.reject(error);
    }
    // 处理错误响应
  }
);
export default $axios;
