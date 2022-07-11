/**
 * @author lihh
 * @description 比较两个数组是否相同 不做深入比较
 * @param prev 上一个数组
 * @param next 下一个数组
 */
export const compareArray = (prev: any[], next: any[]): boolean => {
  if (prev.length !== next.length) return false

  let i = 0
  for (; i < prev.length; i += 1) {
    if (prev[i] !== next[i]) return false
  }
  return true
}
