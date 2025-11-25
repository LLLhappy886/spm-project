<template>
  <div>
    <el-card class="box-card">
      <div class="container">
        <img :src="userStore.avatar" alt="我的头像" class="avatar">
        <div>
          <h3 class="title">{{ getTime()+ '好，' + userStore.username }}</h3>
          <p class="desc">硅谷甄选营运平台</p>
        </div>
      </div>
    </el-card>
    <div class="background">
      <SvgIcon name="welcome" width="800px" height="600px"></SvgIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
//在路由守卫中发请求
/* //引入生命周期
import { onMounted } from 'vue';
import { useUserStore } from '../../store/modules/user';
//获取仓库
let userStore = useUserStore();
//目前主页挂载完毕发请求获取用户信息
onMounted(() => {
  userStore.getUserInfo();
}) */
//引入用户相关仓库
import {useUserStore} from '../../store/modules/user';
//引入获取时间戳
import { getTime } from '../../utils/time';
//获取仓库对象
const userStore = useUserStore();
//
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .title {
    margin: 20px 30px;
    font-size: 24px;
    font-weight: bold;
  }
  .desc {
    margin: 20px 30px;
    font-size: 14px;
    color: #999;
  }
  .background {
    display: flex;
    justify-self: center;
  }
</style>