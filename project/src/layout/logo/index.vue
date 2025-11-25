<template>
  <div class="logo" v-if="setting.logoShow">
    <img :src="setting.logo" alt="logo">
    <p v-show="!LayoutSettingStore.fold">{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts">
//引入logo标题的配置文件
import setting from '../../../src/setting';
import useLayoutSettingStore from '../../store/modules/setting';

let LayoutSettingStore = useLayoutSettingStore();
</script>
<script lang="ts">
export default {
  name: 'Logo',
}

</script>
<style scoped lang="scss">
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 14px;
    transition: all 0.3s;
    img {
      width: 40px;
      height: 40px;
    }
    p {
      white-space: nowrap;
      margin-left: 10px;
      font-size: $base-logo-title-fontsize;
    }
  }
</style>