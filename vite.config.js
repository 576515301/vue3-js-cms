import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
