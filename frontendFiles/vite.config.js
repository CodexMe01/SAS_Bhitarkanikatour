import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/pay': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/verify_payment': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/success': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/ticket': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  base: '/'
})

