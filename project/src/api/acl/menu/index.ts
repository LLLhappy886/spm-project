//菜单管理模块相关接口
import request from '../../../utils/request';
import type { MenuParams, MenusResponseData } from './type';
//枚举地址
enum API {
  //获取全部菜单的地址
  ALLPERMISSION_URL = '/admin/acl/permission',
  //新增菜单的地址
  ADDMENU_URL = '/admin/acl/permission/save',
  //修改菜单的地址
  UPDATEMENU_URL = '/admin/acl/permission/update',
  //删除菜单的地址
  DELETEMENU_URL = '/admin/acl/permission/remove',
}

//获取全部菜单的接口
export const reqAllPermission = () => request.get<any, MenusResponseData>(API.ALLPERMISSION_URL);
//新增或修改菜单的接口
export const reqAddOrUpdateMenu = (data : MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
}
//删除菜单的接口
export const reqDeleteMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + `/${id}`);