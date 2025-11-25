//服务器全部接口返回的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//SPU数据的ts类型
export interface SpuData {
  id?: number | string;
  spuName: string;
  tmId: number | string;
  description: string;
  category3Id: number | string;
  spuSaleAttrList: null | SaleAttr[];
  spuImageList: null| SpuImage[];
}

//数组：包含元素都是SPU数据的ts类型
export type Records = SpuData[];

//定义SPU列表接口返回的数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  }
}

//所有品牌数据的ts类型定义
export interface Trademark {
  id: number;
  tmName: string;
  logoUrl: string;
}
//品牌接口返回的数据类型
export interface AllTrademark extends ResponseData {
  data: Trademark[];
}
//SPU品牌图片ts类型
export interface SpuImage {
  id?: number;
  imgName?: string;
  imgUrl?: string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  name?: string;
  url?: string;
}
//SPU品牌照片墙的数据类型
export interface SpuImageList extends ResponseData {
  data: SpuImage[];
}
//SPU已有的销售属性的数据类型
export interface SaleAttrValue {
  id?: number;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
  baseSaleAttrId: number;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}
//存储SPU销售属性的数组数据类型
export type SaleAttrValueList = SaleAttrValue[];

//SPU销售属性对象的数据类型
export interface SaleAttr {
  id?: number;
  baseSaleAttrId: number;
  saleAttrName: string;
  spuSaleAttrValueList: SaleAttrValueList;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  flag?: boolean;
  saleAttrValue?: string;
  saleIdAndValueId?: string;
}
//spu已有的销售属性接口返回的数据类型
export interface SpuSaleAttrResponseData extends ResponseData {
  data: SaleAttr[];
}
//已有的全部spu的接口返回的数据类型
export interface HasSaleAttr {
  id: number;
  name: string;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
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
}
export interface SkuAttrValue {
  attrId: number | string;
  valueId: number | string;
};
export type SkuAttrValueList = SkuAttrValue[];

export interface SkuSaleAttrValue {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
};
export type SkuSaleAttrValueList = SkuSaleAttrValue[];

//SKU列表接口返回的数据类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}