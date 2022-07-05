import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { IBlockItem, INormalFn } from '@/types'
import { useFocusAboutBlock } from '@/hook/useFocusAboutBlock'
import { useBlockDragMove } from '@/hook/useBlockDragMove'
import { bindDom, setCurrentEditorDrag } from '@/utils'

type IProps = { readonly modelValue: IBlockItem[] | undefined }

// 表示当前画布的 ref
const editorRef = ref<null | HTMLDivElement>(null)
// 表示解绑事件
let unBindDom: INormalFn[] = []

/**
 * @author lihh
 * @description 将Right组件的 setup方法进行抽离
 * @param props 传递的props
 * @param ctx 对象的上下文
 */
export const rightHack = (props: IProps, ctx: any) => {
  // 表示所有的block 元素
  const allBlockItem = computed({
    get: () => props.modelValue!,
    set: (blocks: IBlockItem[]) => {
      ctx.emit('update:modelValue', blocks)
    }
  })

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
  const { mouseDown, markLine } = useBlockDragMove(focusData, lastSelectedBlock)

  onMounted(() => {
    // set drag canvas
    setCurrentEditorDrag(editorRef.value!)

    // bind window mousedown event，when clicking body, cancel all block focus state
    const unBDom = bindDom(window, 'mousedown', (...args) => {
      mouseDownClearComputedState()
      clearAllBlockFocusState(...args)
    })!
    unBindDom.push(unBDom)
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

  return {
    markLine,
    allBlockItem,
    editorRef,
    singleBlockClickHandle
  }
}
