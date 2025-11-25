<template>
  <div>
    <el-card class="box-card">
    <!-- 卡片头部添加按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">添加品牌</el-button>
      <!-- 表格组件，用于显示已有的品牌数据 -->
       <!-- 
          table
          --boder:设置表格是否有纵向边框
          table-column
          --label：设置表格列的标题
          --width：设置表格列的宽度
          --align：设置表格列的对齐方式
       -->
      <el-table style="margin: 10px 0;" border :data="trademarkList">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称">
          <!-- 也可以使用自定义插槽 -->
           <!-- <template #="{row, $index}">
             <span>{{row.tmName}}</span>
           </template> -->
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{row}">
            <img :src="row.logoUrl" alt="未有图片" style="width: 50px;height: 50px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{row}">
            <el-button type="primary" size="default" icon="Edit" @click="updateTradeMark(row)"></el-button>
            <el-popconfirm title="您确定删除该品牌吗？" width="200px" @confirm="deleteTradeMark(row.id)">
              <template #reference>
                <el-button type="danger" size="default" icon="Delete"></el-button>
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
          @current-change="getHasTrademark"
          @size-change="changePageSize"
        />
      </div>
  </el-card>
  <!-- 弹出对话框组件，用于添加品牌 -->
  <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id? '修改品牌' : '添加品牌'" @closed="dialogClose">
    <el-form style="width:80%" label-width="auto" label-position="left" :model="trademarkParams" :rules="rules" ref="formRef">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
         <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="{token: GET_TOKEN()}"
          >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
         </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="comfirm">确定</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqAddOrUpdateTrademark, reqDeleteTrademark, reqHasTrademark } from '../../../api/product/trademark'
import type { Records, TradeMark, TradeMarkResponse } from '../../../api/product/trademark/type'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from '../../../utils/token'
import type { UploadProps } from 'element-plus'
//当前页码
const currentPage = ref<number>(1)
//每页显示条数
const pageSize = ref<number>(3)
//存储已有品牌的数据总数
const total = ref<number>(0)
//存储已有品牌的数组
const trademarkList = ref<Records>([])
//弹出对话框的显示状态
const dialogFormVisible = ref<boolean>(false)
//获取el-form的实例
const formRef = ref<any>()
//定义收集品牌的数据
const trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
//获取品牌数据的接口封装成函数
const getHasTrademark = () => {
  //若pagesize改变，不传入page参数，默认返回第一页数据
  reqHasTrademark( currentPage.value, pageSize.value).then((res: TradeMarkResponse) => {
    //更新数据总数
    total.value = res.data.total
    //更新品牌数组
    trademarkList.value = res.data.records
  })
}
//页面加载完成后，获取品牌数据
onMounted(() => {
  getHasTrademark()
})
//分页器页码发生变化时，重新获取品牌数据
//对于当前页码发生变化的自定义事件，组件pagiation向父组件回传了数据
// const changePage = () => {
//   getHasTrademark()
// }
//分页器每页显示条数发生变化时，重新获取品牌数据，并跳转到第一页
const changePageSize = () => {
  //可以在getHasTrademark函数中利用回调，将页码重置为1 :  好像有bug
  currentPage.value = 1
  getHasTrademark()
}
//添加品牌按钮的回调
const addTradeMark = () => {
  dialogFormVisible.value = true
  //清空表单数据
  trademarkParams.id = undefined
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
}
//更新品牌按钮的回调
const updateTradeMark = (row: TradeMark) => {
  dialogFormVisible.value = true
  //TODO: 调用获取品牌的接口，获取当前品牌的数据，并显示在弹窗中
  //ES6语法合并对象
  Object.assign(trademarkParams, row)
  /* trademarkParams.id = row.id
  trademarkParams.tmName = row.tmName
  trademarkParams.logoUrl = row.logoUrl */
}
//删除品牌按钮的回调
const deleteTradeMark = (id: number) => {
  //TODO: 调用删除品牌的接口
  reqDeleteTrademark(id).then(() => {
    ElMessage({
      type: 'success',
      message: '删除品牌成功'
    })
    //弹窗关闭后，重新获取品牌数据
    dialogFormVisible.value = false;
    getHasTrademark();
  }).catch(() => {
    ElMessage({
      type: 'error',
      message: '删除品牌失败'
    })
  })
}
//对话框确定按钮的回调
const comfirm = async () => {
  try{//发送请求之前，对表单进行校验
  //只有当全部的表单验证通过后，才发送请求
  await formRef.value.validate();
  //TODO: 调用添加品牌的接口
  dialogFormVisible.value = false
  let result: any = await reqAddOrUpdateTrademark(trademarkParams);
  if(result.code === 200){
    //添加|修改品牌
    ElMessage({
      type: 'success',
      message: trademarkParams.id? '修改品牌成功' : '添加品牌成功'
    })
    //弹窗关闭后，重新获取品牌数据
    dialogFormVisible.value = false;
    getHasTrademark();
  }else{
    dialogFormVisible.value = false;
    ElMessage({
      type: 'error',
      message: trademarkParams.id? '修改品牌失败' : '添加品牌失败'
    })
  }}
  catch(err){
    ElMessage({
      type: 'error',
      message: '请正确填写'
    })
  }
}
//上传图片之前的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if(rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/gif'){
    ElMessage({
      type: 'error',
      message: '请务必上传图片格式文件PNG/JPG/GIF'
    })
    return false
  }else{
    if(rawFile.size > 4 * 1024 * 1024){
      ElMessage({
        type: 'error',
        message: '图片大小不能超过4M'
      })
      return false
    }else{
      return true
    }
  }
}
//图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (res) => {
  trademarkParams.logoUrl = res.data
  //图片上传成功后，清除对应图片的校验结果
  formRef.value.clearValidate('logoUrl')
}
//弹窗关闭的回调
const dialogClose = () => {
  //清空表单验证信息
  formRef.value.resetFields()
}
//品牌名称验证函数
// const validatorTmName = ( value: string, callback: any) => {
//   //自定义校验规则
//     // 先检查 value 是否为字符串
//   if (typeof value !== 'string') {
//     callback(new Error('请输入有效的文本'));
//     return;
//   }
//   if (value.trim().length >= 2) {
//     callback()
//   } else {
//     callback(new Error('品牌名称长度不能少于2个字符'))
//   }
// }
//品牌LOGO验证函数
//@ts-ignore
const validatorLogoUrl = ( rules: any, value: any, callBack: any) => {
  //自定义校验规则
  if (value) {
    callBack()
  } else {
    callBack(new Error('请上传品牌LOGO'))
  }
}
//表单验证规则对象
const rules:any = {
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur'},
    { required: true, min: 2, max: 20, message: '品牌名称长度不能少于2个字符,不能多于20个字符', trigger: 'blur'}
  ],
  logoUrl: [
    { validator: validatorLogoUrl },
  ],
}
</script>

<style scoped lang="scss">
  .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  }
  
</style>
<style lang="scss">
  .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>