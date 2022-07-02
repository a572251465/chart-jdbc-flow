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
  }
}
export type IStoreField = Partial<IStoreFieldNeed>

export const useDbStore = defineStore('dbStore', {
  state: () => {
    return {
      // 表示db 是否连接
      isDbConnect: false,
      mysqlConfigInfo: {
        tables: []
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
