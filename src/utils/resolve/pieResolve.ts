import * as echarts from 'echarts'

/**
 * @author lihh
 * @description 绘制饼状图
 * @param el 挂载的元素
 * @param options 传递的饼状图的参数
 */
export const drawPie = (el: HTMLDivElement, options: any) => {
  const myChart = echarts.init(el)
  myChart.setOption(options)
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
