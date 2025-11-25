/* //统一管理项目中用户相关的接口
//@ts-ignore
import request from '@/utils/request';
import type { loginForm, loginResponseData, userInfoResponseData } from './type';
//统一管理接口
enum API {
    LOGIN_URL = '/user/login',
    GET_USER_INFO_URL = '/user/info',
}
//对外暴露请求函数
//登录接口方法
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息接口方法
export const reqGetUserInfo = () => request.get<any, userInfoResponseData>(API.GET_USER_INFO_URL); */

//干掉当年的假接口


//统一管理项目中用户相关的接口
import type { loginFormData, loginResponseData, userInfoResponseData, logoutResponseData } from './type';
//@ts-ignore
import request from '@/utils/request';
//项目用户相关的接口
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USER_INFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}
//登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息接口
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USER_INFO_URL);  
//退出登录接口
export const reqLogout = () => request.post<any, logoutResponseData>(API.LOGOUT_URL);
