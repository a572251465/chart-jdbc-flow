const strategyTips: Record<string, string[]> = {
  pie: [
    '按照图表的饼状图规定，必须存在name/ value属性',
    '请勿修改key值，以免图表出错'
  ]
}

/**
 * @author lihh
 * @description 提示hook
 * @param type 类型 例如：pie
 */
export const useTips = (type: string): [string[]] => {
  const tips = strategyTips[type] || []
  return [tips]
}
