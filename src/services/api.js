// api.js
import axios from "axios";

// API 基础URL
const API_BASE_URL = "http://localhost:3001/api/"; // 替换成实际的API地址

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 请求超时设置
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器 - 可添加 Token 或其他认证信息
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token"); // 从 localStorage 中获取 token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 统一处理错误
apiClient.interceptors.response.use(
  (response) => response.data, // 只返回响应数据
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // 处理未授权（比如跳转到登录页面）
      console.error("Token expired or invalid");
    } else if (status === 500) {
      // 处理服务器错误
      console.error("Server error");
    } else {
      // 处理其他错误
      console.error(error.message);
    }
    return Promise.reject(error);
  }
);

// GET 请求封装
export const get = (url, params = {}) => {
  return apiClient.get(url, { params });
};

// POST 请求封装
export const post = (url, data = {}) => {
  return apiClient.post(url, data);
};

// PUT 请求封装
export const put = (url, data = {}) => {
  return apiClient.put(url, data);
};

// DELETE 请求封装
export const del = (url) => {
  return apiClient.delete(url);
};
