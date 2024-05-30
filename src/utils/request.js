// axiosUtils.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // Add any other common headers here
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在请求发送之前，可以做一些配置处理，比如添加 token 等
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = 'Bearer ' + token;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 在这里对响应数据做处理，比如统一处理错误信息等
    return response.data;
  },
  error => {
    // 对响应错误做处理
    return Promise.reject(error);
  }
);

// 封装 HTTP 请求方法
const axiosUtils = {
  get: async (url, params = {}) => {
    try {
      const response = await instance.get(url, { params });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  post: async (url, data = {}) => {
    try {
      const response = await instance.post(url, data);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // 可以添加其他请求方法，比如 put, delete 等
};

export default axiosUtils;
