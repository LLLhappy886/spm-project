// 产品属性相关接口
import request from '../../..//utils/request';
import type { AttrObj, AttrResponseData, CategoryResponseData } from './type';

enum API {
  //获取一级分类的接口
  C1_URL = '/admin/product/getCategory1',
  //获取二级分类的接口
  C2_URL = '/admin/product/getCategory2/{category1Id}',
  //获取三级分类的接口
  C3_URL = '/admin/product/getCategory3/{category2Id}', 
  //获取分类下的所有属性的接口
  ATTR_URL= '/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}',
  //添加或修改属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除属性的接口
  DELETEATTR_URL = '/admin/product/deleteAttr/{attrId}'
}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
//获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL.replace('{category1Id}', category1Id.toString()));
//获取三级分类的接口方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL.replace('{category2Id}', category2Id.toString()));
//获取分类下的所有属性的接口方法
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL.replace('{category1Id}', category1Id.toString()).replace('{category2Id}', category2Id.toString()).replace('{category3Id}', category3Id.toString()));
//添加或修改属性的接口方法
export const reqAddOrUpdateAttr = (data: AttrObj) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data);
//删除属性的接口方法
export const reqDeleteAttr = (attrId: number) => request.delete<any, any>(API.DELETEATTR_URL.replace('{attrId}', attrId.toString()));