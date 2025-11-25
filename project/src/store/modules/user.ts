//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqUserInfo, reqLogin, reqLogout } from '../../api/user';
import type { UserState } from './types/type';
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '../../utils/token';
import type { loginFormData, loginResponseData, userInfoResponseData, logoutResponseData } from '../../api/user/type';
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';
//引入路由（常量路由）
import { constantRoute, asyncRoute, anyRoute } from '../../router/routes';
import router from '../../router';

//过滤异步路由
function filterAsyncRoute(asnycRoute: any, routes: any,) {
  return asnycRoute.filter((item: any) => {
      if(routes.includes(item.name)) {
        if(item.children && item.children.length > 0) {
          item.children = filterAsyncRoute(item.children, routes);
        }
        return true;
      }
  })
}

export const useUserStore = defineStore('User', {
  //小仓库存取数据的地方
  state: ():UserState => {
    return {
      token: GET_TOKEN(),//用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要的数据（路由）
      username: '', //用户名字
      avatar: '', //用户头像

    }
  },
  //异步|逻辑的地方
  actions: {
    //登录方法
    async userLogin(data:loginFormData){
      //登录请求
      let result:loginResponseData = await reqLogin(data);
      //登录成功
      if(result.code === 200){
        //存入token
        this.token = (result.data as string);
        //本地存储
        SET_TOKEN(result.data as string)
        return "ok";
      }else{
        //返回登录结果
        return Promise.reject(new Error(result.message));
      }
      
    },
    //获取用户信息
    async getUserInfo(){
      //请求用户信息,[用户头像， 名字]
      let result : userInfoResponseData = await reqUserInfo();
      //如果获取用户信息成功，存入用户信息
      if(result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
        //菜单的数据
        this.menuRoutes = [...constantRoute,...userAsyncRoute, anyRoute];
        //目前路由器管理的只有静态路由，计算完毕需要动态追加新路由
        [...userAsyncRoute, anyRoute].forEach((route :any) => {
          router.addRoute(route);
        })
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录方法
    async userLogout(){
      //退出登录请求
      let result : logoutResponseData = await reqLogout();
      //如果退出登录成功，清除token
      if(result.code === 200) {
        this.token = '';
        //清除本地存储
        REMOVE_TOKEN();
        //重置路由
        //this.menuRoutes = constantRoute;
        //重置用户名字
        this.username = '';
        //重置用户头像
        this.avatar = '';
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

  },
  getters: {

  }
})