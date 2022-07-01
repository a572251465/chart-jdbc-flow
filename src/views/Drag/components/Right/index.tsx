import {
  computed,
  CSSProperties,
  defineComponent,
  onBeforeMount,
  onMounted,
  PropType,
  reactive,
  ref
} from 'vue'
import '@/views/Drag/components/index.less'
import ChartItem from '@/views/Drag/components/ChartItem'
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
    let unBindDom: INormalFn[] = []
    // 右点菜单配置信息
    const rightMenuConfigInfo = reactive({
      showFlag: false,
      left: 0,
      top: 0
    })
    // 表示右击菜单样式
    const rightMenuStyles = computed<CSSProperties>(() => ({
      top: `${rightMenuConfigInfo.top}px`,
      left: `${rightMenuConfigInfo.left}px`
    }))

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
      // set drag canvas
      setCurrentEditorDrag(editorRef.value!)

      // bind window mousedown event，when clicking body, cancel all block focus state
      const unBDom = bindDom(window, 'mousedown', (...args) => {
        mouseDownClearComputedState()
        clearAllBlockFocusState(...args)
      })!

      // bind window click event, when clicking body, cancel bind state
      const unBDom1 = bindDom(window, 'click', () => {
        // 右击菜单取消
        rightMenuConfigInfo.showFlag = false
      })!
      unBindDom.push(unBDom, unBDom1)
    })

    onBeforeMount(() => {
      unBindDom.forEach((fn) => {
        typeof fn === 'function' && fn()
      })
    })

    /**
     * @author lihh
     * @description 表示mouseDown的时候 清空的状态
     */
    const mouseDownClearComputedState = () => {
      // focus选中的最后一个元素
      lastSelectedBlockId.value = ''

      // 辅助线的坐标
      markLine.x = null
      markLine.y = null
    }

    /**
     * @author lihh
     * @description 单个block 右击菜单事件
     * @param e 事件源对象
     * @param component 组件
     */
    const singleBlockRightMenuHandle = (
      e: MouseEvent,
      component: IBlockItem
    ) => {
      const { x, y } = e

      rightMenuConfigInfo.left = x
      rightMenuConfigInfo.top = y
      rightMenuConfigInfo.showFlag = true
    }

    return () => (
      <div class="drag-right">
        <div class="drag-right-container" ref={editorRef}>
          {allBlockItem.value.map((item) => (
            <ChartItem
              key={item.createDomId}
              block={item}
              onSingleBlockClick={singleBlockClickHandle}
              onSingleBlockRightMenu={singleBlockRightMenuHandle}
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

        {/*  右击事件 触发的panel */}
        <div
          class="drag-right-contextmenu-panel"
          style={rightMenuStyles.value}
          v-show={rightMenuConfigInfo.showFlag}>
          <ul>
            <li>删除</li>
            <li>复制</li>
            <li>配置数据源</li>
          </ul>
        </div>
      </div>
    )
  }
})
