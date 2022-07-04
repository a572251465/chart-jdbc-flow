import { IBlockItem, INormalFn } from '@/types'
import { pieResolve } from '@/utils/resolve'
import { setupScheduler } from '@/utils'
import { schedulerTask } from '@/utils/scheduler'

const strategy: Record<string, INormalFn> = {
  pie: (el: HTMLDivElement, blockRef: IBlockItem) => {
    const { data, options, paramKey } = blockRef
    // 如果是mounted 第一次渲染
    pieResolve.drawPie(el, pieResolve.resolvePieData(data, options, paramKey))
  }
}

/**
 * @author lihh
 * @description 表示调度策略
 * @param el 渲染的元素
 * @param blockRef 以及图表的属性
 * @param options 其余的参数
 */
export const dispatcher = (
  el: HTMLDivElement,
  blockRef: IBlockItem,
  options?: { isMount: Boolean }
) => {
  const { isMount = true } = options || {}
  const fn = strategy[blockRef.type]

  setupScheduler()
  if (isMount) {
    schedulerTask({ loopCounter: 1, loopTime: 1 }, () => fn(el, blockRef))
  }
}
