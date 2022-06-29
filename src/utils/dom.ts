import { INormalFn } from '@/types'

type IBindDomOptions = Partial<{
  isBubbling: boolean
}> &
  (
    | { throttleTime: number; isThrottle: true }
    | { throttleTime?: number; isThrottle: false }
  )

const defaultValues = {
  isThrottle: true,
  throttleTime: 300,
  isBubbling: true
} as IBindDomOptions

/**
 * @author lihh
 * @param event 事件对象
 * @param eventName 事件名称
 * @param handle 事件本身
 */
const bindDom = <T = HTMLDivElement>(
  event: Window | HTMLDivElement | T,
  eventName: string,
  handle: INormalFn,
  options: IBindDomOptions = defaultValues
) => {
  // 合并对象
  const {
    isBubbling,
    isThrottle,
    throttleTime = 0
  } = Object.assign({}, options, defaultValues)

  let prevTimes = performance.now()
  const genFn = (event: Event, ...args: any[]) => {
    const curTimes = +new Date()
    if (curTimes - prevTimes < throttleTime) return
    prevTimes = curTimes

    if (isThrottle) {
      requestAnimationFrame(() => handle.call(event, event, ...args))
    } else {
      handle.call(event, event, ...args)
    }
  }

  if (!event || !eventName || typeof handle !== 'function') return
  ;(event as HTMLDivElement).addEventListener(eventName, genFn, isBubbling)

  return () => {
    ;(event as HTMLDivElement).removeEventListener(eventName, genFn, isBubbling)
  }
}

export default bindDom
