<template>
  <div class="line-container">
    <div class="top">
      <p class="title">未来30天游客量趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="line" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const line = ref()
const myChartref = ref<any>(null)
onMounted(() => {
  const myChart = echarts.init(line.value)
  myChartref.value = myChart
  const dataX = ['08/08', '08/09', '08/10', '08/11', '08/12', '08/13', '08/14', '08/15', '08/16', '08/17', '08/18', '08/19', '08/20', '08/21', '08/22', '08/23', '08/24', '08/25', '08/26', '08/27', '08/28', '08/29', '08/30', '08/31', '09/01', '09/02', '09/03', '09/04', '09/05', '09/06', '09/07', '09/08', ];
  const data = [8432, 15043, 14323, 13893, 11401, 10234, 8899, 12000, 16037, 18653, 19234, 6089, 7653, 4561, 15432, 14999, 12456, 16799, 14543, 12949, 9549, 6600, 6600, 5211, 15999, 16999, 17999, 2999, 1999, 1999, 1643];
  const option = {
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(33,56,77,1)',
        borderColor: 'rgba(33,56,77,1)',
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        axisPointer: {
          lineStyle: {
              color: 'rgba(19,255,241,1)',
              type: 'dashed',
              width: 2
          }
        }
    },
    legend: {
        right: 'center',
        top: '5%',
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 25,
        icon: 'stack',
        textStyle: {
          color: '#E1E5E6'
        }
    },
    grid: {
        top: '26%',
        right: '4%',
        bottom: '4%',
        left: '6%',
        containLabel: true
    },
    xAxis: {
        data: dataX,
        type: 'category',
        boundaryGap: true,
        axisLabel: {
          color: '#B5C5D4',
          fontSize: 12
        },
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: [0, 10],
          lineStyle: {
            color: 'rgba(55,255,191,0.2)',
          },
        },
        axisTick: {
          show: false // 去除刻度线
        }
    },
    yAxis: {
        type: 'value',
        name: '访问量(人次)',
        nameLocation: 'end',
        nameRotate: 0,
        nameTextStyle: {
          color: '#ddd',
          lineHeight: -10,
          verticalAlign: 'top',
          fontSize: 12,
        },
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(55,255,191,0.2)',
          },
        },
        axisLabel: {
          color: '#B5C5D4',
          fontSize: 12
        },
        splitLine: {
          show: false,
        }
    },
    series: [
        {
          name: '预计访问量',
          smooth: true,
          type: 'line',
          // 填充颜色设置
          areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                    {
                      offset: 0,
                      color: 'rgba(253, 190, 93,.4)' // 渐变色的起始颜色
                    },
                    {
                      offset: 0.9,
                      color: 'rgba(253, 190, 93,0)' // 渐变线的结束颜色
                    }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)'
          },
          // 开始不显示拐点， 鼠标经过显示
          showSymbol: false,
          symbolSize: 8,
          // 设置拐点颜色以及边框
          itemStyle: {
              color: 'rgba(253, 190, 93, 1)'
          },
          data: data
        },
    ]
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
.line-container {
  height: 100%;
  width: 90%;
  margin: 0 auto;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

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
  .line {
    height: 220px;
  }
}
</style>