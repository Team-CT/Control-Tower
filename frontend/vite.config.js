// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const devApiTarget = env.VITE_DEV_API_TARGET || 'http://localhost:8001';

  return {
    plugins: [react()],

    define: {
      global: 'globalThis',
    },

    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },

    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: devApiTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('프록시 에러:', err);
            });
            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log('프록시 요청:', req.method, req.url);
              if (req.url && req.url.includes('token=')) {
                console.log('토큰 포함된 요청:', req.url);
              }
            });
          },
        },
      },
    },
  };
});