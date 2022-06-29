import { computed, defineComponent, PropType } from 'vue'
import { IBlockItem } from '@/types'
import { ElSkeleton } from 'element-plus'
import './index.less'

export default defineComponent({
  components: {
    ElSkeleton
  },
  props: {
    // 传递的内容
    block: {
      type: Object as PropType<IBlockItem>
    }
  },
  setup(props) {
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

    return () => (
      <div class="editor-item" style={curStyles.value}>
        <ElSkeleton rows={5} animated={true} />
      </div>
    )
  }
})
