import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    target: 'esnext',
  },
  base: process.env.NODE_ENV === 'production' ? '/fmi-le-orar' : '',
})
