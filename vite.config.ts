import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    hmr: false,
    watch: {},
    proxy: {
      '/api': {
        target: 'https://api.mailerlite.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v2'),
      },
    },
  },
  define: {
    global: 'globalThis',
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500000,
  },
});
