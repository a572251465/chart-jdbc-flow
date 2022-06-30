import { IBlockItem, INormalFn } from '@/types'
import { ComputedRef } from 'vue'

// 表示触发mouseUp之后的 回调函数
let currentCallback: INormalFn | null = null

/**
 * @author lihh
 * @description 元素移动的函数
 * @param focusData 选中的元素
 */
export const useBlockDragMove = (
  focusData: ComputedRef<{
    focusBlocks: IBlockItem[]
    unFocusBlocks: IBlockItem[]
  }>
) => {
  // 表示当前坐标 以及所有元素的位置
  let currentPos = {
    x: 0,
    y: 0,
    allBlockItem: [] as { x: number; y: number }[]
  }

  // 表示鼠标按下事件
  const mouseDown = (e: MouseEvent, callback?: INormalFn) => {
    // 先记录当前鼠标按下时， 鼠标所处clientX, clientY 以及元素的位置
    const { clientX, clientY } = e
    const allBlockItemPos = focusData.value.focusBlocks.map((item) => ({
      x: item.left,
      y: item.top
    }))
    currentPos = { x: clientX, y: clientY, allBlockItem: allBlockItemPos }

    document.addEventListener('mouseup', mouseUp)
    document.addEventListener('mousemove', mouseMove)

    if (callback) currentCallback = callback
  }

  // 鼠标放开触发事件
  const mouseUp = () => {
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mousemove', mouseMove)

    // 触发回调
    typeof currentCallback === 'function' && currentCallback()
  }

  // 鼠标移动触发事件
  const mouseMove = (e: MouseEvent) => {
    const { clientX: moveX, clientY: moveY } = e
    // 计算鼠标移动的位置
    const durX = moveX - currentPos.x
    const durY = moveY - currentPos.y

    const { allBlockItem: allBlockItemPos } = currentPos
    focusData.value.focusBlocks.forEach((item, key) => {
      const { x, y } = allBlockItemPos[key]
      item.left = durX + x
      item.top = durY + y
    })
  }

  return {
    mouseDown
  }
}
