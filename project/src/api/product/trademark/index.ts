//品牌管理模块接口
import request from '../../..//utils/request';
import type { TradeMark, TradeMarkResponse } from './type';
//品牌管理模块接口地址
enum API {
  //获取已有品牌接口
  TARDEMARK_URL="/admin/product/baseTrademark/",
  //添加品牌接口
  ADD_TARDEMARK_URL="/admin/product/baseTrademark/save",
  //修改品牌接口
  UPDATE_TARDEMARK_URL="/admin/product/baseTrademark/update",
  //删除品牌接口
  DELETE_TARDEMARK_URL="/admin/product/baseTrademark/remove",
}
//获取已有品牌接口方法
//page:页码
//limit:每页条数
export const reqHasTrademark = (page:number,limit:number) => request.get<any, TradeMarkResponse>(API.TARDEMARK_URL+`${page}/${limit}`);

//添加与修改品牌接口方法
export const reqAddOrUpdateTrademark = (data:TradeMark) => {
  if(data.id){
    //修改品牌
    return request.put<any, any>(API.UPDATE_TARDEMARK_URL,data);
  }else{
    //添加品牌
    return request.post<any, any>(API.ADD_TARDEMARK_URL,data);
  }
}

//删除品牌接口方法
export const reqDeleteTrademark = (id:number) => request.delete<any, any>(API.DELETE_TARDEMARK_URL+`/${id}`);