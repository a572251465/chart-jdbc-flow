import type { Ref } from 'vue'
import * as echarts from 'echarts'
import { IBaseChartsData } from '@/types'

/**
 * @author lihh
 * @description 绘制折线图组件
 * @param el 绘制节点
 * @param options 一些参数
 * @param code 图表options TODO 暂时无用
 */
export const drawLineComponent = <T>(
  el: Ref<HTMLDivElement | null>,
  data: IBaseChartsData<string, number>,
  code: T
) => {
  const option = {
    xAxis: {
      type: 'category',
      data: data.x
    },
    yAxis: {
      type: 'value'
    },
    grid: {
      bottom: '20px',
      top: '20px'
    },
    series: [
      {
        data: data.y,
        type: 'line'
      }
    ]
  }

  const myChart = echarts.init(el.value!, 'dark')
  myChart.setOption(option)
}
