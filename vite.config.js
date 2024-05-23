import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const resolveP = (dir) => path.join(__dirname, dir);
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()
  ],
  resolve:  {
    alias: {
      "@":resolveP('src'),
      "@assets":resolveP('src/assets'),
      "@components":resolveP('src/components')
    }
    
  },
  server: {
    host: '0.0.0.0', 
  },
  build: {
    rollupOptions: {
      input: {
          // 配置所有页面路径，使得所有页面都会被打包
          main: resolve(__dirname, 'index.html'),
          status: resolve(__dirname, 'page/detail/index.html'),
      }
    }
  }
})