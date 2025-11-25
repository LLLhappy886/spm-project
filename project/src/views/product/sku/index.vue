<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0; height: 85vh;" :data="skuArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" prop="skuName" width="150px"></el-table-column>
        <el-table-column label="描述" prop="skuDesc" ></el-table-column>
        <el-table-column label="默认图片" width="150px">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="重量" prop="weight" width="100px"></el-table-column>
        <el-table-column label="价格" prop="price" width="100px"></el-table-column>
        <el-table-column label="操作" width="280px" fixed="right">
          <template #="{row}">
            <el-button :type="row.isSale===1?'danger':'success'" size="default" :icon="row.isSale===1?'Bottom':'Top'" @click="handleSale(row)" ></el-button>
            <el-button type="warning" size="default" icon="Edit" @click="updateSku" ></el-button>
            <el-button type="info" size="default" icon="InfoFilled" @click="showSku(row)" ></el-button>
            <el-popconfirm :title="`您确定删除${row.skuName}吗?`" width="200px" @confirm="deleteSku(row)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" title="删除SKU"></el-button>
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
          :page-sizes="[10, 20, 30, 40]"
          :disabled="false"
          :background="true"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getHasSku"
          @size-change="getHasSku"
        />
      </div>
      <!-- 抽屉组件，用于展示SKU -->
      <el-drawer v-model="showDrawer">
        <template #header>
          <h4>查看商品的详情</h4>
        </template>
        <template #default>
          <div class="block text-center">
            <!-- 编辑SKU接口没写，新增sku无图片列表 -->
            <!-- <el-carousel height="150px">
              <el-carousel-item v-for="item in skuInfo?.skuImgList" :key="item">
                <h3 class="small justify-center" text="2xl">
                  <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
                </h3>
              </el-carousel-item>
            </el-carousel> -->
            <el-carousel height="500px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">
                  <img :src="skuInfo?.skuDefaultImg" alt="" style="width: 100%; height: 100%;">
                </h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <el-row>
            <el-col :span="6">名称</el-col>
            <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">描述</el-col>
            <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">价格</el-col>
            <el-col :span="18">{{ skuInfo?.price }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">
              <el-tag v-for="item in skuInfo?.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">
              <el-tag v-for="item in skuInfo?.skuSaleAttrValueList" :key="item.saleAttrId">{{ item.saleAttrName }}</el-tag>
            </el-col>
          </el-row>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqDeleteSku, reqSale, reqSkuList, reqUnsale } from '../../../api/product/sku';
import type { SkuData } from '../../../api/product/sku/type';
import { ElMessage } from 'element-plus';
import { reqSkuInfo } from '../../../api/product/sku';

//抽屉组件是否显示
let showDrawer = ref<boolean>(false);
//分页器当前页码
let currentPage = ref<number>(1);
//分页器每页显示条数
let pageSize = ref<number>(10);
//数据总条数
let total = ref<number>(0);
//存储SKU数据
let skuArr = ref<SkuData[]>([]);
//存储当前展示的SKU数据
let skuInfo = ref<SkuData>();
//组件挂载时请求数据
onMounted(() => {
  getHasSku();
})
//请求数据方法
const getHasSku = () => {
  //TODO: 请求数据
 reqSkuList(currentPage.value, pageSize.value).then(res => {
  if (res.code === 200) {
    //TODO: 处理数据
    total.value = res.data.total;
    skuArr.value = res.data.records;
  }
 })
}
//商品上下架的回调
const handleSale = (row: SkuData) => {
  if (row.isSale === 1) {
    //TODO: 下架商品
    reqUnsale((row.id as number)).then(res => {
      if (res.code === 200) {
        ElMessage.success('下架成功');
        row.isSale = 0;
      }
    }).catch(err => {
      ElMessage.error('下架失败,'+ err.message);
    })
  }else {
    //TODO: 上架商品
    reqSale((row.id as number)).then(res => {
      if (res.code === 200) {
        ElMessage.success('上架成功');
        row.isSale = 1;
      }
    }).catch(err => {
      ElMessage.error('上架失败,'+ err.message);
    })
  }
}
//更新SKU按钮回调
const updateSku = () => {
  ElMessage.success('正在开发中……');
}
//查看SKU按钮回调
const showSku = (row: SkuData) => {
  showDrawer.value = true;
  //获取数据
  reqSkuInfo(row.id as number).then((res) => {
    //存储数据
    skuInfo.value = res.data;
  }).catch(err => {
    ElMessage.error('获取数据失败,'+ err.message);
  });
}
//删除SKU按钮回调
const deleteSku = (row: SkuData) => {
  reqDeleteSku(row.id as number).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功');
      //TODO: 刷新数据
      getHasSku();
    }
  }).catch(err => {
    ElMessage.error('删除失败,'+ err.message);
  })
}

</script>

<style scoped>
.el-carousel {
  margin-bottom: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-row {
  margin: 15px 0 ;
}
.el-tag {
  margin: 5px;
}
</style>