import { isProxy, toRaw } from 'vue'

/**
 * @author lihh
 * @description 判断是否是数组
 * @param value 判断的值
 */
export const isArray = (value: unknown) => Array.isArray(value)

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
    let prevValue = prev[i],
      nextValue = next[i]

    if (isProxy(prevValue)) prevValue = toRaw(prevValue)
    if (isProxy(nextValue)) nextValue = toRaw(nextValue)

    if (isArray(prevValue) && isArray(nextValue)) {
      const res = compareArray(prevValue, nextValue)
      if (!res) return false
      continue
    }
    if (prevValue !== nextValue) return false
  }
  return true
}
