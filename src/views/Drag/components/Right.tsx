import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  ref
} from 'vue'
import './index.less'
import ChartItem from '@/views/Drag/components/chart-item'
import { bindDom, setCurrentEditorDrag } from '@/utils'
import { IBlockItem, INormalFn } from '@/types'
import { useFocusAboutBlock } from '@/hook/useFocusAboutBlock'
import { useBlockDragMove } from '@/hook/useBlockDragMove'

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
    // 表示解绑事件
    let unBindDom: INormalFn | null = null

    // 筛选光标选中 以及非选中状态
    const { focusData, singleBlockClickHandle, clearAllBlockFocusState } =
      useFocusAboutBlock(allBlockItem, (e: MouseEvent) => {
        mouseDown(e)
      })

    // 表示鼠标按下 移动事件
    const { mouseDown } = useBlockDragMove(focusData)

    onMounted(() => {
      setCurrentEditorDrag(editorRef.value!)

      // bind window click event，when clicking body, cancel all block focus state
      unBindDom = bindDom(window, 'mousedown', (...args) =>
        clearAllBlockFocusState(...args)
      )!
    })

    onBeforeMount(() => {
      typeof unBindDom === 'function' && unBindDom()
    })

    return () => (
      <div class="drag-right">
        <div class="drag-right-container" ref={editorRef}>
          {allBlockItem.value.map((item) => (
            <ChartItem
              key={item.createDomId}
              block={item}
              onSingleBlockClick={singleBlockClickHandle}
            />
          ))}
        </div>
      </div>
    )
  }
})
