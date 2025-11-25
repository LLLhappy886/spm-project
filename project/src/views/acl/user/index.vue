<template>
  <div>
    <el-card>
      <el-form inline class="form">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyword?false:true" >搜索</el-button>
          <el-button type="primary" @click="reset" >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin:10px 0;">
      <el-button type="primary" @click="addUser">新增用户</el-button>
      <el-button type="danger" :disabled="!selectIdList.length" @click="batchDeleteUser">批量删除</el-button>
      <!-- 展示用户信息的表格 -->
       <el-table border :data="userList" @selection-change="handleSelectionChange" style="margin: 10px 0;">
         <el-table-column type="selection"></el-table-column>
         <el-table-column label="#" type="index"></el-table-column>
         <el-table-column label="ID" prop="id" show-overflow-tooltip></el-table-column>
         <el-table-column label="用户名" prop="username" show-overflow-tooltip></el-table-column>
         <el-table-column label="用户昵称" prop="name" show-overflow-tooltip></el-table-column>
         <el-table-column label="用户角色" prop="roleName" show-overflow-tooltip></el-table-column>
         <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip></el-table-column>
         <el-table-column label="更新时间" prop="updateTime" show-overflow-tooltip></el-table-column>
         <el-table-column label="操作" width="350px">
           <template #="{row}">
              <el-button type="primary" icon="User" @click="setRole(row)" >分配角色</el-button>
              <el-button type="warning" icon="Edit" @click="updateUser(row)" >编辑</el-button>
              <el-popconfirm :title="`您确定删除用户${row.username}吗?`" width="260px" @confirm="deleteUser(row)">
                <template #reference>
                  <el-button type="danger" size="default" icon="Delete" title="删除用户">删除</el-button>
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
            :page-sizes="[5 ,7, 9, 11]"
            :disabled="false"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @current-change="getUserList"
            @size-change="getUserList"
          />
        </div>
    </el-card>
    
    <!-- 抽屉组件，用于展示SKU -->
      <el-drawer v-model="showDrawer" @closed="closeDrawer">
        <template #header>
          <h2>{{ userParams.id? '编辑用户信息' : '新增用户' }}</h2>
        </template>
        <template #default>
          <el-form :model="userParams" ref="formref" :rules="rules" label-width="80px" label-position="left">
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item v-if="!userParams.id" label="用户密码" prop="password">
              <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
            </el-form-item>
          </el-form>
          <div style="float: right; margin-top: 20px;">
            <el-button type="default" @click="showDrawer = false">取消</el-button>
            <el-button type="primary" @click="saveNewUser">保存</el-button>
          </div>
        </template>
      </el-drawer>
      <!-- 抽屉组件，用于角色分配 -->
      <el-drawer v-model="showRoleDrawer">
        <template #header>
          <h2>分配用户角色</h2>
        </template>
        <template #default> 
          <el-form ref="formref" label-width="80px" label-position="left">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userParams.username" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="职位列表">
              <el-checkbox style="width: 100%;" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">全选</el-checkbox>
              <!-- 角色列表 -->
              <el-checkbox-group v-model="userRole" @change="handleCheckedRoleChange">
                <el-checkbox v-for="role in allRole" :key="role.id" :label="role" :value="role">{{ role.roleName }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div style="float: right; margin-top: 20px;">
            <el-button type="default" @click="showRoleDrawer = false">取消</el-button>
            <el-button type="primary" @click="saveUserRole">保存</el-button>
          </div>
        </template>
      </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import { reqAddOrUpdateUser, reqAllRole, reqDeleteAllUser, reqRemoveUser, reqSetRole, reqUserInfo } from '../../../api/acl/user'
import { ElMessage } from 'element-plus'
import type { AllRole, Recoeds, SetRoleData, User } from '../../../api/acl/user/type'
import { useUserStore } from '../../../store/modules/user';
import useLayoutSettingStore from '../../../store/modules/setting';


//引入用户相关的小仓库
let userStore = useUserStore();

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
//存储全部用户的数据
const userList = ref<Recoeds>([])
//角色编辑抽屉组件是否显示
let showDrawer = ref<boolean>(false);
//角色分配抽屉组件是否显示
let showRoleDrawer = ref<boolean>(false);
//收集用户信息
let userParams: User = reactive({
  name: '',
  password: '',
  username: '',
})
//获取form组件实例
const formref = ref<any>()
//发送请求获取用户信息
const getUserList = () => {
  reqUserInfo(currentPage.value, pageSize.value, keyword.value).then(res => {
    total.value = res.data.total
    userList.value = res.data.records
  }).catch(err => {
    ElMessage.error('获取用户信息列表失败，'+err.message)
  })
}
//组件挂载时请求数据
onMounted(() => {
  getUserList()
})
//用户更改自己名字，是否刷新页面的变量。
const freshflag = ref<boolean>(false)
//编辑用户信息
const updateUser = (row: User) => {
  showDrawer.value = true;
  //TODO: 编辑用户信息
  userParams.id = row.id;
  userParams.name = row.name;
  userParams.password = row.password;
  userParams.username = row.username;
  freshflag.value = userParams.username === userStore.username ? true : false;
}
//新增用户信息
const addUser = () => {
  //清空用户信息(未知bug,抽屉组件关闭时清除数据会留下admin的数据)
  Object.assign(userParams, {
    id: '',
    name: '',
    password: '',
    username: '',
  })
  //新增时不刷新页面
  freshflag.value = false;
  showDrawer.value = true;
}
//保存新增用户信息
const saveNewUser = () => {
  // 表单验证
    formref.value.validate().then(() => {
    showDrawer.value = false;
    // 发送请求
      reqAddOrUpdateUser(userParams).then(res => {
      if (res.code === 200) {
        ElMessage.success('保存成功');
        getUserList();
        if (freshflag.value) {
          window.location.reload();
        }
      } else {
        ElMessage.error('保存失败，' + res.message);
      }
    }).catch((err) => {
      ElMessage.error('保存失败，' + err.message);
    })
  }).catch(() => {
    ElMessage.error('请检查输入信息是否正确');
  });
}

//用户信息验证器
//@ts-ignore
const validatorUserName = (rule: any, value: string, callback: any) => {
   if(value.trim().length >= 3 && value.trim().length <= 15) {
    callback()
   }else {
    callback(new Error('用户名长度在 3 到 15 个字母'))
   }
}
//@ts-ignore
const validatorName = (rule: any, value: string, callback: any) => {
   if(value.trim().length >= 3 && value.trim().length <= 10) {
    callback()
   }else {
    callback(new Error('用户昵称长度在 3 到 10 个字符'))
   }
}
//@ts-ignore
const validatorPassword = (rule: any, value: string, callback: any) => {
   if(value.trim().length >= 5 && value.trim().length <= 20) {
    callback()
   }else {
    callback(new Error('用户密码长度在 5 到 20 个字符'))
   }
}
//表单验证规则对象
const rules = {
  //用户名验证规则
  username: [
    //{ required: true, message: '请输入用户名', trigger: 'blur' },
    //{ min: 5, max: 10, message: '用户名长度在 5 到 10 个字符', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validatorUserName },
  ],
  //用户昵称验证规则
  name: [
    //{ required: true, message: '请输入用户昵称', trigger: 'blur' },
    //{ min: 5, max: 10, message: '用户昵称长度在 5 到 10 个字符', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validatorName },
  ],
  //用户密码验证规则
  password: [
    //{ required: true, message: '请输入用户密码', trigger: 'blur' },
    //{ min: 5, max: 20, message: '用户密码长度在 5 到 20 个字符', trigger: 'blur' },
    { required: true, trigger: 'blur', validator: validatorPassword },
  ],
}
//监听抽屉组件关闭时清空用户信息
const closeDrawer = () => {
  //清空用户信息
    userParams.id = '';
    userParams.name = '';
    userParams.password = '';
    userParams.username = '';
    //表单验证信息清空
    nextTick(() => {
      formref.value.resetFields()
    })
}
//存储角色列表
const allRole = ref<AllRole>([])
//当前用户已有的角色
const userRole = ref<AllRole>([])
//分配用户角色
const setRole = (row: User) => {
  //TODO: 角色分配
  Object.assign(userParams, row)
  //发送请求获取角色列表
  reqAllRole((row.id as number)).then(res => {
    if (res.code === 200) {
      allRole.value = res.data.allRolesList
      userRole.value = res.data.assignRoles
      //显示角色分配抽屉组件
      showRoleDrawer.value = true;
      //初始化全选按钮状态
      nextTick(() => {
        isIndeterminate.value = userRole.value.length ? true : false
      })
    }

  }).catch(err => {
    ElMessage.error('获取用户角色列表失败，'+err.message)
  })
}
//分配角色保存按钮回调
const saveUserRole = () => {
  //收集参数
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map(item => (item.id as number))
  }
  //发送请求
  reqSetRole(data).then(res => {
    if (res.code === 200) {
      ElMessage.success('保存成功')
      showRoleDrawer.value = false;
      getUserList()
    }else {
      ElMessage.error('保存失败，'+res.message)
    }
  }).catch(err => {
    ElMessage.error('保存失败，'+err.message)
  })
}
//全选按钮是否选中
const checkAll = ref<boolean>(false)
//是否半选
const isIndeterminate = ref<boolean>(true)
//全选按钮回调
const handleCheckAll = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
//复选框回调
const handleCheckedRoleChange = (value: AllRole) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
//删除按钮回调
const deleteUser = async(row : User) => {
  //TODO: 删除用户
  reqRemoveUser(row.id as number).then(res => {
    if (res.code === 200) {
      ElMessage.success('删除成功')
      getUserList()
    }else {
      ElMessage.error('删除失败，'+res.message)
    }
  }).catch(err => {
    ElMessage.error('删除失败，'+err.message)
  })
}

//准备一个数组，存储批量删除的id
const selectIdList = ref<number[]>([])
//table复选框选中回调
const handleSelectionChange = (val: Recoeds) => {
  selectIdList.value = val.map(item => (item.id as number))
}
//批量删除按钮回调
const batchDeleteUser = () => {
  //TODO: 批量删除
  reqDeleteAllUser(selectIdList.value).then(res => {
    if (res.code === 200) {
      getUserList()
      ElMessage.success('删除成功')
    }else {
      ElMessage.error('删除失败，'+res.message)
    }
  }).catch(err => {
    ElMessage.error('删除失败，'+err.message)
  })
}
//定义一个变量，用于收集用户的搜索条件
const keyword = ref<string>('')
//搜索按钮回调
const search = () => {
  //TODO: 搜索用户
  getUserList();
}

//获取模板setting仓库
const settingStore = useLayoutSettingStore();
//重置按钮回调
const reset = () => {
  settingStore.refresh = !settingStore.refresh

}
</script>

<style scoped>
.form {
  /* display: flex;
  justify-content: space-between; */
  height:35px;
}

</style>