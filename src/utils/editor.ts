// 表示当前画布dom
import { IBlockItem, IComponentBlockType } from '@/types'
import { ref } from 'vue'

let editorDragDom: null | HTMLDivElement = null
// 表示复制待完成的组件
let copyToBeCompletedBlockInfo: {
  block: IBlockItem | null
  x: number
  y: number
} = {
  block: null,
  x: 0,
  y: 0
}
// 表示编辑的当前组件的类型
let currentEditorComponentType = ref<IComponentBlockType>(
  IComponentBlockType.PIE
)
// 表示当前选择的组件
let currentSelectedBlock: IBlockItem | null = null

/**
 * @author lihh
 * @description 设置当前使用的画布
 * @param el 元素
 */
export const setCurrentEditorDrag = (el: HTMLDivElement) => {
  editorDragDom = el
}

/**
 * @author lihh
 * @description 获取当前使用的画布
 */
export const getCurrentEditorDrag = () => editorDragDom

/**
 * @author lihh
 * @description 设置copy 的block
 * @param block 设置元素
 */
export const setCopyBlock = (block: IBlockItem) => {
  copyToBeCompletedBlockInfo.block = block
}
/**
 * @author lihh
 * @description 设置待copy block 位置
 * @param x x轴位置
 * @param y y轴位置
 */
export const setCopyBlockPos = (x: number, y: number) => {
  copyToBeCompletedBlockInfo.x = x
  copyToBeCompletedBlockInfo.y = y
}

/**
 * @author lihh
 * @description 获取复制 block
 */
export const getCopyBlock = () => copyToBeCompletedBlockInfo

/**
 * @author lihh
 * @description 设置当前组件的类型
 * @param type 类型
 */
export const setCurrentComponentType = (type: IComponentBlockType) =>
  (currentEditorComponentType.value = type)

/**
 * @author lihh
 * @description 获取当前组件类型
 */
export const getCurrentComponentType = () => currentEditorComponentType

/**
 * @author lihh
 * @description 设置选择或是获取的block
 */
export const setSelectedBlock = (block: IBlockItem) => {
  currentSelectedBlock = block
}
export const getSelectedBlock = () => currentSelectedBlock!
