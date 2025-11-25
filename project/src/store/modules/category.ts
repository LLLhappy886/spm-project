//商品分类模块的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '../../api/product/attr'
import type { CategoryState } from './types/type';
let uesCategoryStore = defineStore('Category',{ 
  state: () :CategoryState => { 
    return {
      //存储一级分类数据
      c1Arr: <any>[],
      //存储一级分类的id
      c1Id: '',
      //存储二级分类数据
      c2Arr: <any>[],
      //存储二级分类的id
      c2Id: '',
      //存储三级分类数据
      c3Arr: <any>[],
      //存储三级分类的id
      c3Id: ''
    }
  },
  actions: {
    async getC1() {
      let res:any = await reqC1();
      if(res.code === 200) {
        this.c1Arr = res.data;
      }
    },
    async getC2(category1Id: number | string) {
      let res:any = await reqC2(category1Id);
      if(res.code === 200) {
        this.c2Arr = res.data;
      }
    },
    async getC3(category2Id: number | string) {
      let res:any = await reqC3(category2Id);
      if(res.code === 200) {
        this.c3Arr = res.data;
      }
    }
  },
  getters: {

  }
 })
//导出
 export default uesCategoryStore