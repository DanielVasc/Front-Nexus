import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: true
  },
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Front Nexus',
        short_name: 'Nexus',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#222222',
        description: 'Site PWA do Front Nexus',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '48x48 64x64 96x96 128x128 256x256',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
