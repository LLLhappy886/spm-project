//引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
//引入element-plus提供的全部图标组件
import * as ElementPlusIconVue from '@element-plus/icons-vue'
import Category from '@/components/Category/index.vue'
const allGlobalComponents = {SvgIcon, Category}
//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app:any){
    //注册全部的全局组件
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key as keyof typeof allGlobalComponents])
      }
    );
    //注册element-plus提供的全部图标组件
    for (const [key, component] of Object.entries(ElementPlusIconVue)) {
      app.component(key, component)
    }
  }
}