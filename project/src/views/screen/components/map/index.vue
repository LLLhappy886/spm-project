<template>
  <div class="map_container">
    <div class="warn">
    <span>平台高峰预警信息(2条)</span>
    <div class="bg"></div>
    </div>
    <div class="title">
      <p>景区实时客流量</p>
    </div>
    <div class="map" ref="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import chinaJson from './china.json'
//注册地图
echarts.registerMap('china', chinaJson as any)
const map = ref()
const myChartref = ref<any>(null)
onMounted(() => {
  const mychart = echarts.init(map.value)
  myChartref.value = mychart
  const option = ({
    geo: {
      map: 'china',
      roam: true,
      //位置
      left: 100,
      top: 40,
      right: 100,
      label: {
        show: true,
        color: '#fff',
      },
      itemStyle: {
        borderColor: "#04BEF4",
        borderWidth: 1,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#05347e'
            },
            {
              offset: 1,
              color: '#072144'
            }
          ],
          global: false
        }
      },
      //高亮效果
      emphasis: {
        itemStyle: {
          areaColor: '#29fcff'
        },
        label: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#fff',
        },
      },
    
    },
    series: [
      {
        type:'lines',
        data:[
          {
            coords: [
              [116.405285,39.904989],
              [113.280637,23.125178],
            ],
            name: '北京-广东',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
            
          },
          {
            coords: [
              [113.280637,23.125178],
              [116.405285,39.904989],

            ],
            name: '广东-北京',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
            
          },
          {
            coords: [
              [116.405285,39.904989],
              [104.065735,30.659462],

            ],
            name: '北京-四川',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
            
          },
          {
            coords: [
              [104.065735,30.659462],
              [116.405285,39.904989],

            ],
            name: '四川-北京',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
          },
          {
            coords: [
              [104.065735,30.659462],
              [87.617733,43.792818],

            ],
            name: '四川-新疆',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
          },
          {
            coords: [
              [87.617733,43.792818],
              [104.065735,30.659462],

            ],
            name: '新疆-四川',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
          },
          {
            coords: [
              [116.405285,39.904989],
              [121.472644,31.231706],

            ],
            name: '北京-上海',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
          },
          {
            coords: [
              [121.472644,31.231706],
              [116.405285,39.904989],

            ],
            name: '上海-北京',
            lineStyle: {
              type: 'dashed',
              width: 1,
              curveness: 0.2,
              color: '#fff',
              opacity: 0.8,
            },
          },
        ],
        effect: {
          show: true,
          color: '#fff',
          symbolSize: 15,
          symbol: 'path://M833.873721 546.991182l-257.715696-147.369313a12.777425 12.777425 0 0 1-6.456438-11.829276l6.998237-126.419753a60.591182 60.591182 0 0 0-16.299119-45.556262 59.868783 59.868783 0 0 0-44.111463-18.601763h-8.668783c-17.066667 0-32.733686 6.637037-44.201764 18.692063-11.422928 12.100176-17.156966 28.218695-16.208818 45.330512l6.998236 126.555203a12.506526 12.506526 0 0 1-6.411288 11.784127l-257.760846 147.369312a18.014815 18.014815 0 0 0-9.075132 15.712169v53.863845a18.014815 18.014815 0 0 0 23.748853 17.156966l247.015168-81.63104a13.093474 13.093474 0 0 1 6.591887 2.122046 13.093474 13.093474 0 0 1 5.734039 9.752381l9.120282 148.18201a12.461376 12.461376 0 0 1-7.494886 12.280776l-77.838447 36.571429a18.059965 18.059965 0 0 0-10.38448 16.344268v23.703704c0 5.463139 2.483245 10.655379 6.772487 14.131922a18.330864 18.330864 0 0 0 15.21552 3.521693l111.700882-24.426102 113.461728 24.561552a17.924515 17.924515 0 0 0 15.17037-3.566843 17.924515 17.924515 0 0 0 6.727337-14.086773v-23.839153a18.059965 18.059965 0 0 0-10.384479-16.344268l-77.928748-36.481129a12.732275 12.732275 0 0 1-7.404586-12.506526l9.120282-148.00141a12.822575 12.822575 0 0 1 5.688889-9.662082c1.264198-0.902998 3.521693-1.851146 11.152029-1.489947l242.409876 80.863492a18.105115 18.105115 0 0 0 23.794004-17.156966v-53.818695a17.969665 17.969665 0 0 0-9.075133-15.712169z',
          trailLength: 0,
        },
      }
    ],
  });
  if (mychart) {
    mychart.setOption(option)
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
.map_container {
  width: 100%;
  height: 100%;

  .warn {
    
    span {
      position: absolute;
      top: 90px;
      left: 46%;
      font-size: 16px;
      color: #ddd;
    }
    .bg {
      width: 468px;
      height: 40px;
      background: url(../../images/dataScreen-header-warn-bg.png) no-repeat;
      background-size: 100% 100%;
      position: relative;
      left: 250px;
      top: 38px;
    }
  }
  .title {
    position: relative;
    top: 80px;
    left: 40px;
    width: 500px;
    height: 50px;
    background: url(../../images/map-title-bg.png) no-repeat;
    background-size: 60% 70%;
    p {
      color: #fff;
      margin-left: 28px;
      line-height: 35px;
    }
  }
  .map {
    height: 700px;
  }
}
</style>