//用户管理模块接口
import request from '../../../utils/request';
import type { AllRolesResponseData, SetRoleData, User, UsersResponseData } from './type';

enum API {
  //获取全部已有的用户账号信息
  ALLUSER_URL= '/admin/acl/user',
  //新增用户接口
  ADDUSER_URL = '/admin/acl/user/save',
  //更新用户信息接口
  UPDATEUSER_URL = '/admin/acl/user/update',
  //获取用户角色
  ALLROLER_URL= '/admin/acl/user/toAssign',
  //给已有用户分配角色
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  //删除用户信息接口
  REMOVEUSER_URL = '/admin/acl/user/remove',
  //批量删除用户信息接口
  DELETEALLUSER_URL= '/admin/acl/user/batchRemove',
}

//获取全部已有的用户账号信息
export const reqUserInfo = (page: number, pageSize: number, username: string) => request.get<any, UsersResponseData>(API.ALLUSER_URL+`/${page}/${pageSize}?username=${username}`)
//新增与更新用户接口
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    //如果有id，则更新用户信息
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    //反之则新增用户信息
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}
//获取用户角色
export const reqAllRole = (userId: number) => request.get<any, AllRolesResponseData>(API.ALLROLER_URL + `/${userId}`)

//给已有用户分配角色
export const reqSetRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL , data)
//删除某一个用户信息接口
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.REMOVEUSER_URL + `/${userId}`)
//批量删除用户信息接口
export const reqDeleteAllUser = (idList: number[]) => request.delete<any, any>(API.DELETEALLUSER_URL, {data: idList})