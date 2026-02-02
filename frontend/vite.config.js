import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // 경로를 그대로 유지
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('프록시 에러:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('프록시 요청:', req.method, req.url);
          });
        },
      }
    }
  }
})
