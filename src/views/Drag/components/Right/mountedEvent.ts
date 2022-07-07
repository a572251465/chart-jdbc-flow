import { IBlockItem, INormalFn } from '@/types'
import { ComputedRef, WritableComputedRef } from 'vue'
import { useBlockData } from '@/hook/useBlockData'
import { bindDom, emitter } from '@/utils'
import { setCopyBlock } from '@/utils/editor'

/**
 * @author lihh
 * @description 通过编辑器修改代码内容后 调度判断
 * @param allBlock
 */
const blockDataDispatcherJudge =
  (allBlock: WritableComputedRef<IBlockItem[]>) =>
  (params: [string, string]) => {
    useBlockData(allBlock.value, params[1], params[0])
  }

/**
 * @author lihh
 * @description 将mount事件内容 转移到此处
 * @param unBindDom 收集待取消的事件
 * @param allBlockItem 所有的block
 * @param mouseDownClearComputedState 鼠标按下 清除状态
 * @param clearAllBlockFocusState 清除block focus状态
 * @param lastSelectedBlock 最后一个选中的block
 */
export const mountedEvent = (
  unBindDom: INormalFn[],
  allBlockItem: WritableComputedRef<IBlockItem[]>,
  mouseDownClearComputedState: INormalFn,
  clearAllBlockFocusState: INormalFn,
  lastSelectedBlock: ComputedRef<IBlockItem | undefined>
) => {
  // bind window mousedown event，when clicking body, cancel all block focus state
  const unBDom = bindDom(window, 'mousedown', (...args) => {
    mouseDownClearComputedState()
    clearAllBlockFocusState(...args)
  })!

  // 用户编辑 block的data 触发此方法
  emitter.on<string>(
    'block-data-editor',
    // @ts-ignore
    blockDataDispatcherJudge(allBlockItem)
  )

  // 监听用户的keydown事件
  const unBDom1 = bindDom(window, 'keydown', (...args) => {
    const e = args[0] as any as KeyboardEvent
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86)) {
      // 判断是否是点击 复制键
      if (e.keyCode === 67 && lastSelectedBlock.value) {
        setCopyBlock(lastSelectedBlock.value)
      }
    }
  })!
  unBindDom.push(unBDom, unBDom1)
}
