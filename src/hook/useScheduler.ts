import { INormalFn, ISchedulerRate, ITask } from '@/types'
import { genKey } from '@/utils'

// 表示任务是否已经启动
let isSetupScheduler = false
let taskStack = [] as ITask[]

/**
 * @author lihh
 * @description 模拟event loop
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
 * @param callback 绘制图表的回调
 */
const addSchedulerTask = (rate: ISchedulerRate, callback: INormalFn) => {
  const { loopCounter, loopTime } = rate

  // 表示开启任务
  setupScheduler()

  // 添加待执行任务
  taskStack.push({
    callback,
    endCount: loopCounter,
    intervalTime: loopTime,
    prevTime: 0,
    taskId: genKey(),
    computedCount: 1
  })
}

/**
 * @author lihh
 * @description 调度的hook
 */
export const useScheduler = (): [
  (rate: ISchedulerRate, callback: INormalFn) => void,
  INormalFn,
  INormalFn
] => {
  return [addSchedulerTask, setupScheduler, closeScheduler]
}
