// 表示当前画布dom
let editorDragDom: null | HTMLDivElement = null

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
