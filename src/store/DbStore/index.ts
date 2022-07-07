import { defineStore } from 'pinia'
import { IDataSourceTarget } from '@/types'

export type IStoreFieldNeed = {
  dataSources: Record<IDataSourceTarget, { name: string }>
}
export type IStoreField = Partial<IStoreFieldNeed>

export const useDbStore = defineStore('dbStore', {
  state: () => {
    return {
      dataSources: {}
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
        paths: ['dataSources']
      }
    ]
  }
})
