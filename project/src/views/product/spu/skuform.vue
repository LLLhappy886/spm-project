<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="skuParams.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model.number="skuParams.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(g)">
        <el-input placeholder="重量(g)" type="number" v-model.number="skuParams.weight"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form inline label-width="100px" label-position="left">
          <el-form-item v-for="(item) in platformAttr" :key="item.id" :label="item.attrName">
            <el-select v-model="item.attrIdAndValueId">
              <el-option v-for="(value) in item.attrValueList" :key="value.id" :label="value.valueName" :value="`${item.id}:${value.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form inline label-width="100px" label-position="left">
          <el-form-item v-for="(item) in saleAttr" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.saleIdAndValueId">
              <el-option v-for="(saleAttrValue) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${item.id}:${saleAttrValue.id}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imageList" ref="imageTable">
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column  label="图片">
            <template #="{row}">
              <img :src="row.imgUrl" style="width: 100px; height: 100px;"></img>
            </template>
          </el-table-column>
          <el-table-column  label="名称" prop="imgName"></el-table-column>
          <el-table-column  label="操作">
            <template #="{row}">
              <el-button type="warning" @click="getUrl(row)">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { SaleAttr, SkuAttrValue, SkuData, SkuSaleAttrValue, SpuData, SpuImage } from '../../../api/product/spu/type';
//引入请求的接口
import { reqAttr } from '../../../api/product/attr';
import { reqSpuImageList, reqHasSalesAttr, reqAddSku } from '../../../api/product/spu';
import type { AttrObj } from '../../../api/product/attr/type';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';

//获取table组件实例
const imageTable = ref<any>();
//平台属性
const platformAttr = ref<AttrObj[]>([]);
//销售属性
const saleAttr = ref<SaleAttr[]>([]);
//图片列表
const imageList = ref<SpuImage[]>([]);
//收集SKU数据
const skuParams = reactive<SkuData>(
  {
    spuId: '',
    tmId: '',
    category3Id: '',
    //v-model收集
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuDefaultImg: '',
    skuAttrValueList: <SkuAttrValue[]>[],
    skuSaleAttrValueList: <SkuSaleAttrValue[]>[]
  }
);

//取消按钮的回调
const cancel =() => {
  $emit('changeScene', 0)
}

//初始化sku数据
const initSkuData = ( c1Id: number | string, c2Id: number | string, spu: SpuData ) => {
  //初始化sku数据
  Object.assign(skuParams, {
    spuId: '',
    tmId: '',
    category3Id: '',
    //v-model收集
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuDefaultImg: '',
    skuAttrValueList: <SkuAttrValue[]>[],
    skuSaleAttrValueList: <SkuSaleAttrValue[]>[]
  })
  //收集数据
  skuParams.spuId = (spu.id as number);
  skuParams.tmId = spu.tmId;
  skuParams.category3Id = spu.category3Id;
  //获取平台属性
  reqAttr(c1Id, c2Id, spu.category3Id).then(res => {
    if (res.code === 200) {
      //初始化平台属性
      platformAttr.value = res.data;
    }
  })
  //获取销售属性
  reqHasSalesAttr((spu.id as number)).then(res => {
    if (res.code === 200) {
      //初始化销售属性
      saleAttr.value = res.data;
    }
  })
  //获取图片列表
  reqSpuImageList(spu.id as number).then(res => {
    if (res.code === 200) {
      //初始化图片列表
      imageList.value = res.data;
    }
  })

}
//设置默认图片
const getUrl = (row: SpuImage) => {
  //点击时清除所有复选框的选中状态
  imageList.value.forEach(item => {
    imageTable.value.toggleRowSelection(item, false);
  })
  //复选框选中
  imageTable.value.toggleRowSelection(row, true);
  //设置默认图片
  skuParams.skuDefaultImg = (row.imgUrl as string);
}
//保存按钮的回调
const save = () => {
  //整理sku数据
  //平台属性
  skuParams.skuAttrValueList = platformAttr.value.reduce((acc: any, cur: any) => {
    if (cur.attrIdAndValueId) {
      const [attrId, valueId] = cur.attrIdAndValueId.split(':');
      acc.push({
        attrId: Number(attrId),
        valueId: Number(valueId)
      })
    }
    return acc;
  },[])
  //销售属性
  skuParams.skuSaleAttrValueList = saleAttr.value.reduce((acc: any, cur: any) => {
    if (cur.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = cur.saleIdAndValueId.split(':');
      acc.push({
        saleAttrId: Number(saleAttrId),
        saleAttrValueId: Number(saleAttrValueId)
      })
    }
    return acc;
  },[])
  //发送请求
  reqAddSku(skuParams).then(res => {
    if (res.code === 200) {
      ElMessage.success('添加SKU成功');
    }else {
      ElMessage.error('添加SKU失败');
    }
    $emit('changeScene', 0)
  })
}

//自定义事件
let $emit = defineEmits(['changeScene'])
//当前子组件的方法对外暴露
defineExpose({
  initSkuData
})
</script>

<style scoped>

</style>