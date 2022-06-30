import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import './index.less'
import ChartItem from '@/views/Drag/components/chart-item'
import { setCurrentEditorDrag } from '@/utils'
import { IBlockItem } from '@/types'

export default defineComponent({
  components: {
    ChartItem
  },
  props: {
    // 传递的参数
    modelValue: {
      type: Object as PropType<IBlockItem[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 表示所有的block 元素
    const allBlockItem = computed({
      get: () => props.modelValue,
      set: (blocks: IBlockItem[]) => {
        emit('update:modelValue', blocks)
      }
    })
    // 表示当前画布的 ref
    const editorRef = ref<null | HTMLDivElement>(null)

    onMounted(() => {
      setCurrentEditorDrag(editorRef.value!)
    })

    return () => (
      <div class="drag-right">
        <div class="drag-right-container" ref={editorRef}>
          {allBlockItem.value.map((item) => (
            <ChartItem key={item.createDomId} block={item} />
          ))}
        </div>
      </div>
    )
  }
})
