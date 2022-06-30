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

    /**
     * @author lihh
     * @description 清除所有光标选中状态
     */
    const clearAllBlockFocusState = (...args: any[]) => {
      // 通过手动筛选 设置默认事件
      if (args.length > 0) {
        const e = args[0] as PointerEvent
        if (e && typeof e === 'object' && Reflect.has(e, 'path')) {
          const paths = (
            Array.isArray((e as any).path) ? (e as any).path : []
          ) as HTMLDivElement[]
          for (let i = 0; i < paths.length; i++)
            if ((paths[i].className || '').includes('editor-single-block-item'))
              return
        }
      }
      allBlockItem.value?.forEach((item) => {
        item.isFocus = false
      })
    }

    /**
     * @author lihh
     * @description 单个图表点击事件
     * @param e 鼠标事件对象
     * @param blockRef 图表ref 数据
     */
    const singleBlockClickHandle = (e: MouseEvent, blockRef: IBlockItem) => {
      const isShiftKeySelected = e.shiftKey

      // 判断是否选中shift key
      if (isShiftKeySelected) {
        blockRef.isFocus = !blockRef.isFocus
      } else {
        if (blockRef.isFocus) {
          blockRef.isFocus = false
        } else {
          clearAllBlockFocusState()
          blockRef.isFocus = true
        }
      }
    }

    onMounted(() => {
      setCurrentEditorDrag(editorRef.value!)

      // bind window click event，when clicking body, cancel all block focus state
      unBindDom = bindDom(window, 'click', (...args) =>
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
