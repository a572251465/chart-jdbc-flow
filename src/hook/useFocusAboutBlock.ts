import { computed, WritableComputedRef, ref } from 'vue'
import { IBlockItem, INormalFn } from '@/types'
import { setCopyBlock } from '@/utils/editor'

// 最后一个被选中的block
const lastSelectedBlockId = ref<string>('')

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

  // 表示选中的最后一个block
  const lastSelectedBlock = computed(() =>
    allBlockItem.value.find(
      (item) => item.createDomId === lastSelectedBlockId.value
    )
  )

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
      if (focusData.value.focusBlocks.length <= 1) {
        blockRef.isFocus = true
      } else {
        blockRef.isFocus = !blockRef.isFocus
      }
    } else {
      if (!blockRef.isFocus) {
        clearAllBlockFocusState()
        blockRef.isFocus = true
      }
    }

    // 设置最后一个选中的id
    lastSelectedBlockId.value = blockRef.isFocus ? blockRef.createDomId : ''
    callback && callback(e)
  }

  return {
    focusData,
    singleBlockClickHandle,
    clearAllBlockFocusState,
    lastSelectedBlock,
    lastSelectedBlockId
  }
}
