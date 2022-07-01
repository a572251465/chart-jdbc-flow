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
    const {
      focusData,
      singleBlockClickHandle,
      clearAllBlockFocusState,
      lastSelectedBlock,
      lastSelectedBlockId
    } = useFocusAboutBlock(allBlockItem, (e: MouseEvent) => {
      mouseDown(e)
    })

    // 表示鼠标按下 移动事件
    const { mouseDown, markLine } = useBlockDragMove(
      focusData,
      lastSelectedBlock
    )

    onMounted(() => {
      setCurrentEditorDrag(editorRef.value!)

      // bind window click event，when clicking body, cancel all block focus state
      unBindDom = bindDom(window, 'mousedown', (...args) => {
        // 如果选择元素以外的部分 直接清空数据
        lastSelectedBlockId.value = ''
        markLine.x = null
        markLine.y = null
        clearAllBlockFocusState(...args)
      })!
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

          {/*  表示辅助线 */}
          {markLine.x !== null && (
            <div class="line-x" style={{ left: markLine.x + 'px' }}></div>
          )}
          {markLine.y !== null && (
            <div class="line-y" style={{ top: markLine.y + 'px' }}></div>
          )}
        </div>
      </div>
    )
  }
})
