<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time" >当前时间：{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

//每秒获取一次当前时间
const time = ref<string>()
//定时器
const timer = ref(0)
onMounted(() => {
  timer.value = setInterval(() => {
  time.value = new Date().toLocaleString()
}, 1000)
})
//组件销毁之前清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
//获取路由
const $router = useRouter()
// 点击首页按钮
const goHome = () => {
  $router.push('/')
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left{
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;

    .lbtn {
      width: 150px;
      height: 38px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
    }
  }
  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;

    .rbtn {
      width: 150px;
      height: 38px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
    }
    .time {
      color: #29fcff;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      margin-right: 150px;
    }
  }
  .center{
    flex: 1.2;

    .title {
      width: 100%;
      height: 80px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 30px;
      line-height: 80px;
      text-align: center;
    }
  }
}

</style>