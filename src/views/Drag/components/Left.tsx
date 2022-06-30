import { computed, defineComponent, PropType, reactive } from 'vue'
import './index.less'
import dataConfig from '@/views/Drag/initial-data'
import { IBlockItem } from '@/types'
import { useEditorDrag } from '@/hook/useEditorDrag'

// 表示图表数据
const chartData = reactive(dataConfig)

export default defineComponent({
  props: {
    // 表示所有的block
    modelValue: {
      type: Object as PropType<IBlockItem[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 表示所有的元素
    const allBlockItem = computed({
      get: () => props.modelValue,
      set(blocks: IBlockItem[]) {
        emit('update:modelValue', blocks)
      }
    })

    // 实现图表的拖拽
    const [dragStart, dragEnd] = useEditorDrag(allBlockItem)

    return () => (
      <div class="drag-left">
        <ul>
          {chartData.map((component, key) => (
            <li key={key}>
              <img
                src={component.icon}
                alt="物料"
                draggable
                onDragstart={(e) => dragStart(e, component)}
                onDragend={(e) => dragEnd(e, component)}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
