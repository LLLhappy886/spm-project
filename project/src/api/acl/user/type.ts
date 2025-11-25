//接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//一个账号信息的ts类型
export interface User {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  username: string;
  password: string;
  name: string;
  phone?: null;
  roleName?: string;
}
//数组包含全部的账号信息
export type Recoeds = User[];
//获取全部账号信息的接口返回的数据类型
export interface UsersResponseData extends ResponseData {
  data: {
    records: Recoeds
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    coutId: null
    maxLimit: number
    searchCount: boolean
    pages: number
  };
}
//一个职位的ts类型
export interface RoleData {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: string;
}
//数组包含全部的职位信息
export type AllRole = RoleData[];
//获取全部职位信息的接口返回的数据类型
export interface AllRolesResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  };
}
//给用户分配角色接口携带参数的类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}