// //登录接口携带的参数类型
// export interface loginForm {
//   username: string;
//   password: string;
// }

// interface dataType {
//   token?: string;
//   message?: string;
// }

// //登录接口返回的参数类型
// export interface loginResponseData {
//   code: number;
//   data: dataType;
// }



// //获取用户信息接口返回的参数类型
// interface userInfo {
//   userId: number;
//   avatar: string;
//   username: string;
//   password: string;
//   desc: string;
//   roles: string[];
//   buttons: string[];
//   routes: string[];
//   token: string;
// }
// interface user {
//   checkuser: userInfo;
// }
// export interface userInfoResponseData {
//   code: number;
//   data: user;
// }

//假接口的ts类型，干掉

//登录接口携带的参数类型
export interface loginFormData {
  username: string;
  password: string;
}

//定义全部接口返回数据都拥有的ts类型
interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//定义登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string;
}
//定义获取用户信息接口返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  }
}
//定义退出登录接口返回的数据类型
export interface logoutResponseData extends ResponseData {
  data: null;
}