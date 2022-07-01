/**
 * @author lihh
 * @description 表示全局配置方法
 */
;(function useGlobal() {
  // 1. 组织全局菜单默认事件
  window.oncontextmenu = function () {
    return false
  }
})()
