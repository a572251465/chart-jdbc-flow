import { genKey, getCurrentEditorDrag } from '@/utils'
import { IBlockItem, IInitialBlockItem, INormalFn } from '@/types'
import { defaultBlockItem } from '@/views/Drag/editor-data'

// 表示当前移动的元素
let currentMoveComponent: null | IInitialBlockItem = null
// 当前添加图表的方法
let currentAddBlockHandle: null | INormalFn = null

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
const drag = (e: DragEvent) => {
  console.log('11111')
  // 如果没有移动的组件 || 添加的事件 直接返回
  if (!currentMoveComponent || !currentAddBlockHandle) return

  // 生成新的block
  const newBlock: IBlockItem = Object.assign({}, defaultBlockItem, {
    createDomId: genKey(),
    top: e.offsetY,
    left: e.offsetX,
    type: currentMoveComponent!.type
  } as Partial<IBlockItem>)

  typeof currentAddBlockHandle === 'function' && currentAddBlockHandle(newBlock)

  // 初期化
  currentMoveComponent = null
  currentAddBlockHandle = null
}

/**
 * @author lihh
 * @description 表示drag start对应方法
 * @param e 事件对象
 */
export const dragStart = (
  e: MouseEvent,
  component: IInitialBlockItem,
  setBlockHandle: INormalFn
) => {
  const editorRef = getCurrentEditorDrag()!
  currentMoveComponent = component
  currentAddBlockHandle = setBlockHandle

  // 添加事件
  editorRef.addEventListener('dragenter', dragEnter)
  editorRef.addEventListener('dragover', dragOver)
  editorRef.addEventListener('dragleave', dragLeave)
  editorRef.addEventListener('drag', drag)
}
