//返回数据类型
export interface ResponseData {
    code: number;
    ok: boolean;
    message: string;
}

//SKU数据的ts类型
export interface SkuData {
  skuName: string;
  spuId: number | string;
  tmId: number | string;
  category3Id: number | string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  skuDefaultImg: string;
  skuAttrValueList: SkuAttrValueList;
  skuSaleAttrValueList: SkuSaleAttrValueList;
  skuImgList: SkuImg[];
  isSale: number;
  id: number;
}
// SKU 图片
export interface SkuImg {
  id: number
  skuId: number
  imgName: string
  imgUrl: string
  spuImgId: number
  isDefault: string
}

export interface SkuAttrValue {
  attrId: number | string;
  valueId: number | string;
  attrName: string
  id: number
  skuId: number
  valueName: string
};
export type SkuAttrValueList = SkuAttrValue[];

export interface SkuSaleAttrValue {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
  id: number
  saleAttrName: string
  saleAttrValueName: string
  skuId: number
};
export type SkuSaleAttrValueList = SkuSaleAttrValue[];

//SKU列表接口返回的数据类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}

//获取SKU接口返回的数据类型
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    orders: any[];
  }
}
//展示SKU接口返回的数据类型
export interface SkuShowData extends ResponseData {
  data: SkuData;
}

