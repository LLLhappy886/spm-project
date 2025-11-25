// 商品管理-商品-SPU相关接口
import request from "../../../utils/request";
import type { AllTrademark, HasSaleAttrResponseData, HasSpuResponseData, SkuData, SkuInfoData, SpuData, SpuImageList, SpuSaleAttrResponseData } from "./type";

enum API {
  // 获取已有的SPU数据
  HASSPU_URL= '/admin/product',
  //获取全部品牌的数据
  ALLTRADEMARK_URL= '/admin/product/baseTrademark/getTrademarkList',
  //获取SPU照片墙
  IMAGE_URL= '/admin/product/spuImageList',
  //获取某一个spu已有的销售属性数据
  SALES_ATTR_URL= '/admin/product/spuSaleAttrList',
  //获取整个项目全部的销售属性列表
  ALLSALEATTR_URL= '/admin/product/baseSaleAttrList',
  //追加一个新的SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有的SPU
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  //追加一个新的SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  //查看一个SPU下所有的售卖商品
  SKUINFO_URL= '/admin/product/findBySpuId',
  //删除已有的SPU
  REMOVESPU_URL = '/admin/product/deleteSpu',
}
// 获取一个三级分类下已有的SPU数据
export const reqHasSpu = (page :number, limit :number, category3Id :number | string) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`);
// 获取全部SPU品牌的数据
export const reqAllTrademark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL);
// 获取SPU照片墙
export const reqSpuImageList = (spuId :number) => request.get<any, SpuImageList>(API.IMAGE_URL + `/${spuId}`);
// 获取某一个spu已有的销售属性数据
export const reqHasSalesAttr = (spuId :number) => request.get<any, SpuSaleAttrResponseData>(API.SALES_ATTR_URL + `/${spuId}`);
// 获取整个项目全部的销售属性列表
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);
// 追加一个新的SPU
// 更新已有的SPU
export const reqAddOrUpdateSpu = (data :SpuData) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  }else{
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
};
// 追加一个新的SKU
export const reqAddSku = (data :SkuData) => request.post<any, any>(API.ADDSKU_URL, data);
// 查看一个SPU下所有的售卖商品
export const reqSkuInfo = (spuId :number | string) => request.get<any, SkuInfoData>(API.SKUINFO_URL + `/${spuId}`);
// 删除已有的SPU
export const reqRemoveSpu = (spuId :number | string) => request.delete<any, any>(API.REMOVESPU_URL + `/${spuId}`);
