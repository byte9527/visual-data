import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9999
  },
  resolve: {
    alias: {
      '@': pathResolve('./src'),
    }
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.vue', 'src/*.ts', 'src/*.js', 'src/*.vue']
    })
  ]
})
