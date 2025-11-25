//路由鉴权：项目中路由能不能被访问的权限的设置
import router from './router'
import setting from './setting';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false });
//获取token，判断用户是否登录成功
import { useUserStore } from './store/modules/user';
import pinia from './store';
let userStore = useUserStore(pinia);
//全局守卫：项目当中任意路由切换都会触发的钩子
//全局的前置守卫
//@ts-ignore
router.beforeEach( async (to, from, next) => {
  //to:即将进入的路由对象
  //from:当前导航正要离开的路由对象
  //next:是一个函数，表示放行
  //访问某一个路由之前的守卫
  nprogress.start();
  //判断用户是否登录
  let token = userStore.token;
  //获取用户名字
  let username = userStore.username;
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      //登录成功，除了login页面，都可以访问
      //如果有用户名字，则可以访问权限管理页面
      if (username) {
        next();
      } else {
        //如果没有用户名字，则在守卫这里发请求
        try { 
          //发请求获取用户名字
          await userStore.getUserInfo();
          //刷新时是异步路由的话，获取到用户信息，但路由还没加载完毕
          next({...to});
        } catch (error) {
          //token过期
          //用户手动修改本地存储的token
          //退出登录
          await userStore.userLogout();
          next({ path: '/login', query: { redirect: to.path } });
        }
      }
    }
  }else{
    if(to.path === '/login'){
      next();
    }else{
      next({ path: '/login', query: { redirect: to.path } });
    }
  }
})
//全局的后置守卫
//@ts-ignore
router.afterEach((to, from) => {
  document.title = `${to.meta.title} | ${setting.title}`;
  nprogress.done();
})

//第一个问题：任意卤藕切换实现进度条业务 ---nprogress
//第二个问题：如何实现路由的权限控制 ---router.beforeEach()
//全部路由组件：登录/404/任意路由/首页/数据大屏/权限管理（3个子路由）/商品管理（4个子路由）

//用户未登录：可以访问login,其余的路由都需要登录后才能访问（指向login）
//用户登录：可以访问任意路由（除了login(指向首页)）