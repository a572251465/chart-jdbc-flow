import { defineComponent, PropType, watch } from 'vue'
import { IBlockItem } from '@/types'
import { ElSkeleton } from 'element-plus'
import '@/views/Drag/components/index.less'
import { chartItemHack } from '@/views/Drag/components/ChartItem/chartItem-hack'
import { setupScheduler } from '@/utils'

export default defineComponent({
  components: {
    ElSkeleton
  },
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
        <ElSkeleton
          rows={5}
          animated={true}
          v-show={curBlockItem.value?.isScreenFrame}
        />
        <div
          ref={drawContainerRef}
          id={curBlockItem.value?.createDomId}
          style={drawContainerStyles.value}
          v-show={!curBlockItem.value?.isScreenFrame}></div>
      </div>
    )
  }
})
