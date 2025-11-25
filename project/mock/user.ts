//用户信息数据
function createUserList() {
  return [
    {
      userId: 1,
      avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}


// 定义 RequestWithHeaders 接口
interface RequestWithHeaders {
  headers: {
    token: string;
  };
}
//暴露两个接口
export default [
  //用户登录接口
  {
    url: '/api/user/login',//请求地址
    method: 'post',//请求方法
    response: ({body}) => {
      //获取请求参数
      const { username, password } = body;
      //获取用户列表,判断是否存在该用户
      const checkUser = createUserList().find(
        (item) =>  item.username === username && item.password === password
      )
      console.log(username)
      console.log(password)
      //没有该用户，返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          data: {message: '账号或密码错误'}
        }
      }
      //存在该用户，获取用户信息
      const { token } = checkUser
      return {
        code: 200,
        data: {
          token,
        }
      }
    }
  },
  //获取用户信息接口
  {
    url: '/api/user/info',
    method: 'get',
    response: (request: RequestWithHeaders) => {
      //获取请求头中的token
      const token = request.headers.token;
      //获取用户列表,判断是否存在该用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有该用户，返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          data: {message: 'token错误'}
        }
      }
      //存在该用户，获取用户信息
      return {
        code: 200,
        data: {
          checkUser
        }
      }
    }
  }
]