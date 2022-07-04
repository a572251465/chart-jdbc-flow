import { drawLineComponent } from './line'
import { INormalFn } from '@/types'

// 使用策略模式 管理所有图表
const strategyChart: Record<string, INormalFn> = {
  line: drawLineComponent
}

export { strategyChart }
