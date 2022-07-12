import { IComponentBlockType } from '@/types'

const strategyTips: Record<IComponentBlockType, string[]> = {
  [IComponentBlockType.PIE]: [
    '按照图表的饼状图规定，必须存在name/ value属性',
    '请勿修改key值，以免图表出错'
  ],
  [IComponentBlockType.BAR]: [
    '按照图表的数据结构规定, 对象属性title/ horizontal/ vertical不可修改, 否则筛选数据无效'
  ]
}

/**
 * @author lihh
 * @description 提示hook
 * @param type 类型 例如：pie
 */
export const useTips = (type: IComponentBlockType): [string[]] => {
  const tips = strategyTips[type] || []
  return [tips]
}
