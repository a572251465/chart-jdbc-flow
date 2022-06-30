import { computed, defineComponent, PropType, reactive } from 'vue'
import './index.less'
import dataConfig from '@/views/Drag/initial-data'
import { dragStart, dragEnd } from './eidtor-drag'
import { IBlockItem } from '@/types'

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

    /**
     * @author lihh
     * @description 设置新的block
     * @param newComponent
     */
    const setBlockHandle = (newComponent: IBlockItem) => {
      const newBlocks = [newComponent, ...allBlockItem.value]
      allBlockItem.value = newBlocks
    }

    return () => (
      <div class="drag-left">
        <ul>
          {chartData.map((component, key) => (
            <li key={key}>
              <img
                src={component.icon}
                alt="物料"
                draggable
                onDragstart={(e) => dragStart(e, component, setBlockHandle)}
                onDragend={dragEnd}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
