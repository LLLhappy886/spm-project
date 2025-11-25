import { createApp } from 'vue'
import App from '@/App.vue'

//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg插件需要的配置代码
//@ts-ignore
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目的全局组件
//@ts-ignore
import globalComponent from '@/components'
//暗黑模式需要的css
import 'element-plus/theme-chalk/dark/css-vars.css';
//引入模板的全局样式
import '@/styles/index.scss'
//引入路由对象
import router from './router'
//引入大仓库
import pinia from './store'
//获取应用实例对象
const app = createApp(App)
//安装element-plus组件
app.use(ElementPlus,
  {locale: zhCn}
)
//安装pinia大仓库
app.use(pinia)
//注册模板路由
app.use(router)

app.use(globalComponent)
//引入路由鉴权文件
import './permission';
//挂载应用
app.mount('#app')



