import { IBlockItem, INormalFn } from '@/types'
import { ComputedRef, reactive } from 'vue'
import { getCurrentEditorDrag } from '@/utils'

// 表示触发mouseUp之后的 回调函数
let currentCallback: INormalFn | null = null

// 表示显示辅助线
const markLine = reactive<{ x: number | null; y: number | null }>({
  x: null,
  y: null
})

/**
 * @author lihh
 * @description 元素移动的函数
 * @param focusData 选中的元素
 */
export const useBlockDragMove = (
  focusData: ComputedRef<{
    focusBlocks: IBlockItem[]
    unFocusBlocks: IBlockItem[]
  }>,
  lastSelectedBlock: ComputedRef<IBlockItem | undefined>
) => {
  // 表示当前坐标 以及所有元素的位置
  let currentPos = {
    startX: 0,
    startY: 0,
    startLeft: 0,
    startTop: 0,
    // 选中元素的位置
    allBlockItem: [] as { top: number; left: number }[],
    lines: {
      x: [] as { showLeft: number; left: number }[],
      y: [] as { showTop: number; top: number }[]
    }
  }

  // 表示鼠标按下事件
  const mouseDown = (e: MouseEvent, callback?: INormalFn) => {
    // 记录下最后元素的宽高
    const { width: BWidth, height: BHeight } = lastSelectedBlock.value!

    // 先记录当前鼠标按下时， 鼠标所处clientX, clientY 以及元素的位置
    const { clientX, clientY } = e
    const allBlockItemPos = focusData.value.focusBlocks.map((item) => ({
      left: item.left,
      top: item.top
    }))

    // 表示获取画布的宽高
    const { clientWidth: canvasWidth, clientHeight: canvasHeight } =
      getCurrentEditorDrag()!

    currentPos = {
      startX: clientX,
      startY: clientY,
      startLeft: lastSelectedBlock.value!.left,
      startTop: lastSelectedBlock.value!.top,
      allBlockItem: allBlockItemPos,
      lines: (() => {
        const { unFocusBlocks } = focusData.value
        const lines = {
          x: [] as { showLeft: number; left: number }[],
          y: [] as { showTop: number; top: number }[]
        }
        ;[
          { top: 0, left: 0, width: canvasWidth, height: canvasHeight },
          ...unFocusBlocks
        ].forEach((block) => {
          const {
            top: ATop,
            left: ALeft,
            width: AWidth,
            height: AHeight
          } = block

          lines.y.push({ showTop: ATop, top: ATop })
          lines.y.push({ showTop: ATop, top: ATop - BHeight }) // 顶对底
          lines.y.push({
            showTop: ATop + AHeight / 2,
            top: ATop + AHeight / 2 - BHeight / 2
          }) // 中对中
          lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }) // 底对顶
          lines.y.push({
            showTop: ATop + AHeight,
            top: ATop + AHeight - BHeight
          }) // 底对底

          lines.x.push({ showLeft: ALeft, left: ALeft }) // 左对左边
          lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }) // 右边对左边
          lines.x.push({
            showLeft: ALeft + AWidth / 2,
            left: ALeft + AWidth / 2 - BWidth / 2
          })
          lines.x.push({
            showLeft: ALeft + AWidth,
            left: ALeft + AWidth - BWidth
          })
          lines.x.push({ showLeft: ALeft, left: ALeft - BWidth }) // 左对右
        })
        return lines
      })()
    }

    document.addEventListener('mouseup', mouseUp)
    document.addEventListener('mousemove', mouseMove)

    if (callback) currentCallback = callback
  }

  // 鼠标放开触发事件
  const mouseUp = () => {
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mousemove', mouseMove)
    markLine.x = null
    markLine.y = null

    // 触发回调
    typeof currentCallback === 'function' && currentCallback()
  }

  // 鼠标移动触发事件
  const mouseMove = (e: MouseEvent) => {
    let { clientX: moveX, clientY: moveY } = e
    // 计算当前元素最新的left和top 去线里面找，找到显示线
    // 鼠标移动后 - 鼠标移动前 + left就好了
    let left = moveX - currentPos.startX + currentPos.startLeft
    let top = moveY - currentPos.startY + currentPos.startTop

    // 先计算横线  距离参照物元素还有5像素的时候 就显示这根线
    let y = null
    let x = null
    for (let i = 0; i < currentPos.lines.y.length; i++) {
      const { top: t, showTop: s } = currentPos.lines.y[i] // 获取每一根线
      if (Math.abs(t - top) < 5) {
        // 如果小于五说明接近了
        y = s
        // 容器距离顶部的距离 + 目标的高度 就是最新的moveY
        moveY = currentPos.startY - currentPos.startTop + t
        // 实现快速和这个元素贴在一起
        break
      }
    }
    for (let i = 0; i < currentPos.lines.x.length; i++) {
      const { left: l, showLeft: s } = currentPos.lines.x[i] // 获取每一根线
      if (Math.abs(l - left) < 5) {
        // 如果小于五说明接近了
        x = s
        moveX = currentPos.startX - currentPos.startLeft + l
        // 实现快速和这个元素贴在一起
        break
      }
    }
    markLine.x = x
    markLine.y = y

    // 之前和之后的距离
    let durX = moveX - currentPos.startX
    let durY = moveY - currentPos.startY
    requestAnimationFrame(() => {
      focusData.value.focusBlocks.forEach((item, idx) => {
        item.left = currentPos.allBlockItem[idx].left + durX
        item.top = currentPos.allBlockItem[idx].top + durY
      })
    })
  }

  return {
    mouseDown,
    markLine
  }
}
