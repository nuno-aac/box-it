import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        dir: '../../dist/popup',
        entryFileNames: 'popup.js'
      }
    }
  },
  plugins: [react()]
});
