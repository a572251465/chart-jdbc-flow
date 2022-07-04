import { defineComponent, PropType } from 'vue'
import { IBlockItem } from '@/types'
import '@/views/Drag/components/index.less'
import { chartItemHack } from '@/views/Drag/components/ChartItem/chartItem-hack'

export default defineComponent({
  props: {
    // 传递的内容
    block: {
      type: Object as PropType<IBlockItem>,
      default: () => ({})
    }
  },
  emits: ['singleBlockClick', 'singleBlockRightMenu'],
  setup(props, { emit }) {
    // 执行抽离函数
    const {
      singleBlockClickHandle,
      dragBlockRightMenuHandle,
      currentBlockRef,
      curBlockItem,
      curStyles,
      drawContainerRef,
      drawContainerStyles
    } = chartItemHack(props, emit)

    return () => (
      <div
        onContextmenu={(e) => dragBlockRightMenuHandle(e)}
        class={
          curBlockItem.value?.isFocus
            ? 'editor-single-block-item editor-item-focus'
            : 'editor-single-block-item'
        }
        style={curStyles.value}
        ref={currentBlockRef}
        onMousedown={(e) => singleBlockClickHandle(e)}>
        <div
          ref={drawContainerRef}
          id={curBlockItem.value?.createDomId}
          style={drawContainerStyles.value}></div>
      </div>
    )
  }
})
