import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
const resolveP = (dir) => path.join(__dirname, dir);
import { resolve } from "path";
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    vue(),
    // Gzip压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 大于10KB的文件才压缩
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // 打包分析
    visualizer({
      filename: 'dist/stats.html',
      open: false, // 构建完成后不自动打开
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  // base: '/voteme/', 打包后增加的自定义路径
  resolve: {
    alias: {
      "@": resolveP("src"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除console
        drop_debugger: true, // 移除debugger
      },
    },
    // 分包策略
    rollupOptions: {
      input: {
        // 配置所有页面路径，使得所有页面都会被打包
        main: resolve(__dirname, "index.html"),
        // status: resolve(__dirname, 'page/detail/index.html')
      },
      output: {
        // 分包配置
        manualChunks: {
          // 将Vue相关库打包到一起
          vue: ['vue', 'vue-router', 'pinia'],
          // Element Plus单独打包
          elementPlus: ['element-plus', '@element-plus/icons-vue'],
          // 工具库
          utils: ['axios', 'pinia-plugin-persistedstate']
        },
        // 资源文件命名
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || 'asset';
          const info = name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
            return `images/[name]-[hash].${ext}`;
          }
          if (/\.(css)$/i.test(name)) {
            return `css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      },
    },
    // 启用gzip压缩大小报告
    reportCompressedSize: true,
    // 设置chunk大小警告限制（KB）
    chunkSizeWarningLimit: 1000,
  },
});
