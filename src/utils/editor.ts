// 表示当前画布dom
import { IBlockItem } from '@/types'

let editorDragDom: null | HTMLDivElement = null
// 表示复制待完成的组件
let copyToBeCompletedBlockInfo: Record<string, any> = {
  block: null
}

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
 * @description 获取复制 block
 */
export const getCopyBlock = () => copyToBeCompletedBlockInfo
