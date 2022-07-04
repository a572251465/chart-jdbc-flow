import { ITableFiled } from '@/store/DbStore'

export type INormalFn = (...args: any[]) => void

// 表示图表 联动关联配置
export type IDbLinkageAbout = {
  table: string
  tableField: ITableFiled[]
  loopCounter: number
  loopTime: number
}

// 左侧初始化的block 类型参数
interface IInitialBaseItem {
  type: string
  data: string[]
  paramKey: string[]
  options: string
}

export interface IInitialBlockItem extends IInitialBaseItem {
  icon: any
}

// 每个图表的类型
export interface IBlockItem extends IInitialBaseItem {
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
  // 被创建图表的id
  createDomId: string
  // 是否要求居中
  alignCenter: boolean
  // 表示是否被选中
  isFocus: boolean
}

export interface ICommonReq<T> {
  code: number
  message: string
  data: T
}

export interface IDbConfigInfo {
  host: string
  user: string
  password: string
  database: string
  port: number
}
