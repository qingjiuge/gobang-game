import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default () => {
    return defineConfig({
        base: './',
        plugins: [
            vue(),
            AutoImport({
                // targets to transform
                include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
          
                // global imports to register
                imports: [
                  // 插件预设支持导入的api
                  'vue',
                  'vue-router',
                  // 自定义导入的api
                ],
              }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: '0.0.0.0',
            port: 3000,
            open: true
        }
    })
}

