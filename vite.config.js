import { fileURLToPath, URL } from 'url'


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      path: "path-browserify",
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: '0,0,0,0',
    port : 8000,
  }, 
  define: {
    'process.env': {}
  },
  proxyTable: {
    '/api': {
      target: 'http://localhost:3000/',
      ChangeOrigin: true
    }
  },
})
