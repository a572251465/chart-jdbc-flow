import { computed, WritableComputedRef } from 'vue'
import { IBlockItem, INormalFn } from '@/types'

/**
 * @author lihh
 * @description 设置模块选中 以及未选中状态
 * @param allBlockItem 表示所有的模块
 */
export const useFocusAboutBlock = (
  allBlockItem: WritableComputedRef<IBlockItem[]>,
  callback: INormalFn
) => {
  const focusData = computed(() => {
    const focusBlocks = [] as IBlockItem[]
    const unFocusBlocks = [] as IBlockItem[]

    allBlockItem.value.forEach((item) => {
      ;(item.isFocus ? focusBlocks : unFocusBlocks).push(item)
    })
    return {
      focusBlocks,
      unFocusBlocks
    }
  })

  /**
   * @author lihh
   * @description 清除所有光标选中状态
   */
  const clearAllBlockFocusState = (...args: any[]) => {
    // 通过手动筛选 设置默认事件
    if (args.length > 0) {
      const e = args[0] as PointerEvent
      if (e && typeof e === 'object' && Reflect.has(e, 'path')) {
        const paths = (
          Array.isArray((e as any).path) ? (e as any).path : []
        ) as HTMLDivElement[]
        for (let i = 0; i < paths.length; i++)
          if ((paths[i].className || '').includes('editor-single-block-item'))
            return
      }
    }
    allBlockItem.value?.forEach((item) => {
      item.isFocus = false
    })
  }

  /**
   * @author lihh
   * @description 单个图表点击事件
   * @param e 鼠标事件对象
   * @param blockRef 图表ref 数据
   */
  const singleBlockClickHandle = (e: MouseEvent, blockRef: IBlockItem) => {
    const isShiftKeySelected = e.shiftKey

    // judge whether shift key is selected
    if (isShiftKeySelected) {
      blockRef.isFocus = !blockRef.isFocus
    } else {
      if (blockRef.isFocus) {
        blockRef.isFocus = false
      } else {
        clearAllBlockFocusState()
        blockRef.isFocus = true
      }
    }

    callback && callback(e)
  }

  return { focusData, singleBlockClickHandle, clearAllBlockFocusState }
}
