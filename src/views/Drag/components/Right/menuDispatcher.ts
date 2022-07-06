import type { Ref, WritableComputedRef } from 'vue'
import { IBlockItem, IBlockMenu, INormalFn } from '@/types'
import { VuMessageBox } from 'vu-design-plus'
import { ElNotification } from 'element-plus'

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
const currentBlockLockOrUnlock = (currentEditorBlock: Ref<IBlockItem>) => {}

/**
 * @author lihh
 * @description 当前block 复制
 * @param currentEditorBlock 当前编辑的block
 */
const currentBlockCopy = (currentEditorBlock: Ref<IBlockItem>) => {}

/**
 * @author lihh
 * @description 进行编辑的block 置顶
 * @param currentEditorBlock 当前编辑的block
 * @param allBlockItem 所有的block
 */
const currentBlockTopping = (
  currentEditorBlock: Ref<IBlockItem>,
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {}

/**
 * @author lihh
 * @description 设置编辑的block 置底
 * @param currentEditorBlock 当前编辑的block
 * @param allBlockItem 所有的block
 */
const currentBlockBottoming = (
  currentEditorBlock: Ref<IBlockItem>,
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {}

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
