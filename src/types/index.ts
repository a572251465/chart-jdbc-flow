export type INormalFn = <T = any>(...args: T[]) => void

// 每个图片的类型
export type IBlockItem = {
  width: string
  height: string
  top: string
  left: string
  zIndex: number
  type: string
  createDomId: string
}
