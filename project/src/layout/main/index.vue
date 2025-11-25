<template>
  <!-- 路由组件出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
  import { watch, ref, nextTick } from 'vue';
  import useLayoutSettingStore from '../../store/modules/setting';
  //控制页面刷新的标识
  let flag = ref(true);
  let LayoutSettingStore = useLayoutSettingStore();
  //监听刷新页面的事件
  watch(() => LayoutSettingStore.refresh, () => {
    //点击刷新按钮，组件销毁
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  })
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>