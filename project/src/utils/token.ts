//封装本地存储数据与读取数据的方法
//本地存储
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token);
}
//读取本地存储
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN');
}
//本地存储删除token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN');
}

//主题颜色的持久化
export const SET_DARKMODE = (darkmode: string) => {
  localStorage.setItem('darkmode', darkmode);
}
//读取本地存储
export const GET_DARKMODE = () => {
  return localStorage.getItem('darkmode');
}
//本地存储删除token
export const REMOVE_DARKMODE = () => {
  localStorage.removeItem('darkmode');
}