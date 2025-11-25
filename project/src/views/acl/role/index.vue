<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="角色名称">
          <el-input placeholder="请输入角色名称" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword?false:true" @click="searchRole">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px 0;">
      <el-button type="primary" icon="Plus" @click="dialogFormVisible = true" >添加角色</el-button>
      <!-- 展示角色信息的表格 -->
       <el-table border :data="roleList"  style="margin: 10px 0;">
         <el-table-column label="#" type="index"></el-table-column>
         <el-table-column label="ID" prop="id" show-overflow-tooltip></el-table-column>
         <el-table-column label="角色名称" prop="roleName" show-overflow-tooltip></el-table-column>
         <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
         <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
         <el-table-column label="操作" width="350px">
           <template #="{row}">
              <el-button type="primary" icon="User" @click="setPermission(row)" >分配权限</el-button>
              <el-button type="warning" icon="Edit" @click="editRole(row)">编辑</el-button>
              <el-popconfirm :title="`您确定删除角色${row.roleName}吗?`" width="260px" @confirm="deleteRole(row)" >
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" title="删除角色">删除</el-button>
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
            :page-sizes="[5 ,10, 15, 20]"
            :disabled="false"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @current-change="getHasRole"
            @size-change="getHasRole"
          />
        </div>
    </el-card>
    
    <!-- 弹出对话框组件，用于添加角色 -->
    <el-dialog v-model="dialogFormVisible" :title="roleParams.id? '修改角色' : '添加角色'" @closed="dialogClose">
      <el-form ref="form"  :model="roleParams" :rules="rules" style="width:80%" label-width="auto">
        <el-form-item label="角色名称" prop="roleName">
          <el-input placeholder="请输入角色名称" v-model="roleParams.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input placeholder="请输入角色名称" v-model="roleParams.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="comfirm">确定</el-button>
      </template>
    </el-dialog>
    <!-- 抽屉组件，用于显示分配权限功能 -->
     <el-drawer v-model="showDrawer" @closed="closeDrawer">
        <template #header>
          <h2>分配角色权限</h2>
        </template>
        <template #default> 
          <el-form :model="roleParams" label-width="80px" label-position="left">
            <el-form-item label="角色名" prop="roleName">
              <el-input :disabled="true" v-model="roleParams.roleName"></el-input>
            </el-form-item>
            <el-tree
              ref="tree"
              style="max-width: 600px"
              :data="menuList"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :default-checked-keys="checkedKeys"
              :props="defaultProps"
            />
          </el-form>
          <div style="float: right; margin-top: 20px;">
            <el-button type="default" @click="showDrawer = false">取消</el-button>
            <el-button type="primary" @click="savePermission">保存</el-button>
          </div>
        </template>
      </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { reqAddOrUpdateRole, reqAllPermissionByRole, reqAllRoleList, reqRemoveRole, reqSetPermission } from '../../../api/acl/role'
import type { MenuList, RoleData } from '../../../api/acl/role/type'
import useLayoutSettingStore from '../../../store/modules/setting';

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
//搜索关键字
const keyword = ref<string>('')
const roleList = ref<RoleData[]>([])

//发送请求获取用户信息
const getHasRole = () => {
  reqAllRoleList(currentPage.value, pageSize.value, keyword.value).then(res => {
    total.value = res.data.total
    roleList.value = res.data.records
  }).catch(err => {
    ElMessage.error('获取用户信息列表失败，'+err.message)
  })
}
//组件挂载时请求数据
onMounted(() => {
  getHasRole()
})
//搜索角色
const searchRole = () => {
  getHasRole()
}
//获取模板setting仓库
const settingStore = useLayoutSettingStore();
//重置按钮回调
const reset = () => {
  settingStore.refresh = !settingStore.refresh

}



//弹出框状态
const dialogFormVisible = ref<boolean>(false)
//弹出框参数
const roleParams = reactive<RoleData>({
  id: '',
  roleName: '',
  createTime: '',
  updateTime: '',
  remark: '',
})
//dialog关闭回调
const dialogClose = () => {
  Object.assign(roleParams, {
  id: '',
  roleName: '',
  createTime: '',
  updateTime: '',
  remark: '',
  })
}
//编辑角色按钮的回调
const editRole = (row: RoleData) => {
  Object.assign(roleParams, row)
  dialogFormVisible.value = true
}
//自定义校验角色名称
//@ts-ignore
const validatorRoleName = (rule: any, value: string, callback: any) => {
  if (value.trim().length >= 2 && value.trim().length <= 20) {
    callback()
  } else {
    callback(new Error('角色名称长度必须在2-20个字符之间'))
  }
}

//校验规则
const rules = {
  roleName: [
    { required: true, trigger: 'blur', validator: validatorRoleName },
  ],
}
//获取form表单
const form = ref<any>()
//弹出框确定按钮的回调
const comfirm = () => {
  //表单校验
  form.value.validate().then(() => {
    //发送请求
    reqAddOrUpdateRole(roleParams).then(res => {
      if (res.code === 200) {
        ElMessage.success(roleParams.id ? '修改角色成功': '添加角色成功')
        //修改的话好像没改到数据，可能要排查一下接口
        dialogFormVisible.value = false
        getHasRole()
      } else {
        ElMessage.error('操作失败，'+ res.message)
      }
    }).catch((err) => {
      ElMessage.error('操作失败，'+ err.message)
    })
  }).catch(() => {
    ElMessage.error('请检查输入内容是否规范')
  })
}




//抽屉状态
const showDrawer = ref<boolean>(false)
//用户权限参数
const menuList = ref<MenuList>([])
//权限树参数
const defaultProps = {
  children: 'children',
  label: 'name',
}
//准备一个数组：用于存储选中的权限的id(四级)
const checkedKeys = ref<number[]>([])
//分配权限按钮的回调
const setPermission = (row: RoleData) => {
  //设置角色参数
  Object.assign(roleParams, row)
  //获取权限列表
  reqAllPermissionByRole(row.id as number).then(res => {
    if (res.code === 200) {
    menuList.value = res.data
    checkedKeys.value = fliterSelectArr(menuList.value, [])
    showDrawer.value = true
    } else {
      ElMessage.error('获取权限列表失败，'+ res.message)
    }
  }).catch(err => {
    ElMessage.error('获取权限列表失败，'+ err.message)
  })
  
}
//过滤选中的权限方法
const fliterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.children) {
      fliterSelectArr(item.children, initArr)
    } else {
      if (item.select && item.level === 4) {
        initArr.push(item.id)
      }
    }
  })
  return initArr
}
//获取tree组件实例
const tree = ref<any>()
//抽屉保存按钮的回调
const savePermission = () => {
  //角色id
  const roleId = roleParams.id as number
  //选中的权限id
  let arr = tree.value.getCheckedKeys(true)
  //半选的id
  let halfArr = tree.value.getHalfCheckedKeys()
  //合并选中和半选的id
  let permissionId = arr.concat(halfArr)
  //发送请求
  reqSetPermission(roleId, permissionId).then(res => {
    if (res.code === 200) {
      ElMessage.success('分配权限成功')
      showDrawer.value = false
      //刷新页面
      //window.location.reload();
    } else {
      ElMessage.error('分配权限失败，'+ res.message)
    }
  }).catch(err => {
    ElMessage.error('分配权限失败，'+ err.message)
  })
}
//抽屉关闭回调
const closeDrawer = () => {
  //清空角色参数
  Object.assign(roleParams, {
  id: '',
  roleName: '',
  createTime: '',
  updateTime: '',
  remark: '',
  })
  //清空权限列表
  menuList.value = []
}


//删除角色按钮回调
const deleteRole = (row: RoleData) => {
  reqRemoveRole(row.id as number).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除角色成功')
      getHasRole()
    } else {
      ElMessage.error('删除角色失败，'+ res.message)
    }
  }).catch(err => {
    ElMessage.error('删除角色失败，'+ err.message)
  })
}
</script>


<style lang="scss" scoped>
.form {
  height:35px;
}

</style>