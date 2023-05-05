import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pkg from '../package.json'

export default defineConfig({
  root: './',
  // keep the same name as your github repos
  base: `/${pkg}/`,
  mode: 'production',
  plugins: [vue()],
  build: {
    outDir: './docs',
  },
})
