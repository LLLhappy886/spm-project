<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="profix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
//接受父组件传递的参数
  defineProps({
    profix: {
      type: String,
      default: '#icon-'
    },
    name: String,
    color: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '12px'
    },
    height: {
      type: String,
      default: '12px'
    }
  })
</script>

<style scoped>

</style>