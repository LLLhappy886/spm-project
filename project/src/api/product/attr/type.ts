//分类相关的数据的ts类型
export interface ResponseData {
    code: number;
    message: string;
    ok: boolean;
}

//分类ts类型
export interface CategoryObj {
    id: number|string;
    name: string;
    category1Id?: number;
    category2Id?: number;
}
//相应的分类接口返回数据类型
export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[];
}
//属性与属性值ts类型

//已有的属性值对象ts类型
export interface AttrValueObj {
    id?: number;
    valueName: string;
    attrId?: number;
    flag?: boolean;
}
//存储每一个属性值的数组类型
export type AttrValueList = AttrValueObj[];
//属性对象ts类型
export interface AttrObj {
    id?: number;
    attrName: string;
    categoryId: number | string;
    categoryLevel: number;
    attrValueList: AttrValueList;
    attrIdAndValueId?: string;
}
//存储每一个属性对象的数组类型
export type AttrList = AttrObj[];

//相应的属性接口返回数据类型
export interface AttrResponseData extends ResponseData {
    data: AttrList;
}