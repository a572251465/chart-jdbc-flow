import { ITableFiled } from '@/store/DbStore'
import { getDataByTableReq } from '@/api'

/**
 * @author lihh
 * @description 折线图的基本请求
 * @param table 表名
 * @param tableInField 表字段
 */
export const lineBaseInfoReq = async (
  table: string,
  tableInField: ITableFiled[]
) => {
  // 进行表字段数据拆分
  const fields = tableInField.map((item) => item.fieldName)

  // 查询所有的数据
  const res = await getDataByTableReq({ table, fields })
  if (res.code !== 200) {
    console.error(res.message)
    return
  }

  const data = res.data as Record<any, any>[]
  // @ts-ignore
  const result = []
  fields.forEach((keyName) => {
    result.push(data.map((item) => item[keyName]))
  })

  return {
    // @ts-ignore
    x: result[1] as number[],
    // @ts-ignore
    y: result[0] as string[]
  }
}
