import mitt from 'mitt'
import { ref } from 'vue'

export { default as bindDom } from './dom'
export { setCurrentEditorDrag, getCurrentEditorDrag } from './editor'
export { compareArray } from './tools'

// 表示计数counter
let blockCounter = 1

// 表示生成随机key 用作主键
export const genKey = () =>
  `${(Math.random() * 1000000) | 0}${+new Date()}__${blockCounter++}`

export const emitter = mitt()

// 表示设置jsonEditor 提示
export const jsonEditorTips = ref<string[]>([])
