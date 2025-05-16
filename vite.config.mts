import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: [
        resolve(__dirname, 'src/index.ts'),
        resolve(__dirname, 'src/versions/6.0.ts'),
        resolve(__dirname, 'src/versions/6.1.ts'),
        resolve(__dirname, 'src/versions/6.2.ts'),
        resolve(__dirname, 'src/versions/6.4.ts'),
        resolve(__dirname, 'src/versions/6.7.ts'),
        resolve(__dirname, 'src/versions/6.9.ts'),
        resolve(__dirname, 'src/versions/7.0.ts'),
        resolve(__dirname, 'src/versions/7.2.ts'),
        resolve(__dirname, 'src/versions/7.6.ts'),
        resolve(__dirname, 'src/versions/7.7.ts'),
        resolve(__dirname, 'src/versions/7.8.ts'),
        resolve(__dirname, 'src/versions/7.10.ts'),
        resolve(__dirname, 'src/versions/8.0.ts'),
        resolve(__dirname, 'src/versions/9.0.ts'),
        resolve(__dirname, 'src/versions/latest.ts'),
      ],
      name: pkg.name,
      fileName(format, name) {
        if (format === 'es') {
          return `${name}.js`
        }
        return `${name}.${format}`
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
