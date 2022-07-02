import api from './base/request'
import { ICommonReq } from '@/types'

export type ILoginDbInfo = {
  host: string
  user: string
  password: string
  database: string
  port: number
}

/**
 * @author lihh
 * @description 进行数据库连接
 * @param dbConfigInfo 表示DB 的配置信息
 */
export const dbConnectReq = (dbConfigInfo: ILoginDbInfo) =>
  api.Post<ICommonReq<{ tableName: string }[]>>('/public/connect', dbConfigInfo)

/**
 * @author lihh
 * @description 查询表中的所有字段
 * @param table 表示表名
 */
export const tableInFieldReq = (table: string) =>
  api.Post<ICommonReq<{ fieldName: string; fieldComment: string }[]>>(
    '/public/tableAllField',
    { table }
  )

/**
 * @author lihh
 * @description 查询数据 根据表
 * @param dbConfigInfo 表示DB 的配置信息
 */
export const getDataByTableReq = (dbNeedInfo: {
  table: string
  fields: string[]
}) => api.Post<ICommonReq<any>>('/public/getDataByTable', dbNeedInfo)
