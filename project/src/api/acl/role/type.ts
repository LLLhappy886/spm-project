//角色管理模块ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
//职位数据类型
export interface RoleData {
  id?: number | string;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: string;
}
//职位数组的类型
export type Records = RoleData[];
//获取全部职位的返回类型
export interface RolesResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  },
}
//菜单与按钮数据的ts类型
export interface MenuData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  tocode: string;
  type: number;
  status: null;
  level: number;
  children: MenuList;
  select: boolean;
}

export type MenuList = MenuData[];
//获取菜单的返回类型
export interface MenusResponseData extends ResponseData {
  data: MenuList;
}