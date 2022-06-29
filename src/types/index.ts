export type INormalFn = (...args: any[]) => void

// 每个图片的类型
export type IBlockItem = {
  width: number
  height: number
  top: number
  left: number
  zIndex: number
  type: string
  createDomId: string
}

export type IInitialBlockItem = {
  type: string
  icon: any
}
