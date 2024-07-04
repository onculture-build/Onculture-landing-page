import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    hmr: false,
    watch: {
      usePolling: true,
    },
  },
  build: {
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500000,
  }
});
