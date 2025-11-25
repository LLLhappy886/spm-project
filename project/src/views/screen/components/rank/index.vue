<template>
  <div class="rank_container">
    <div class="top">
      <p class="title">热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="rank_title">
      <p>排名</p>
      <p>景区</p>
      <p class="last">预约数量</p>
    </div>
    <div class="rank_main">
      <div class="rank_index">
        <div class="rank-list">
          <div class="rank-item">
            <div class="rank-tag-container">
              <div class="rank-tag no1">
                <span class="rank-text">NO.1</span>
              </div>
            </div>
          </div>
          <div class="rank-item">
            <div class="rank-tag-container">
              <div class="rank-tag no2">
                <span class="rank-text">NO.2</span>
              </div>
            </div>
          </div>
          <div class="rank-item">
            <div class="rank-tag-container">
              <div class="rank-tag no3">
                <span class="rank-text">NO.3</span>
              </div>
            </div>
          </div>
          <div class="rank-item">
            <div class="rank-tag-container">
              <div class="rank-tag no4">
                <span class="rank-text">NO.4</span>
              </div>
            </div>
          </div>
          <div class="rank-item">
            <div class="rank-tag-container">
              <div class="rank-tag no5">
                <span class="rank-text">NO.5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- echarts图表 -->
    <div class="echarts" ref="rankChart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const rankChart = ref()
const myChartref = ref<any>(null)
onMounted(() => {
  const myChart = echarts.init(rankChart.value)
  myChartref.value = myChart
  let val = {
   a01_count: 4.23,
   a02_count: 5.66,
   a03_count: 6.54,
   a04_count: 8.12,
   a05_count: 8.83,
   b01_count: 7,
   b02_count: 2,
   b03_count: 4,
  }
  const option = {

   grid: {
      containLabel: true,
      top: 0,
      right: 20,
      bottom: 40,
      left: 30,
   },
   legend: {
      icon: 'rect',
      right: "center",
      itemWidth: 17,
      itemHeight: 10,
      textStyle: {
         color: '#555'
      },
   },
   tooltip: {
      trigger: "axis",
      formatter: "{b}:{c}w",
      axisPointer: {
         type: 'shadow'
      },
      
   },
   xAxis: {
      show: false,
      type: 'value',
   },
   yAxis: {
      type: "category",
       splitLine: {
        show: false,
        Interval: 2,
        lineStyle: {
          color: "rgba(30, 78, 123, 0.5)", //网格线的颜色
          width: 1, //X轴的粗细
          // type: "dashed", //虚线
        },
      },
      axisTick: {
        show: false,
      },

      axisLine: {
        show: false,
        width: 2, //X轴的粗细
        lineStyle: { color: "rgba(30, 78, 123, 1)" },
      },

      axisLabel: {
        show: true,
        color: "#fff", //更改坐标轴文字颜色
        fontSize: 14, //更改坐标轴文字大小
        margin: 20,
      },
      data: ['张家界','黄山','九寨沟', '长白山', '故宫', ],
   },
   series: [{
      type: "bar",
      barWidth: 30,
      showBackground: true,
      backgroundStyle: {
         color: "transparent"
      },

      label: {
         show: true,
         position: 'right',
         fontSize: 14,
         distance: 0, // 距离
         color: "#fff",
         formatter: "{c}w",
      }, // 柱子上方的数值
      data: [{
         value: val.a01_count,
         itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: '#48E6D1',
              },
              {
                  offset: 1,
                  color: 'rgb(73, 181, 234,0)',
              },
            ]),
         },
      },
      {
         value: val.a02_count,
         itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: '#B37EF3',
              },
              {
                  offset: 1,
                  color: 'rgb(78, 211, 163,0)',
              },
            ]),
         },
      },
      {
         value: val.a03_count,
         itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: '#FFC85E',
              },
              {
                  offset: 1,
                  color: 'rgb(233, 164, 61,0)',
              },
            ]),
         },
      },
      {
         value: val.a04_count,
         itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: '#FFB822',
              },
              {
                  offset: 1,
                  color: 'rgb(255, 54, 54,0)',
              },
            ]),
         },
      },
      {
         value: val.a05_count,
         itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                  offset: 0,
                  color: 'rgb(255, 54, 54)',
              },
              {
                  offset: 1,
                  color: 'rgb(255, 54, 54,0)',
              },
            ]),
         },
      },

      ]
   }]
}
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
.rank_container {
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 40px;
  margin-right: 50px;

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
  .rank_title {
    width: 100%;
    height: 40px;
    margin-top: 30px;
    margin-left: 20px;
    background: url(../../images/rankingChart-bg.png) no-repeat;
    background-size: 90% 100%;
    display: flex;
    p {
      font-size: 18px;
      line-height: 40px;
      font-weight: 400;
      color: rgb(230, 172, 63);
      margin-left: 30px;
    }
    .last {
      margin-left: 100px;
    }
  }
  .rank_main {
    width: 100%;
    height: 240px;
    display: flex;
    .rank_index {
      width: 80px;
      height: 220px;
      /* 排名列表容器 */
    .rank-list {
      margin-left: 20px;
      padding-left: 10px;
      width: 80px;
    }

    /* 每一项排名 */
    .rank-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      position: relative;
    }

    /* 梯形排名标签容器 */
    .rank-tag-container {
      position: relative;
      width: 80px;
      height: 36px;
      margin-right: 15px;
      z-index: 1;
    }

    /* 梯形排名标签样式 */
    .rank-tag {
      position: relative;
      width: 100%;
      height: 100%;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      /* 梯形效果通过边框实现 */
      border-style: solid;
      border-width: 18px 12px;
      line-height: 0;
    }

    /* 不同排名的渐变背景 */
    .rank-tag.no1 {
      border-color: transparent #FF5E3A #FF3D3D transparent;
    }
    .rank-tag.no2 {
      border-color: transparent #FFC85E #FFB447 transparent;
    }
    .rank-tag.no3 {
      border-color: transparent #FFB822 #FFD25A transparent;
    }
    .rank-tag.no4 {
      border-color: transparent #B37EF3 #9D5BE6 transparent;
    }
    .rank-tag.no5 {
      border-color: transparent #48E6D1 #36C9C6 transparent;
    }

    /* 标签文字容器（修正梯形内文字位置） */
    .rank-text {
      position: relative;
      z-index: 3;
      transform: translateX(4px); /* 微调文字位置 */
    }

    /* 虚化小角效果 */
    .rank-tag::before,
    .rank-tag::after {
      content: "";
      position: absolute;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      filter: blur(4px); /* 虚化效果 */
      z-index: 1;
    }

    /* 左上角虚化角 */
    .rank-tag::before {
      top: -8px;
      right: -8px;
      opacity: 0.6;
    }

    /* 右下角虚化角 */
    .rank-tag::after {
      bottom: -8px;
      left: -8px;
      opacity: 0.4;
    }

    /* 不同排名的虚化角颜色 */
    .rank-tag.no1::before, .rank-tag.no1::after { background-color: #FF5E3A; }
    .rank-tag.no2::before, .rank-tag.no2::after { background-color: #FFB822; }
    .rank-tag.no3::before, .rank-tag.no3::after { background-color: #FFC85E;}
    .rank-tag.no4::before, .rank-tag.no4::after { background-color: #B37EF3; }
    .rank-tag.no5::before, .rank-tag.no5::after { background-color: #48E6D1; }

    /* 光效动画 */
    .rank-tag-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: -30%;
      width: 40%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transform: skewX(-20deg);
      animation: shine 2s infinite;
      z-index: 1;
    }

    @keyframes shine {
      0% {
        left: -50%;
        opacity: 0;
      }
      50% {
        opacity: 0.4;
      }
      100% {
        left: 150%;
        opacity: 0;
      }
    }
    }
    .echarts {
      width: 330px;
      height: 300px;
    }
  }
}
</style>