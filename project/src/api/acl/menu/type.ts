//菜单管理模块ts类型

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
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

//新增菜单的请求参数类型
export interface MenuParams {
  id?: number | string;
  pid: number;
  name: string;
  code: string;
  type: number;
  level: number;
}