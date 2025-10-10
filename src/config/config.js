// 应用配置文件
export const config = {
  // API 基础地址
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",

  // Socket.io 配置
  socketUrl: import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",

  // 应用配置
  app: {
    name: "在线投票系统",
    version: "1.0.0",
  },

  // 开发环境标识
  isDev: import.meta.env.DEV,

  // 生产环境标识
  isProd: import.meta.env.PROD,
};

export default config;
