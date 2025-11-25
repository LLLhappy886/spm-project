<template>
  <div class="container">
    <!-- 数据大屏内容区域 -->
     <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Compare class="compare"></Compare>
          <Couter class="couter"></Couter>
        </div>
      </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue' 
//导入顶部组件
import Top from './components/top/index.vue'
//引入左侧三个组件
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
//引入中间的两个组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
//引入右侧的三个组件
import Rank from './components/rank/index.vue'
import Compare from './components/compare/index.vue'
import Couter from './components/couter/index.vue'
//定义数据
//获取div实例
const screen = ref()
//挂载时适配
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
//定义大屏的缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
//监听屏幕大小变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.webp) no-repeat;
  background-size: cover;

  .screen {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;

  .top {
    width: 100%;
    height: 40px;
  }
  .bottom {
    display: flex;

    .left {
      flex: 1;
      height: 1040px;
      width: 400px;
      display: flex;
      flex-direction: column;

      .tourist {
        flex: 1.3;
      }
      .sex {
        flex: 1;
      }
      .age {
        flex: 1;
      }
    }
    .right {
      flex: 1;
      height: 1040px;
      width: 400px;
      display: flex;
      flex-direction: column;
      .rank {
        flex: 1.2;
      }
      .compare {
        flex: 1;
      }
      .couter {
        flex: 1;
      }
    }
    .center {
      flex: 2;
      display: flex;
      flex-direction: column;
      .map {
        flex: 3;
      }
      .line {
        flex: 1;
      }
    }
  }
  }
}

</style>