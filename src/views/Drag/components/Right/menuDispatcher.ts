import type { Ref, WritableComputedRef } from 'vue'
import { IBlockItem, IBlockMenu, INormalFn } from '@/types'
import { VuMessageBox } from 'vu-design-plus'
import { ElNotification } from 'element-plus'
import { setCopyBlock } from '@/utils/editor'

/**
 * @author lihh
 * @description 删除选中的元素
 * @param currentEditorBlock 当前编辑的block
 * @param allBlockItem 所有的block
 */
const delCurrentBlock = (
  currentEditorBlock: Ref<IBlockItem>,
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {
  const callback = () => {
    allBlockItem.value = allBlockItem.value.filter(
      (item) => item.createDomId !== currentEditorBlock.value.createDomId
    )
    ElNotification.success('删除成功')
  }

  VuMessageBox.delete('确定要删除资源吗? 删除后不可恢复!!!', {
    callback
  })
}

/**
 * @author lihh
 * @description 元素的锁定 以及解锁
 * @param currentEditorBlock 当前编辑的block
 */
const currentBlockLockOrUnlock = (currentEditorBlock: Ref<IBlockItem>) => {
  const targetLockState = currentEditorBlock.value.isLock
  currentEditorBlock.value.isLock = !targetLockState

  ElNotification.success(`${targetLockState ? '解锁成功' : '锁定成功'}`)
}

/**
 * @author lihh
 * @description 当前block 复制
 * @param currentEditorBlock 当前编辑的block
 */
const currentBlockCopy = (currentEditorBlock: Ref<IBlockItem>) => {
  setCopyBlock(currentEditorBlock.value)

  ElNotification.success('复制成功')
}

/**
 * @author lihh
 * @description 进行编辑的block 置顶
 * @param currentEditorBlock 当前编辑的block
 * @param allBlockItem 所有的block
 */
const currentBlockTopping = (
  currentEditorBlock: Ref<IBlockItem>,
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {
  // 1. 找到最大的zIndex
  const zIndexArr = allBlockItem.value.map((item) => item.zIndex)
  const max = Math.max(...zIndexArr)

  // 2. 设置当前编辑的block 最大值+1
  currentEditorBlock.value.zIndex = max + 1

  ElNotification.success('置顶成功')
}

/**
 * @author lihh
 * @description 设置编辑的block 置底
 * @param currentEditorBlock 当前编辑的block
 * @param allBlockItem 所有的block
 */
const currentBlockBottoming = (
  currentEditorBlock: Ref<IBlockItem>,
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {
  const { createDomId } = currentEditorBlock.value
  const zIndexArr = allBlockItem.value.map((item) => item.zIndex)
  const min = Math.min(...zIndexArr)

  if (min === 0) {
    currentEditorBlock.value.zIndex = min
    allBlockItem.value
      .filter((item) => item.createDomId !== createDomId)
      .forEach((item) => (item.zIndex = item.zIndex + 1))
  } else {
    currentEditorBlock.value.zIndex = min - 1
  }

  ElNotification.success('置底成功')
}

const blockMenuStrategy: Record<IBlockMenu, INormalFn> = {
  [IBlockMenu.DEL]: delCurrentBlock,
  [IBlockMenu.LOCK]: currentBlockLockOrUnlock,
  [IBlockMenu.UNLOCK]: currentBlockLockOrUnlock,
  [IBlockMenu.COPY]: currentBlockCopy,
  [IBlockMenu.TOPPING]: currentBlockTopping,
  [IBlockMenu.BOTTOMING]: currentBlockBottoming,
  [IBlockMenu.DATA]: () => ({})
}

export { blockMenuStrategy }
