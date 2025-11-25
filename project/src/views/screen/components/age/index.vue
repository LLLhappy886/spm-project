<template>
  <div class="age_container">
    <div class="top">
      <p class="title">年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="age" ref="agechart"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onBeforeUnmount, onMounted, ref } from 'vue'

const agechart = ref()
const myChartref = ref<any>(null)
onMounted(() => {

  const myChart = echarts.init(agechart.value)
  myChartref.value = myChart
  const data = [
    { value: 34724, name: '10岁以下', tip: '34724', percent: '16%' },
    { value: 17361, name: '11-18岁', tip: '17361', percent: '8%' },
    { value: 26043, name: '19-30岁', tip: '26043', percent: '12%' },
    { value: 53086, name: '31-40岁', tip: '53086', percent: '24%' },
    { value: 41231, name: '41-60岁', tip: '41231', percent: '19%' },
    { value: 45572, name: '60岁以上', tip: '45572', percent: '21%' },
  ];
  const option = ({
    title: {
      text: '流量分布',
      left: '135px',
      top: '130px',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        const item = data.find(item => item.value === params.value);
        if (item) {
          return `${item.name}: ${item.tip}人 (${params.percent}%)`;
        }
        return '';
      },
    },
    legend: {
      top: '50px',
      right: '65px',
      itemHeight: 20,
      orient:'vertical',
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      formatter: function (name: string) {
        let item = {
          value: 0,
          name: '',
          tip: '',
          percent: '',
        }
        item = data.find(item => item.name === name) || item;
        return item.name + ' ' + item.percent;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '70%'],
        center: ['35%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 10, // 设置边框宽度
          borderType: 'solid', // 设置边框类型为虚线
          shadowBlur: 10, // 设置阴影模糊效果
          shadowColor: 'rgba(0, 0, 0, 0.8)', // 设置阴影颜色
          shadowOffsetX: 0, // 设置阴影X轴偏移
          shadowOffsetY: 5, // 设置阴影Y轴偏移
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',
          formatter: '{@tip}',
        },
        data: data,
      },
    ],
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
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
.age_container {
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
  .age {
    height: 260px;
  }
}
</style>