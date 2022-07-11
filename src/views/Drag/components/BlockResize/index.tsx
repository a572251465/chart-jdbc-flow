import { defineComponent, PropType } from 'vue'
import './index.less'
import { IBlockItem } from '@/types'

const enum IBlockMoveDirection {
  START = 'START',
  END = 'END',
  CENTER = 'CENTER'
}

export default defineComponent({
  props: {
    curBlock: {
      type: Object as PropType<IBlockItem>,
      default: () => ({})
    }
  },
  setup(props) {
    let data: Record<string, any> = {}
    const onmousemove = (e: MouseEvent) => {
      let { clientX, clientY } = e
      let {
        startX,
        startY,
        startWidth,
        startHeight,
        startLeft,
        startTop,
        direction
      } = data

      if (direction.horizontal === IBlockMoveDirection.CENTER) {
        // 如果拖拽的是 中间的点 X轴是不变的
        clientX = startX
      }
      if (direction.vertical === IBlockMoveDirection.CENTER) {
        // 只能改横向 纵向是不发生变化的
        clientY = startY
      }

      let durX = clientX - startX
      let durY = clientY - startY

      if (direction.vertical === IBlockMoveDirection.START) {
        //  针对反向拖拽的点 需要取反，拿到正确的组件top和left
        durY = -durY
        props.curBlock.top = startTop - durY
      }
      if (direction.horizontal === IBlockMoveDirection.START) {
        durX = -durX
        props.curBlock.left = startLeft - durX
      }

      const width = startWidth + durX
      const height = startHeight + durY

      props.curBlock.width = width
      props.curBlock.height = height
    }
    const onmouseup = () => {
      document.removeEventListener('mousemove', onmousemove)
      document.removeEventListener('mouseup', onmouseup)
    }
    const onmousedown = (
      e: MouseEvent,
      direction: {
        horizontal: IBlockMoveDirection
        vertical: IBlockMoveDirection
      }
    ) => {
      e.stopPropagation()
      data = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: props.curBlock.width,
        startHeight: props.curBlock.height,
        startLeft: props.curBlock.left,
        startTop: props.curBlock.top,
        direction
      }
      document.addEventListener('mousemove', onmousemove)
      document.addEventListener('mouseup', onmouseup)
    }

    return () => (
      <>
        <div
          class="block-resize block-resize-left"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.START,
              vertical: IBlockMoveDirection.CENTER
            })
          }></div>
        <div
          class="block-resize block-resize-right"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.END,
              vertical: IBlockMoveDirection.CENTER
            })
          }></div>
        <div
          class="block-resize block-resize-top"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.CENTER,
              vertical: IBlockMoveDirection.START
            })
          }></div>
        <div
          class="block-resize block-resize-bottom"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.CENTER,
              vertical: IBlockMoveDirection.END
            })
          }></div>
        <div
          class="block-resize block-resize-top-left"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.START,
              vertical: IBlockMoveDirection.START
            })
          }></div>
        <div
          class="block-resize block-resize-top-right"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.END,
              vertical: IBlockMoveDirection.START
            })
          }></div>
        <div
          class="block-resize block-resize-bottom-left"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.START,
              vertical: IBlockMoveDirection.END
            })
          }></div>
        <div
          class="block-resize block-resize-bottom-right"
          onMousedown={(e) =>
            onmousedown(e, {
              horizontal: IBlockMoveDirection.END,
              vertical: IBlockMoveDirection.END
            })
          }></div>
      </>
    )
  }
})
