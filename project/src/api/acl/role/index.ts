//角色管理模块的接口
import request from '../../../utils/request';
import type { MenusResponseData, RoleData, RolesResponseData } from './type';

//枚举地址
enum API {
  //获取全部职务的接口
  ALLROLE_RUL = '/admin/acl/role',
  //新增职务的接口
  ADDROLE_URL = '/admin/acl/role/save',
  //修改职务的接口
  UPDATE_URL = '/admin/acl/role/update',
  //根据角色获取菜单接口
  ALLPERMISSION_URL = '/admin/acl/permission/toAssign',
  //给角色分配权限接口
  SETPERMISSION_URL = '/admin/acl/permission/doAssign',
  //删除角色接口
  REMOVEROLE_URL = '/admin/acl/role/remove',
}

//获取全部职务的接口
export const reqAllRoleList = (page:number, limit:number, roleName:string) => request.get<any, RolesResponseData>(API.ALLROLE_RUL + `/${page}/${limit}?roleName=${roleName}`)
//添加或修改角色接口
export const reqAddOrUpdateRole = (data: RoleData) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data);
  } else {
    return request.post<any,any>(API.ADDROLE_URL, data);
  }
}
//根据角色获取菜单接口
export const reqAllPermissionByRole = (roleId: number) => request.get<any, MenusResponseData>(API.ALLPERMISSION_URL + `/${roleId}`)
//给角色分配权限接口
export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`)
//删除角色接口
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + `/${roleId}`)