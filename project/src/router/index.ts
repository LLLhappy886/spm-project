// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router';
import { constantRoute } from './routes';
//创建路由器
let router = createRouter({
  //history模式
  history: createWebHistory(),
  routes: constantRoute,
  //滚动条行为
  scrollBehavior: () => ({ left: 0, top: 0 })
})
//导出路由器
export default router;