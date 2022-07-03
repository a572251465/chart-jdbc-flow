import { defineStore } from 'pinia'

export type ITableFiled = {
  fieldName: string
  fieldComment: string
}

export type ITable = {
  tableName: string
  tableComment: string
}

export type IStoreFieldNeed = {
  isDbConnect: boolean
  mysqlConfigInfo: {
    tables: ITable[]
    tableInField: Record<string, ITableFiled[]> | null
  }
}
export type IStoreField = Partial<IStoreFieldNeed>

export const useDbStore = defineStore('dbStore', {
  state: () => {
    return {
      // 表示db 是否连接
      isDbConnect: false,
      // mysql 相关的配置
      mysqlConfigInfo: {
        // 所有的表
        tables: [],
        // 表中的所有的字段
        tableInField: null
      }
    } as IStoreFieldNeed
  },

  actions: {
    /**
     * @author lihh
     * @description 更新store字段
     * @param params 可能更新的字段
     */
    editStoreField(params: IStoreField) {
      Object.keys(params).forEach((keyName) => {
        const value = params[keyName as keyof IStoreFieldNeed]
        ;(this as any)[keyName] = value
      })
    }
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['isDbConnect', 'mysqlConfigInfo']
      }
    ]
  }
})
