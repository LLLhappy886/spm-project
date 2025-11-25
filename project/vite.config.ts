import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//引入scg插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
//引入假接口插件
import {viteMockServe} from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig(({ command, mode })=> {  // command参数用于区分是开发环境还是生产环境
  //获取各个环境下对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(),'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // 假接口配置
      viteMockServe({
        //default
        mockPath: 'mock',
        localEnabled: command === 'serve',//保证只有开发阶段能使用mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    //引入全局css变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variable.scss" as *;`,
        }
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //是否需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
  }
})
