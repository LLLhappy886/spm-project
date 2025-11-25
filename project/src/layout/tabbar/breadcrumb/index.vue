<template>
  <el-icon style="margin-right: 10px;" @click="changeIcon">
    <component :is="LayoutSettingStore.fold?'Expand':'Fold'"></component>
  </el-icon>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="!item.meta.hidden">
      <el-icon style="margin: 0 3px; vertical-align: -10%;">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">

//引入仓库数据控制图标变换
import useLayoutSettingStore from '../../../store/modules/setting';
//引入路由
import { useRoute } from 'vue-router';
let LayoutSettingStore = useLayoutSettingStore();
//点击图标的方法
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold;
}
//获取当前路由
let $route = useRoute();

</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped>

</style>