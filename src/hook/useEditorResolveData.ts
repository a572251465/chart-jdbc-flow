import { IComponentBlockType } from '@/types'
import { allJsonParse } from '@/utils'

/**
 * @author lihh
 * @description 解析bar data
 * @param data 传递的数据
 */
const resolveBarData = (data: string[]) => {
  let [title, horizontal, vertical] = allJsonParse(data)
  const restConstruction = { title, horizontal, vertical }
  return JSON.stringify(restConstruction)
}

/**
 * @author lihh
 * @description 解析编辑器要展示的数据
 * @param data 解析的data
 * @param type 图表类型
 */
export const useEditorResolveData = (
  data: string[],
  type: IComponentBlockType
) => {
  switch (type) {
    case IComponentBlockType.PIE:
      return data[2]
      break
    case IComponentBlockType.BAR:
      return resolveBarData(data)
    default:
      return ''
  }
}
