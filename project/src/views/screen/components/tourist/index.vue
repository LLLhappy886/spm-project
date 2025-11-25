<template>
  <div class="tou_container">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="tou_num">可预约总数<span>999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in number" :key="index">{{ item }}</span>
    </div>
    <!-- echarts图表 -->
    <div class="echarts" ref="tourist"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

const number = ref("216908人")
const tourist = ref()
const myChartref = ref<any>(null)
const timer = ref<number>()
onMounted(() => {
  // 实例化echarts
  const mycharts = echarts.init(tourist.value);
  myChartref.value = mycharts
  let angle = 0; //角度，用来做简单的动画效果的
function getCirlPoint(x0:number, y0 :number, r :number,  angle:number) {
    let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
    let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
    return {
        x: x1,
        y: y1
    };
}

function draw() {
    angle = angle + 3;
    if (mycharts) {
    mycharts.setOption(option)
    }
}
timer.value = setInterval(function() {
    draw();
}, 100);
const option = {
    series: [{
            name: "内线",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api : any) {
                return {
                    type: "arc",
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(
                            api.getWidth(),
                            api.getHeight()
                        ) / 2.3,
                        startAngle: ((0 + angle) * Math.PI) / 180,
                        endAngle: ((90 + angle) * Math.PI) / 180
                    },
                    style: {
                        stroke: '#0ff',
                        fill: "transparent",
                        lineWidth: 3.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "内线",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api: any) {
                return {
                    type: "arc",
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(
                            api.getWidth(),
                            api.getHeight()
                        ) / 2.3,
                        startAngle: ((180 + angle) * Math.PI) / 180,
                        endAngle: ((270 + angle) * Math.PI) / 180
                    },
                    style: {
                        stroke: '#0ff',
                        fill: "transparent",
                        lineWidth: 3.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "外线",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api: any) {
                return {
                    type: "arc",
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(
                            api.getWidth(),
                            api.getHeight()
                        ) / 2.1,
                        startAngle: ((270 + -angle) * Math.PI) / 180,
                        endAngle: ((40 + -angle) * Math.PI) / 180
                    },
                    style: {
                        stroke: '#0ff',
                        fill: "transparent",
                        lineWidth: 3.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "外线",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api: any) {
                return {
                    type: "arc",
                    shape: {
                        cx: api.getWidth() / 2,
                        cy: api.getHeight() / 2,
                        r: Math.min(
                            api.getWidth(),
                            api.getHeight()
                        ) / 2.1,
                        startAngle: ((90 + -angle) * Math.PI) / 180,
                        endAngle: ((220 + -angle) * Math.PI) / 180
                    },
                    style: {
                        stroke: '#0ff',
                        fill: "transparent",
                        lineWidth: 3.5
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "线头点",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api: any) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r =
                    Math.min(api.getWidth(), api.getHeight()) / 2.1;
                let point = getCirlPoint(x0, y0, r, 90 + -angle);
                return {
                    type: "circle",
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 5
                    },
                    style: {
                        stroke: '#0ff', //绿
                        fill: '#0ff'
                    },
                    silent: true
                };
            },
            data: [0]
        },
        {
            name: "线头点",
            type: "custom",
            coordinateSystem: "none",
            //@ts-ignore
            renderItem: function(params: any, api: any) {
                let x0 = api.getWidth() / 2;
                let y0 = api.getHeight() / 2;
                let r =
                    Math.min(api.getWidth(), api.getHeight()) / 2.1;
                let point = getCirlPoint(x0, y0, r, 270 + -angle);
                return {
                    type: "circle",
                    shape: {
                        cx: point.x,
                        cy: point.y,
                        r: 5
                    },
                    style: {
                        stroke: '#0ff', //绿
                        fill: '#0ff'
                    },
                    silent: true
                };
            },
            data: [0]
        }, {
            type: 'liquidFill',
            radius: '78%',
            center: ['50%', '50%'],
            color: ['#0ff', '#0ff', '#0ff'], //水波
            data: [0.5, 0.5, 0.4], // data个数代表波浪数
            label: {
            //标签设置
            position: ["50%", "50%"],
            formatter: "预估量", //显示文本
            fontSize: "20px",
            fontFamily: "PangMenZhengDao",
            fontWeight: "normal",
            color: "#fff",
            },
            backgroundStyle: {
                borderWidth: 1,
                color: 'transparent'
            },


            outline: {
                show: true,
                itemStyle: {
                    borderColor: '#0ff',
                    borderWidth: 2
                },
                borderDistance: 3
            }
        },


    ]
};

})
//组件销毁前销毁echarts实例
onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value);
  }
  if (myChartref.value) {
    myChartref.value.dispose()
    myChartref.value = null
  }
})
/* onMounted(() => {
  // 实例化echarts
  const mycharts = echarts.init(echart.value);
  // 设置实例的配置项
  mycharts.setOption ({
   series: [
      {
         type: "liquidFill", //水位图
         radius: "90%", //显示比例
         center: ["50%", "50%"], //中心点
         data: [25/100,25/100], // data个数代表波浪数
         color: ["rgba(91, 175, 255, 1)"], //波浪颜色
         backgroundStyle: {
            color: {
               type: 'radial',
               x: 0.5,
               y: 0.5,
               r: 0.5,
               colorStops: [
                  {
                        offset: 0,
                        color: 'rgba(91, 175, 255, 0)',
                  },
                  {
                        offset: 0.75,
                        color: 'rgba(91, 175, 255, 0.1)',
                  },
                  {
                        offset: 1,
                        color: 'rgba(91, 175, 255, 1)',
                  },
               ],
               globalCoord: false,
            },
         },
         label: {
            //标签设置
            position: ["50%", "50%"],
            formatter: "预估量", //显示文本
            fontSize: "20px",
            fontFamily: "PangMenZhengDao",
            fontWeight: "normal",
            color: "#fff",
         },
         outline: {
            show: true,
            borderDistance: 5,
            itemStyle: {
               borderColor: "rgba(91, 175, 255, 0.5)",
               borderWidth: 2,
            },
         },
      },
      
   ],
});
}) */
</script>

<style lang="scss" scoped>
.tou_container {
  background: url(../../images/dataScreen-main-lt.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 40px;
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
    .tou_num {
      float: right;
      color: #fff;
      font-size: 16px;
      margin-right: 10px;

      span {
        color: red;
        font-style: oblique;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 10px;
    margin-left: 5px;

    span {
      flex: 1;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      line-height: 60px;
      text-align: center;
      font-size: 30px;
      font-weight: bolder;
      color: #29fcff;
      margin: 0 5px;
    }
    
  }
  .echarts {
    width: 100%;
    height: 220px;
  }
}
</style>