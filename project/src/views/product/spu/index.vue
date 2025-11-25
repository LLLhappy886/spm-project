<template>
  <div>
    <!-- 分类 -->
    <Category :scene="scene" />
    <el-card class="box-card" style="margin: 10px 0;">
      <div v-show="cardScene === 0">
        <!-- 卡片头部添加按钮 -->
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id === ''" @click="addSpu">添加SPU</el-button>
        <!-- 展示S已有的PU列表 -->
        <el-table style="margin: 10px 0;" border :data="records" >
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column prop="spuName" label="SPU名称">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button type="info" size="default" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
              <el-button type="warning" size="default" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="default" icon="View" title="查看SPU" @click="viewSpu(row)"></el-button>
              <el-popconfirm :title="`您确定删除${row.spuName}吗?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件，用于显示分页功能 -->
        <div class="demo-pagination-block">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[3, 5 ,7, 9]"
            :disabled="false"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @current-change="getHasSpu"
            @size-change="changePageSize"
          />
        </div> 
      </div>
      <!-- 添加|修改SPU组件 -->
      <Spuform v-show="cardScene === 1" @changeScene="changeScene"  ref="SpuForm"/>
      <!-- 添加SKU组件 -->
      <Skuform v-show="cardScene === 2" @changeScene="changeScene"  ref="SkuForm"/>
      <!-- dialog对话框，显示SKU列表 -->
      <el-dialog title="SKU列表" v-model="showSku">
        <el-table border :data="skuData" >
          <el-table-column prop="skuName" label="SKU名称">
          </el-table-column>
          <el-table-column prop="price" label="SKU价格">
          </el-table-column>
          <el-table-column prop="weight" label="SKU重量">
          </el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{row}">
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="skuDesc" label="SKU描述">
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
//分类仓库
import uesCategoryStore from '../../../store/modules/category';
import { reqHasSpu, reqRemoveSpu, reqSkuInfo } from '../../../api/product/spu';
import type { HasSpuResponseData, SkuData, SpuData } from '../../../api/product/spu/type';
import type { Records } from '../../../api/product/spu/type';
import Spuform from './spuform.vue';
import Skuform from './skuform.vue';
import { ElMessage } from 'element-plus';
const categoryStore = uesCategoryStore();
//SKU对话框的显示状态
const showSku = ref<boolean>(false)
//存储SKU数据
let skuData = ref<SkuData[]>([])
//获取子组件SkuForm实例
const SkuForm = ref<any>()
//获取子组件SpuForm实例
const SpuForm = ref<any>()
//存储SPU数据
let records = ref<Records>([])
//存储SPU总数
let total = ref<number>(0)
//场景(分类)的数据
let scene = ref<boolean>(true) 
//场景，card的数据 0:显示已有SPU, 1:显示添加SPU 2:显示添加SKU
let cardScene = ref<number>(0)
//分页默认页码
let currentPage = ref<number>(1)
//分页每页显示条数
let pageSize = ref<number>(3)
//监听3级分类的变化
watch(() => categoryStore.c3Id, () => {
  if(categoryStore.c3Id) {
    getHasSpu();
  }
})
//获取分类下的SPU列表
const getHasSpu = async () => {
  const res :HasSpuResponseData = await reqHasSpu( currentPage.value, pageSize.value, categoryStore.c3Id);
  if(res.code === 200) {
    records.value = res.data.records;
    total.value = res.data.total;
  }
}
//每页显示条数变化时，重新获取SPU列表
const changePageSize = () => {
  //可以在getHasTrademark函数中利用回调，将页码重置为1 :  好像有bug
  currentPage.value = 1
  //有三级分类时，才请求数据
  if(categoryStore.c3Id) {
    getHasSpu()
  }
}
//添加SPU
const addSpu = () => {
  //切换场景
  cardScene.value = 1
  //调用子组件的方法，获取数据
  SpuForm.value.initAddSpuData(categoryStore.c3Id)
}
//修改SPU
const updateSpu = (row: SpuData) => {
  //切换场景
  cardScene.value = 1
  //调用子组件的方法，获取数据
  SpuForm.value.initHasSpuData(row)

}
//删除SPU
const deleteSpu = (row: SpuData) => {
  //发送请求
  reqRemoveSpu(row.id as number).then(res => {
    if(res.code === 200) {
      ElMessage.success('删除成功')
      //刷新页面
      getHasSpu()
    } else {
      ElMessage.error('删除失败')
    }
  })
}
//添加SKU
const addSku = (row: SpuData) => {
  //切换场景
  cardScene.value = 2
  //调用子组件的方法，获取数据
  SkuForm.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
//查看SKU列表
const viewSpu = (row: SpuData) => {
  //发送请求
  reqSkuInfo((row.id as number)).then(res => {
      skuData.value = res.data
      showSku.value = true
  })
}
//自定义事件，让子组件通知父组件切换场景
const changeScene = (scene: number) => {
  cardScene.value = scene
  //再次获取全部的已有spu
  getHasSpu()
}
</script>

<style scoped>

</style>