// 商品sku相关接口
import request from '../../../utils/request';
import type { SkuResponseData, SkuShowData} from '../sku/type';
//枚举地址
enum API {
  // 获取已有商品sku的数据
  SKU_URL= '/admin/product/list',
  //商品上架接口
  SALE_URL = '/admin/product/onSale',
  //商品下架接口
  UNSALE_URL = '/admin/product/cancelSale',
  //获取商品详情接口
  SKUINFO_URL = '/admin/product/getSkuInfo',
  //删除商品接口
  DELETE_URL = '/admin/product/deleteSku',
  //修改商品sku接口
}
// 获取已有商品sku的数据
export const reqSkuList = (page:number, limit:number) => request.get<any, SkuResponseData>(API.SKU_URL+`/${page}/${limit}`);
//已有商品上架的接口
export const reqSale = (id:number) => request.get<any, any>(API.SALE_URL+`/${id}`);
//已有商品下架的接口
export const reqUnsale = (id:number) => request.get<any, any>(API.UNSALE_URL+`/${id}`);
//获取商品详情接口
export const reqSkuInfo = (skuId:number) => request.get<any, SkuShowData>(API.SKUINFO_URL+`/${skuId}`);
//删除商品接口
export const reqDeleteSku = (skuId:number) => request.delete<any, any>(API.DELETE_URL+`/${skuId}`);