import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Serve images from parent project's /public so we don't duplicate assets.
// Also proxy /api/* to the Express gallery server (default :4000) during dev.
export default defineConfig({
  plugins: [react()],
  publicDir: '../public',
  server: {
    port: 5174,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
});
