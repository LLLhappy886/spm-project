<template>
  <div class="sex_container">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <p>男士</p>
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <p>女士</p>
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="chart" ref="sexChart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref } from 'vue';

//获取节点
const sexChart = ref();
const myChartref = ref<any>(null)
onMounted(() => {
  const myChart = echarts.init(sexChart.value);
  myChartref.value = myChart
  const option = ({
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [{
      type: 'bar',
      data: [58],
      barWidth: 25,
      z: 10,
      itemStyle: {
        color: '#0076ff',
        borderRadius: 25,
      },
    },
    {
      type: 'bar',
      data: [100],
      barWidth: 25,
      //调整柱子的位置
      barGap: '-100%',
      itemStyle: {
        color: '#ff5c7c',
        borderRadius: 25,
      },
    }],
    grid: {
      left:90,
      right:35,
      bottom:0,
      top:0,
    }
  })
  if (myChart) {
    myChart.setOption(option)
  }
})
onBeforeUnmount(() => {
  if (myChartref.value) {
    myChartref.value.dispose()
    myChartref.value = null
  }
})
</script>

<style lang="scss" scoped>
.sex_container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 90% 100%;
  margin-top: 15px;
  margin-left: 50px;

  .top {
    margin-left: 10px;

    .title {
      color: #fff;
      font-size: 16px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }
  .sex {
      width: 100%;
      margin-top: 30px;
      margin-left: -20px;
      display: flex;
      justify-content: center;
      img {
        position: relative;
        top: 20px;
        left: 26px;
      }
      .man {
        margin: 20px;
        width: 111px;
        height: 115px;
        background: url(../../images/man-bg.png) no-repeat;
        background-size: 100% 100%;
        p {
          color: #ddd;
          text-align: center;
        }
      }
      .woman {
        margin: 20px;
        width: 111px;
        height: 115px;
        background: url(../../images/woman-bg.png) no-repeat;
        background-size: 100% 100%;
        p {
          color: #ddd;
          text-align: center;
        }
      }
    }
   .rate {
      display: flex;
      justify-content: space-between;
      width: 250px;
      margin: 0px 0px -20px 105px;
      color: #fff;
      font-size: 14px;
   }
   .chart {
      height: 100px;
      width: 400px;
   }
}
</style>