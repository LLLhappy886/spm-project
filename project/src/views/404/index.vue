<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <p>抱歉，你访问的页面不存在！</p>
    <div class="button">
    <button @click="goHome">返回首页</button>
  </div>
  </div>
  
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>
<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  padding-left: 200px;
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    width: 50%;
    height: 50%;
  }
  p {
    font-size: 50px;
    font-weight: bold;
    margin-top: 20px;
    color: #24a9d6;
    position: relative;
    left: 500px;
    bottom: 300px;
  }
  
}
.button {
  height: 10%;
  button {
    position: relative;
    top: -200px;
    left: 500px;
    width: 100px;
    height: 50px;
    border-color: #ddd;
    border-radius: 25px;
  }
}
</style>