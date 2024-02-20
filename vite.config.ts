import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
// https://vitejs.dev/config/
export default ({mode}:any)=>{
  return defineConfig({
    plugins: [vue()],
    resolve:{
     alias:{
      '@': fileURLToPath(new URL('./src',import.meta.url)
          ) 
     }
    },
    server:{
      host:'0.0.0.0',
      port:3000,
      proxy:{
        '/api':{
          target:'http://localhost:3000',
          // rewrite:(path:string)=>path.replace(/^\/api/,'')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/assets/scss/global.scss";`
        }
      }
    }
  })
}

