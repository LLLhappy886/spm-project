import { ElMessage } from 'element-plus'
//进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { useUserStore } from '../store/modules/user';
//第一步：利用axios的create方法创建一个axios实例
const request = axios.create({
  // api的base_url
  baseURL:import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000 //请求超时时间
});
//第二步：请求拦截器
request.interceptors.request.use((config) => {
  //获取用户仓库中的token，以便登录后请求携带token
  let userStore = useUserStore();
  // config是axios的请求配置对象，可以对请求做一些处理，比如设置headers、添加参数等
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  //返回配置对象
  return config;

})
//第三步：响应拦截器
request.interceptors.response.use((response) => {
  //成功的回调
  //简化数据
  return response.data;
},
 (error) => {
  //失败的回调:处理htto网络错误
  //定义一个变量，用于存储网络错误信息
  let message = '';
  //http状态码
  let status = error.response.status;
  //根据http状态码判断错误类型
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请登录(401)/Token过期';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = `请求地址出错(404)`;
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网关错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网关超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接错误(${status})!网络状态不佳？`;
  }
  //提示错误信息
  ElMessage({
    type: 'error',
    message
  });
  return Promise.reject(error);
 }
);
//对外暴露request
export default request;