import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/feeed.github.io/",
  plugins: [vue()],
  resolve: {
    alias: [

    ]
  },
})
