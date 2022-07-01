import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { IBlockItem } from '@/types'
import { ElSkeleton } from 'element-plus'
import '@/views/Drag/components/index.less'

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
    // 当前图表信息
    const curBlockItem = computed(() => props.block)
    // 计算样式
    const curStyles = computed(() => ({
      width: `${curBlockItem.value?.width}px`,
      height: `${curBlockItem.value?.height}px`,
      top: `${curBlockItem.value?.top}px`,
      left: `${curBlockItem.value?.left}px`,
      zIndex: curBlockItem.value?.zIndex
    }))
    // 表示当前渲染的block
    const currentBlockRef = ref<HTMLDivElement | null>(null)

    /**
     * @author lihh
     * @description 设置元素居中处理
     */
    const elAlignCenterHandle = () => {
      if (!currentBlockRef.value) return

      const { offsetWidth, offsetHeight } =
        currentBlockRef.value as HTMLDivElement
      curBlockItem.value!.left = curBlockItem.value?.left - offsetWidth / 2
      curBlockItem.value!.top = curBlockItem.value?.top - offsetHeight / 2
      curBlockItem.value!.alignCenter = false
    }

    /**
     * @author lihh
     * @description 点击图表事件
     */
    const singleBlockClickHandle = (e: MouseEvent) => {
      // 取消默认事件
      e.preventDefault()
      e.stopPropagation()

      emit('singleBlockClick', e, curBlockItem.value)
    }

    /**
     * @author lihh
     * @description 图表右击事件处理
     * @param e 事件对象
     */
    const dragBlockRightMenuHandle = (e: MouseEvent) => {
      emit('singleBlockRightMenu', e, curBlockItem.value)
    }

    onMounted(() => {
      if (curBlockItem.value?.alignCenter) elAlignCenterHandle()
    })

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
        <ElSkeleton rows={5} animated={true} />
      </div>
    )
  }
})
