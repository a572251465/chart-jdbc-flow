import { ref } from 'vue'
import { INormalFn } from '@/types'

// 表示导航列表内容
const navList = [
  {
    type: 'database',
    icon: 'icon-shujuyuan',
    tips: '配置数据源'
  },
  {
    type: 'drag',
    icon: 'icon-tuozhuai',
    tips: '拖拽图表'
  },
  {
    type: 'setting',
    icon: 'icon-shezhi',
    tips: '预设置'
  }
]
// 策略模式
const strategy: Record<string, INormalFn> = {
  database: () => configureDbHandle()
}
// 表示导航变化showFlag
const navTransformShowFlag = ref<boolean>(true)
// 表示连接db的弹框显隐
const connectDbShowFlag = ref<boolean>(false)

/**
 * @author lihh
 * @description 跳转页面配置
 * @param type 类型
 */
const skipPageHandle = (type: string, ...args: any[]) => {
  const fn = strategy[type]
  if (typeof fn !== 'function') return

  fn(...args)
}

// 配置db 信息弹框弹框
const configureDbHandle = () => (connectDbShowFlag.value = true)

export { navList, skipPageHandle, navTransformShowFlag, connectDbShowFlag }
