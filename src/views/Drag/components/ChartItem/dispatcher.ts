import { IBlockItem, IComponentBlockType, INormalFn } from '@/types'
import { pieResolve, barResolve } from '@/utils/resolve'
import { useScheduler } from '@/hook/useScheduler'

const [addSchedulerTask] = useScheduler()
const strategy: Record<IComponentBlockType, INormalFn> = {
  [IComponentBlockType.PIE]: (el: HTMLDivElement, blockRef: IBlockItem) => {
    const { data, options, paramKey } = blockRef
    // 如果是mounted 第一次渲染
    pieResolve.drawPie(el, pieResolve.resolvePieData(data, options, paramKey))
  },
  [IComponentBlockType.BAR]: (el: HTMLDivElement, blockRef: IBlockItem) => {
    const { data, options, paramKey } = blockRef
    barResolve.drawBar(el, barResolve.resolveBarData(data, options, paramKey))
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

  if (isMount) {
    addSchedulerTask({ loopCounter: 1, loopTime: 1 }, () => fn(el, blockRef))
  }
}
