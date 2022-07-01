import { bindDom } from '@/utils'
import { useGlobalStore } from '@/store/GlobalStore'

/**
 * @author lihh
 * @description 表示全局配置方法
 */

;(function useGlobal() {
  // 1. 组织全局菜单默认事件
  window.oncontextmenu = function () {
    return false
  }

  // 监听全局keyup事件 为了触发esc事件
  bindDom(window, 'keyup', (...args) => {
    const e = args[0] as KeyboardEvent
    // 判断keyCode 元素是否存在 按键esc
    if (Reflect.has(e, 'keyCode') && e.keyCode === 27) {
      const store = useGlobalStore()
      store.editStoreField({ isFullScreen: false })
    }
  })
})()
