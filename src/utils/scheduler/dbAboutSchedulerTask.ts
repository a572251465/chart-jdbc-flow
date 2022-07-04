import { IDbLinkageAbout, INormalFn } from '@/types'
import { genKey } from '@/utils'

type ITask = {
  callback: INormalFn
  endCount: number
  computedCount: number
  intervalTime: number
  prevTime: number
  taskId: string
}

// 表示任务是否已经启动
let isSetupScheduler = false
let taskStack = [] as ITask[]

/**
 * @author lihh
 * @description 模拟event loop
 * @param initState 是否第一次执行
 */
const eventLoopTask = () => {
  if (!isSetupScheduler) return
  let timer = setTimeout(() => {
    resolveLoopInTask()
    eventLoopTask()
    clearTimeout(timer)
  }, 1000 / 60)
}

/**
 * @author lihh
 * @description 解析loop中的任务
 */
const resolveLoopInTask = () => {
  // 判断是否有任务
  if (taskStack.length === 0) return

  // 开始遍历任务 将到期的任务执行
  const newTask = [] as ITask[]
  const beDeletedTaskIds = [] as string[]

  const currentDate = performance.now()
  taskStack.forEach((item) => {
    const {
      taskId,
      prevTime,
      intervalTime,
      endCount,
      computedCount,
      callback
    } = item

    // 表示循环已经结束了
    if (endCount === computedCount) {
      beDeletedTaskIds.push(taskId)
      callback()
    } else {
      // 表示执行时机到了
      if (prevTime + intervalTime * 1000 < currentDate) {
        newTask.push({
          ...item,
          prevTime: currentDate,
          computedCount: computedCount + 1
        })
        beDeletedTaskIds.push(taskId)
        callback()
      }
    }
  })

  // 任务整合
  taskStack = taskStack
    .filter((item) => !beDeletedTaskIds.includes(item.taskId))
    .concat(newTask)
}

/**
 * @author lihh
 * @description  启动调度程序
 */
export const setupScheduler = () => {
  if (isSetupScheduler) return

  isSetupScheduler = true
  eventLoopTask()
}

/**
 * @author lihh
 * @description 关闭调度程序
 */
export const closeScheduler = () => (isSetupScheduler = false)

/**
 * @author lihh
 * @description db 查询相关任务调度
 * @param rate 表示调度频次
 * @param drawAssignChartCallback 绘制图表的回调
 */
export const schedulerTask = (
  rate: { loopCounter: number; loopTime: number },
  drawAssignChartCallback: INormalFn
) => {
  const { loopCounter, loopTime } = rate

  // 添加待执行任务
  taskStack.push({
    callback: drawAssignChartCallback,
    endCount: loopCounter,
    intervalTime: loopTime,
    prevTime: 0,
    taskId: genKey(),
    computedCount: 1
  })
}
