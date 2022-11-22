import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:3000,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false
      }
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    outDir: 'dist',
    commonjsOptions: {
      esmExternals: true,
    },
  },
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    EnvironmentPlugin('all')
    ],
});
