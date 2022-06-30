import type { WritableComputedRef } from 'vue'
import { IBlockItem, IInitialBlockItem } from '@/types'
import { defaultBlockItem } from '@/views/Drag/editor-data'
import { genKey, getCurrentEditorDrag } from '@/utils'
import deepcopy from 'deepcopy'

/**
 * @author lihh
 * @description 封装编辑相关的处理
 * @param allBlockItem 表示所有的block 模块
 */
export const useEditorDrag = (
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {
  // 表示当前移动的元素
  let currentMoveComponent: null | IInitialBlockItem = null

  // 进去元素 添加一个移动的标识
  const dragEnter = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = 'move'
  }
  // 目标经过元素 必须要阻止默认行为，否则不能触发drop
  const dragOver = (e: DragEvent) => {
    e.preventDefault()
  }
  // 离开目标元素时
  const dragLeave = (e: DragEvent) => {
    e.dataTransfer!.dropEffect = 'none'
  }
  // 松手时 根据拖拽的组件 添加一个组件
  const drop = (e: DragEvent) => {
    // 如果没有移动的组件
    if (!currentMoveComponent) return

    // 生成新的block
    const newBlock: IBlockItem = Object.assign({}, deepcopy(defaultBlockItem), {
      createDomId: genKey(),
      top: e.offsetY,
      left: e.offsetX,
      type: currentMoveComponent!.type
    } as Partial<IBlockItem>)

    // 给数组中添加新的block
    allBlockItem.value = [newBlock, ...deepcopy(allBlockItem.value)]
  }

  /**
   * @author lihh
   * @description 表示drag start对应方法
   * @param e 事件对象
   */
  const dragStart = (e: MouseEvent, component: IInitialBlockItem) => {
    const editorRef = getCurrentEditorDrag()!
    currentMoveComponent = component

    // 添加事件
    editorRef.addEventListener('dragenter', dragEnter)
    editorRef.addEventListener('dragover', dragOver)
    editorRef.addEventListener('dragleave', dragLeave)
    editorRef.addEventListener('drop', drop)
  }

  /**
   * @author lihh
   * @description 事件解除绑定
   */
  const dragEnd = () => {
    const editorRef = getCurrentEditorDrag()!

    // 移除事件
    editorRef.removeEventListener('dragenter', dragEnter)
    editorRef.removeEventListener('dragover', dragOver)
    editorRef.removeEventListener('dragleave', dragLeave)
    editorRef.removeEventListener('drop', drop)

    // 初期化
    currentMoveComponent = null
  }

  return [dragStart, dragEnd]
}
