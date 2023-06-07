import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      onwarn: ({ code }) => {
        if (code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
      },
      output: {
        dir: '../../dist/popup',
        entryFileNames: 'popup.js'
      }
    }
  },
  plugins: [react()]
});
