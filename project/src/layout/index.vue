<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <logo/>
      <!-- 菜单列表 -->
       <!-- 滚动组件 -->
       <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu :collapse="layoutSettingStore.fold" :default-active="$route.path" background-color="#001529" text-color="#fff">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
       </el-scrollbar>
    </div>
     <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
      <Tabbar/>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
      <Main/>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入logo组件
import logo from './logo/index.vue'
//导入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示组件
import Main from './main/index.vue'
//右侧导航组件
import Tabbar from './tabbar/index.vue'
//获取路由对象
import { useRoute } from 'vue-router'
//获取用户相关的小仓库
import { useUserStore } from '../store/modules/user'
import useLayoutSettingStore from '../store/modules/setting'
let userStore = useUserStore()
//获取layout配置仓库
let layoutSettingStore = useLayoutSettingStore();

// 获取当前路由对象
let $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
      width: $base-menu-width;
      height: 100vh;
      background-color: $base-menu-bg-color;
      transition: 0.3s;
      color:#fff;
      .scrollbar {
        width: 100%;
        height: calc(100vh - $base-menu-logo-height);
        .el-menu {
          border-right: none;
        }
      }
      &.fold {
        width: $base-menu-min-width;
      }
    }
  }
  
  .layout_tabbar {
    position: fixed;
    height: $base-tabbar-height;
    width: calc(100% - $base-menu-width);
    //background-color: #fff;
    top: 0px;
    left: $base-menu-width;
    transition: 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height:calc(100vh - $base-tabbar-height);
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 10px;
    overflow: auto;
    transition: 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
</style>