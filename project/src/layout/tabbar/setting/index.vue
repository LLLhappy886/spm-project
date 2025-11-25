<template>
  <el-button  icon="Refresh" size="small" circle @click="updateRefresh"></el-button>
  <el-button  icon="FullScreen" size="small" circle @click="fullScreen"></el-button>
  <el-popover width="200px"
        title="主题模式"
        content="Top Left prompts info"
        placement="bottom-end"
  >
    <el-form label-width="120px" label-position="left">
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" :teleported="false" @change="changeColor" ></el-color-picker>
      </el-form-item>
      <el-form-item label="夜间模式">
        <el-switch v-model="darkMode" active-icon="Moon" inline-prompt @change="changeDark" />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button  icon="Setting" size="small" circle></el-button>
    </template>
  </el-popover>
  <img :src="UserStore.avatar" alt="" style="height: 30px; width: 30px; margin: 0 12px; border-radius: 50%;">
  <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
      {{UserStore.username}}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
      </span>
      <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script setup lang="ts">
//获取用户相关的小仓库
import { useUserStore } from '../../../store/modules/user';

//获取骨架的小仓库
import useLayoutSettingStore from '../../../store/modules/setting';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { GET_DARKMODE, SET_DARKMODE } from '../../../utils/token';
//获取路由器对象
const $router = useRouter();
//获取路由对象
const $route = useRoute();
const LayoutSettingStore = useLayoutSettingStore();
//刷新按钮点击回调
const updateRefresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh;
};
//退出登录按钮点击回调
const logout = async () => {
  //第一件事情：向服务器发送退出登录请求
  //第二件事情：仓库当中关于用户的数据：清除(token,username,avatar)
  //第三件事情：跳转到登录界面
  await UserStore.userLogout();
  $router.push({path: '/login', query: {redirect: $route.path}});
}
//全屏按钮点击回调
const fullScreen = () => {
  //获取当前页面，dom的一个方法判断是否全屏
  let full = document.fullscreenElement;
  //切换全屏
  if(!full){
    document.documentElement.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
};
const UserStore = useUserStore();

//主题颜色切换
const color = ref('rgb(30, 144, 255)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

onMounted(() => {
  //获取本地存储的夜间模式变量
  GET_DARKMODE() === 'true'?darkMode.value = true:darkMode.value = false;
  //设置主题颜色
  const html = document.documentElement;
  darkMode.value?html.className='dark':html.className='';
})

//颜色切换的回调
const changeColor = () => {
  const html = document.documentElement;
  html.style.setProperty('--el-color-primary', color.value);
  html.style.setProperty('--el-color-success', color.value);
  html.style.setProperty('--el-color-warning', color.value);
  html.style.setProperty('--el-color-danger', color.value);
}

//夜间模式切换
const darkMode = ref(<boolean>false);
const changeDark = () => {
  //切换夜间模式
  let html = document.documentElement;
  //存储到本地
  SET_DARKMODE(darkMode.value.toString());
  //判断类名dark
  darkMode.value?html.className='dark':html.className='';
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped>

</style>