export type INormalFn = (...args: any[]) => void

// 每个图片的类型
export type IBlockItem = {
  // 宽
  width: number
  // 高
  height: number
  // 距离上面的位置
  top: number
  // 距离左边的位置
  left: number
  // 所处的问题
  zIndex: number
  // 图表的类型
  type: string
  // 被创建图表的id
  createDomId: string
  // 是否要求居中
  alignCenter: boolean,
  // 表示是否被选中
  isFocus: boolean
}

export type IInitialBlockItem = {
  type: string
  icon: any
}
