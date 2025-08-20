import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '61.72.94.214', // 또는 10.0.0.7 등 지정 IP로 바인딩
    port: 5173,
  },
})
