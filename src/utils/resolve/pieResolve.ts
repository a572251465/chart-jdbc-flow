import * as echarts from 'echarts'
import { EChartsType } from 'echarts'
import { compareArray } from '@/utils'

// 表示上次容器的大小
let prevContainerSize = [0, 0] as [number, number]

/**
 * @author lihh
 * @description 绘制饼状图
 * @param el 挂载的元素
 * @param options 传递的饼状图的参数
 */
export const drawPie = (el: HTMLDivElement, options: any) => {
  // 容器大小
  const containerSize = [el.clientWidth, el.clientHeight] as [number, number],
    isSizeChange = compareArray(prevContainerSize, containerSize)
  if (!isSizeChange) {
    prevContainerSize = containerSize
    el.removeAttribute('_echarts_instance_')
  }

  let myChart: EChartsType | null
  const instance = echarts.getInstanceByDom(el)
  if (instance === null || instance === undefined) {
    myChart = echarts.init(el)
  }
  // 补丁措施
  // @ts-ignore
  if (instance && (myChart === undefined || myChart === null))
    myChart = instance
  // @ts-ignore
  if (myChart) myChart.setOption(options)
}

/**
 * @author lihh
 * @description 用来解析数据
 * @param data 表示待解析的数据 按指定的顺序进行传递
 * @param returnBody 待解析参数
 * @param paramKey 解析key 顺序 跟data保持一致
 */
export const resolvePieData = (
  data: string[],
  returnBody: string,
  paramKey: string[]
) => {
  const fn = new Function(...paramKey, returnBody)
  return fn(...data.map((c) => JSON.parse(c)))
}

export const pieResolve = {
  drawPie,
  resolvePieData
}
