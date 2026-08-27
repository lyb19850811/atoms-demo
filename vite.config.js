import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 开发时前端跑在 5173，通过代理把 /api 转发到后端 3101
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3101'
    }
  }
})
