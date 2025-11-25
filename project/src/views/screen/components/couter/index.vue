<template>
  <div class="cou_container">
    <div class="top">
      <p class="title">预约渠道数据统计</p>
      <p class="bg"></p>
    </div>
    <div class="chart" ref="couterChart">
    </div>
    <SvgIcon name="pie" height="70" width="70" class="icon"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const couterChart = ref()
const myChartref = ref<any>(null)
//动画帧id
let animationFrameId: number
onMounted(() => {
  const myChart = echarts.init(couterChart.value)
  myChartref.value = myChart
let peopleList = [
   { name: '智慧文创平台', value: 332, percent: 0 },
   { name: '电话热线', value: 112, percent: 0 },
   { name: '微信小程序', value: 125, percent: 0 },
   { name: '去哪游官网', value: 254, percent: 0 },
]
let total = peopleList.reduce((pre, next) => {
   return pre + next.value;
}, 0);

let numberWidth = String(total).length * 8 + 8;

peopleList.forEach((item) => {
  //@ts-ignore
   item.percent = total == 0 ? 0 : ((item.value / total) * 100).toFixed(2);
});

let color = ['rgba(113, 226, 135, 1)', 'rgba(119, 247, 253, 1)', 'rgba(44, 104, 231, 1)', 'rgba(93, 202, 250, 1)']

const option = {
   color: color,
   tooltip: {
      trigger: 'item',
   },
   legend: {
      show: true,
      orient: 'vertical',
      top: 'center',
      right: '53%',
      icon: 'rect',
      itemGap: 20,
      itemWidth: 10,
      itemHeight: 10,
      color: '#fff',
      formatter: function (name : any) {
         let items = peopleList.find((item) => item.name == name);
         return `{name|${name}}\n{number| ${items?.value || ''}} {unit|万人}            {percent|${items?.percent + '%' || ''
            }}`;
      },
      itemStyle: {
         borderWidth: 1,
      },
      textStyle: {
         rich: {
            number: {
               width: numberWidth,
               color: '#DDF6FD',
               align: 'left',
               fontSize: 16,
               fontWeight: 'bold',
               padding: [8, 0, 0, 0]
            },
            name: {
               color: 'rgba(255,255,255,0.8)',
               fontSize: 14,
               fontWeight: 400,
               fontFamily: 'Source Han Sans CN',
               padding: [28, 0, 0, 4]
            },
            unit: {
               color: 'rgba(255,255,255,0.8)',
               fontSize: 12,
               fontWeight: 400,
               fontFamily: 'Source Han Sans CN',
               padding: [0, 0, -8, 0]
            },
            percent: {
               color: '#DDF6FD',
               align: 'left',
               fontSize: 16,
               fontWeight: 'bold',
               padding: [6, 0, 0, 0]
            },
         },
      },
   },

   series: [
      {
         type: 'pie',
         radius: ['50%', '60%'],
         center: ['73%', '50%'],
         padAngle: 5,
         label: {
            show: false,
         },
         itemStyle: {
            shadowColor: 'rgba(255, 255, 255, 0.5)',
            shadowBlur: 20,
            borderWidth: 5,
            borderRadius: 5,

         },
         emphasis: {
            scale: false
         },
         data: peopleList,
      },
      {
         type: 'pie',
         radius: ['40%', '50%'],
         center: ['73%', '50%'],
         padAngle: 5,
         label: {
            show: false,
         },
         itemStyle: {
            shadowColor: 'rgba(255, 255, 255, 0.5)',
            shadowBlur: 20,
            borderWidth: 5,
            opacity: 0.3,
         },
         emphasis: {
            scale: false
         },
         data: peopleList,
      },
      

      {
         name: "黄线",
         type: "pie",
         startAngle: 85,
         radius: ['35%', '38%'],
         center: ['73%', '50%'],
         emphasis: {
            scale: false,
         },
         padAngle: 5,
         tooltip: {
            // show: false,
         },
         itemStyle: {
            borderCap: 'round',
            color: function (data : any) {
               let tempColor = data.data == 10 ? "rgba(240, 197, 67, 0)" : "rgba(240, 197, 67, 1)"
               return tempColor
            },
         },
         zlevel: 4,
         labelLine: {
            show: false,
         },
         data: [100, 100, 100, 100],
      },

   ],
}
let rotate = 0
let deg = 50

run()

function run() {
   animationFrameId = requestAnimationFrame(run);
   option.series[1].radius[1] = `${deg}%`
   option.series[2].startAngle = rotate
   // 3. 调用前先判断实例是否存在（避免操作已销毁的实例）
  if (myChart && !myChart.isDisposed()) { // 注意：ECharts实例有isDisposed()方法可判断是否已销毁
    myChart.setOption(option);
    myChart.resize();
  }
   rotate += 1
   if (deg > 80) {
      deg = 50
   }
   deg += 0.1
}

})
onBeforeUnmount(() => {
   if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
   }
  if (myChartref.value) {
    myChartref.value.dispose()
    myChartref.value = null
  }
})
</script>

<style lang="scss" scoped>
.cou_container {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 90% 100%;
  margin-top: 15px;
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
  .chart {
    width: 90%;
    height: 280px;
  }
  .icon {
   position: relative;
   bottom: 178px;
   left: 283px;
  }
}
</style>