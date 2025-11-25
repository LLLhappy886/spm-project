<template>
  <div>
    <el-table
      :data="permissionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="code" label="权限值"/>
      <el-table-column label="操作">
        <template #="{row}">
              <el-button type="primary" size="small" v-show="row.level!==4" @click="addmenu(row)"> {{ row.level===3?'添加功能':'添加菜单' }} </el-button>
              <el-button type="primary" size="small" v-show="row.level!==1" @click="editmenu(row)">编辑</el-button>
              <el-popconfirm :title="`您确定删除用户${row.name}吗?`" width="260px" @confirm="deleteMenu(row)" >
                <template #reference>
                  <el-button type="primary" size="small" title="删除用户" v-show="row.level!==1" >删除</el-button> 
                </template>
              </el-popconfirm>
           </template>
      </el-table-column>
    </el-table>
    <!-- 弹出对话框组件，用于添加品牌 -->
    <el-dialog v-model="dialogFormVisible" :title="menuParams.id? '修改菜单' : '添加菜单'" @closed="dialogClose">
      <el-form label-width="auto" label-position="left" :model="menuParams">
        <el-form-item label="名称" prop="name">
          <el-input placeholder="请输入名称" v-model="menuParams.name"></el-input>
        </el-form-item>
        <el-form-item label="权限值" prop="code">
          <el-input placeholder="请输入权限值" v-model="menuParams.code"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="comfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { reqAddOrUpdateMenu, reqAllPermission, reqDeleteMenu } from '../../../api/acl/menu';
import { ElMessage } from 'element-plus';
import type { MenuData, MenuParams } from '../../../api/acl/menu/type';

//存储菜单数据
const permissionArr = ref<MenuData[]>([]);
//组件挂载时请求数据
onMounted(() => {
  //请求数据
  getHasPermission()
})
//请求数据
const getHasPermission = () => {
  reqAllPermission().then(res => {
    if (res.code === 200) {
      permissionArr.value = res.data
    } else {
      ElMessage.error('获取用户信息列表失败，'+res.message)
    }
  }).catch(err => {
    ElMessage.error('获取用户信息列表失败，'+err.message)
  })
}


//对话框state
const dialogFormVisible = ref(false)
//对话框参数
const menuParams = ref<MenuParams>({
  id: '',
  name: '',
  code: '',
  level: 0,
  pid: 0,
  type: 0,
})
//编辑按钮回调
const editmenu = (row: MenuParams) => {
  menuParams.value = row
  dialogFormVisible.value = true
}
//添加按钮回调
const addmenu = (row: MenuParams) => {
  //新增菜单时，level为当前加1
  menuParams.value.level = row.level + 1
  menuParams.value.pid = row.id as number
  dialogFormVisible.value = true
}
//对话框关闭回调
const dialogClose = () => {
  menuParams.value = {
    id: '',
    name: '',
    code: '',
    level: 0,
    pid: 0,
    type: 0,
  }
}
//确认按钮回调
const comfirm = () => {
  reqAddOrUpdateMenu(menuParams.value).then(res => {
    if (res.code === 200) {
      ElMessage.success({message: menuParams.value.id? '修改菜单成功' : '添加菜单成功'})
      dialogFormVisible.value = false
      getHasPermission()
    } else {
      ElMessage.error({message: menuParams.value.id? '修改菜单失败' : '添加菜单失败'})
    }
  }).catch(err => {
    ElMessage.error('请求失败，'+err.message)
  })
}
//删除按钮回调
const deleteMenu = (row: MenuParams) => {
  reqDeleteMenu(row.id as number).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除菜单成功')
      getHasPermission()
      } else {
        ElMessage.error('删除菜单失败')
      }
  }).catch(err => {
    ElMessage.error('请求失败，'+err.message)
  })
}
</script>

<style scoped>

</style>