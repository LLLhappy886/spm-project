<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuParams.tmId">
          <el-option v-for="(item) in allTrademark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input placeholder="请输入SPU的描述" v-model="spuParams.description" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          v-model:file-list="spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :headers="{token: GET_TOKEN()}"
          :before-upload="handleUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="预览图片" style="width: 80%; height: 80%;" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select v-model="saleAttrIDAndValueName" :placeholder="unSelectSaleAttr.length? '请选择销售属性' : '暂无可选属性'" >
          <el-option v-for="(item) in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
        </el-select>
        <el-button :disabled="!saleAttrIDAndValueName" type="primary" size="default" icon="Plus" @click="addSaleAttr" style="margin-left: 10px;">添加属性值</el-button>
        <!-- table 展示销售属性 -->
         <el-table  :data="saleAttr" border style="margin: 10px 0;">
           <el-table-column type="index" label="序号" width="80px"></el-table-column>
           <el-table-column prop="saleAttrName" label="销售属性名称" width="120px"></el-table-column>
           <el-table-column prop="value" label="销售属性值">
             <template #="{row}">
               <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" class="mx-1" closable style="margin: 0 5px;" @close="() => row.spuSaleAttrValueList.splice(index, 1)">
                 {{ item.saleAttrValueName }}
               </el-tag>
               <el-input v-if="row.flag === true" v-model="row.saleAttrValue" placeholder="请输入属性值" size="small" style="margin-left: 10px; width: 100px;" @blur="toLook(row)"></el-input>
               <el-button v-else type="primary" size="small" icon="Plus" @click="toEdit(row)"></el-button>
             </template>
           </el-table-column>
           <el-table-column label="操作" width="120px">
             <template #="{$index}">
               <el-button type="danger" size="default" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
             </template>
           </el-table-column>
         </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button :disabled="spuParams.spuName === '' || spuParams.description === ''" type="primary" @click="handleSubmit">保存</el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTrademark, reqHasSalesAttr, reqSpuImageList } from '../../../api/product/spu'
import type { HasSaleAttr, SaleAttr, SaleAttrValue, SpuData, SpuImage, Trademark } from '../../../api/product/spu/type'
import { GET_TOKEN } from '../../../utils/token'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['changeScene'])

//取消按钮
const cancel = () => {
  $emit('changeScene', 0)
}
//存储spu数据
const allTrademark = ref<Trademark[]>([])
const spuImageList = ref<SpuImage[]>([])
const saleAttr = ref<SaleAttr[]>([])
const allSaleAttrList = ref<HasSaleAttr[]>([])
//控制图片对话框的显示与隐藏
const dialogVisible = ref(false);
//存储预览图片地址
const dialogImageUrl = ref('');
//存储还未收集的销售属性
const saleAttrIDAndValueName = ref<string>('')
//存储已有的SPU对象
const spuParams = ref<SpuData>({
  category3Id: '',
  spuName: '',
  description: '',
  tmId: '',
  spuSaleAttrList: <SaleAttr[]>[],
  spuImageList: <SpuImage[]>[],
});
//获取spu数据的方法
const initHasSpuData = async (spu: SpuData) => {
  //存储已有的SPU对象
  spuParams.value = spu;
  //spu为父组件传来的已有spu数据
  //发请求完整spu数据
  //获取所有品牌数据
  let res = await reqAllTrademark();
  //获取spu图片墙数据
  let res1 = await reqSpuImageList((spu.id as number));
  //获取spu销售属性数据
  let res2 = await reqHasSalesAttr((spu.id as number));
  //获取整个项目的spu的销售属性
  let res3 = await reqAllSaleAttr();
  if (res.code === 200) {
    allTrademark.value = res.data
  }
  if (res1.code === 200) {
    spuImageList.value = res1.data.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
  })
  }
  if (res2.code === 200) {
    saleAttr.value = res2.data
  }
  if (res3.code === 200) {
    allSaleAttrList.value = res3.data
  }
}
//照片墙预览
const handlePictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
//照片墙删除图片方法
const handleRemove = () => {

}
//图片上传钩子
const handleUpload = (file: any) => {
  if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
    ElMessage({
      type: 'error',
      message: '请务必上传图片格式文件PNG/JPG/GIF'
    })
    return false
  }else{
    if(file.size > 10 * 1024 * 1024){
      ElMessage({
        type: 'error',
        message: '图片大小不能超过10M'
      })
      return false
    }else{
      return true
    }
  }
}
//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttrList.value.filter((item) => {
    return saleAttr.value.every((saleItem) => {
      return item.name !== saleItem.saleAttrName;
    })
  })
  return unSelectArr
})
//添加销售属性值
const addSaleAttr = () => {
  //整理数据对象
  let [baseSaleAttrID, saleAttrName] = saleAttrIDAndValueName.value.split(':')
  //准备一个新的销售属性对象
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId: Number(baseSaleAttrID),
    saleAttrName: saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr);
  //清空选择的销售属性
  saleAttrIDAndValueName.value = ''
}
//属性值添加按钮
const toEdit = (row: SaleAttr) => {
  //将当前属性值设置为可编辑状态
  row.flag = true;
  //为row追加一个数组收集属性值
  row.saleAttrValue = '';
}
//input失去焦点的回调
const toLook = (row: SaleAttr) => {
  //将属性值添加到属性值列表
  const {baseSaleAttrId, saleAttrValue} = row;
  //整理数据
  let newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: (saleAttrValue as string),
  }
  //非法情况判断
  if (saleAttrValue?.trim()==='') {
    ElMessage({
      type: 'error',
      message: '属性值不能为空'
    })
    return;
  }
  //判断是否已存在该属性值
  let isExist = row.spuSaleAttrValueList.find(item => {
    return item.saleAttrValueName === saleAttrValue
  })
  if(isExist){
      ElMessage({
        type: 'error',
        message: '属性值已存在'
      })
      return;
  }

  //将新属性值添加到属性值列表
  row.spuSaleAttrValueList.push(newSaleAttrValue);
  //切换查看状态
  row.flag = false;
}
//保存按钮的回调
const handleSubmit = async () => {
  //整理数据
  //spu图片墙数据
  spuParams.value.spuImageList = spuImageList.value.map((item:any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //spu销售属性数据
  spuParams.value.spuSaleAttrList = saleAttr.value
  //发请求保存数据
  let res = await reqAddOrUpdateSpu(spuParams.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '修改成功' : '添加成功'
    })
    //更新成果，切换场景
    $emit('changeScene', 0)
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '修改失败' : '添加失败'
    })
  }
}
//添加一个新的spu的初始化方法
const initAddSpuData = async(c3Id: number|string) => {
  //清空spu数据
  Object.assign(spuParams.value, {
    id: '',
    category3Id: '',
    spuName: '',
    description: '',
    tmId: '',
    spuSaleAttrList: <SaleAttr[]>[],
    spuImageList: <SpuImage[]>[],
  });
  //清空销售属性列表
  saleAttr.value = [];
  //清空图片列表
  spuImageList.value = [];
  //清空选择的销售属性
  saleAttrIDAndValueName.value = '';
  //存储3级分类id
  spuParams.value.category3Id = c3Id;
  //获取所有品牌数据
  let res = await reqAllTrademark();
  if (res.code === 200) {
    allTrademark.value = res.data
  }
  //获取整个项目的spu的销售属性
  let res1 = await reqAllSaleAttr();
  if(res1.code === 200){
    allSaleAttrList.value = res1.data
  }
}
//对外暴露
defineExpose({ initHasSpuData, initAddSpuData })
</script>

<style scoped>

</style>