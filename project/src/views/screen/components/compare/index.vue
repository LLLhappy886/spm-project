<template>
  <div class="com_container">
    <div class="top">
      <p class="title">年度游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="chart" ref="compareChart"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const compareChart = ref()
const myChartref = ref<any>(null)
onMounted(() => {
  const myChart = echarts.init(compareChart.value)
  myChartref.value = myChart
  let colorList = ['#0783FA', '#FF2E2E', '#07D1FA', '#FFD15C', '#20E6A4']
  let areaColorList = [
    { to: 'rgba(7, 131, 250, 0)', from: 'rgba(7, 131, 250, 0.2)' },
    { to: 'rgba(255, 46, 46, 0)', from: 'rgba(255, 46, 46, 0.2)' },
    { to: 'rgba(7, 209, 250, 0)', from: 'rgba(7, 209, 250, 0.2)' },
    { to: 'rgba(255, 209, 92, 0)', from: 'rgba(255, 209, 92, 0.2)' },
    { to: 'rgba(32, 230, 164, 0)', from: 'rgba(32, 230, 164, 0.2)' }
  ]
  let data = [
    {
        name: '2024',
        data: [
          { value: 280, name: '1' },
          { value: 410, name: '2' },
          { value: 470, name: '3' },
          { value: 350, name: '4' },
          { value: 360, name: '5' },
          { value: 250, name: '6' },
          { value: 210, name: '7' },
          { value: 90, name: '8' },
          { value: 150, name: '9' },
          { value: 180, name: '10' },
          { value: 120, name: '11' },
          { value: 60, name: '12' },
        ]
    },
    {
        name: '2023',
        data: [
          { value: 180, name: '1' },
          { value: 250, name: '2' },
          { value: 310, name: '3' },
          { value: 230, name: '4' },
          { value: 240, name: '5' },
          { value: 170, name: '6' },
          { value: 140, name: '7' },
          { value: 60, name: '8' },
          { value: 100, name: '9' },
          { value: 120, name: '10' },
          { value: 80, name: '11' },
          { value: 40, name: '12' },
        ]
    },
    {
        name: '2022',
        data: [
          { value: 350, name: '1' },
          { value: 410, name: '2' },
          { value: 480, name: '3' },
          { value: 330, name: '4' },
          { value: 340, name: '5' },
          { value: 270, name: '6' },
          { value: 240, name: '7' },
          { value: 160, name: '8' },
          { value: 200, name: '9' },
          { value: 220, name: '10' },
          { value: 160, name: '11' },
          { value: 100, name: '12' },
        ]
    },
    {
        name: '2021',
        data: [
          { value: 250, name: '1' },
          { value: 650, name: '2' },
          { value: 20, name: '3' },
          { value: 350, name: '4' },
          { value: 520, name: '5' },
          { value: 120, name: '6' },
          { value: 360, name: '7' },
          { value: 50, name: '8' },
          { value: 140, name: '9' },
          { value: 80, name: '10' },
          { value: 160, name: '11' },
          { value: 100, name: '12' },
        ]
    },
    {
        name: '2020',
        data: [
          { value: 380, name: '1' },
          { value: 510, name: '2' },
          { value: 570, name: '3' },
          { value: 450, name: '4' },
          { value: 460, name: '5' },
          { value: 350, name: '6' },
          { value: 310, name: '7' },
          { value: 290, name: '8' },
          { value: 350, name: '9' },
          { value: 380, name: '10' },
          { value: 320, name: '11' },
          { value: 260, name: '12' },
        ]
    }
  ]
  const option = {
    color: colorList,
    legend: {
        top: '5%',
        right: '15%',
        icon: 'circle',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 12,
        textStyle: {
          color: '#94A7BD'
        },
    },
    grid: {
      top: 50,
      right: 50,
      bottom: 30,
      left: 30,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD'//轴线和单位颜色
          }
        },
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '游客/万人次',
        nameTextStyle: {
          fontSize: 14,
          color: '#94A7BD',
          padding: [0, 0, 0, -10],
        },
        axisLine: {
          lineStyle: {
            color: '#94A7BD'//轴线和单位颜色
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#346ee0',
            type: [2, 3],
            dashOffset: 2
          }
        },
      },
    ],
    series: data.map((item,index)=>{
      return {
        name: item.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        symbolSize: 8,
        zlevel: 3,
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0,x2: 0,y2: 1,
            colorStops: [
              {
                offset: 0,
                color: areaColorList[index].from,
              },
              {
                offset: 1,
                color: areaColorList[index].to,
              },
            ],
            global: false,
          },
        },
        data: item.data.map(item => item.value),
      }
    })
  };
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
.com_container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 90% 100%;
  margin-top: 15px;
  margin-right: 50px;

  .top {
    margin-left: 10px;

    .title {
      padding-top: 10px;
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
  .chart {
    height: 280px;
    width: 100%;
  }
}
</style>