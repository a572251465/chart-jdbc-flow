import { defineStore } from 'pinia'

export type IStoreFieldNeed = {
  isFullScreen: boolean
  isDbConnect: boolean
}
export type IStoreField = Partial<IStoreFieldNeed>

export const useGlobalStore = defineStore('globalStore', {
  state: () => {
    return {
      // 表示是否全屏
      isFullScreen: false,
      // 表示db 是否连接
      isDbConnect: false
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
        paths: ['isFullScreen']
      }
    ]
  }
})
