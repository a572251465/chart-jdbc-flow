import {
  computed,
  onBeforeMount,
  onMounted,
  ref,
  WritableComputedRef
} from 'vue'
import { IBlockItem, IBlockMenu, INormalFn } from '@/types'
import { useFocusAboutBlock } from '@/hook/useFocusAboutBlock'
import { useBlockDragMove } from '@/hook/useBlockDragMove'
import { bindDom, emitter, setCurrentEditorDrag } from '@/utils'
import { useBlockData } from '@/hook/useBlockData'

type IProps = { readonly modelValue: IBlockItem[] | undefined }

// 表示当前画布的 ref
const editorRef = ref<null | HTMLDivElement>(null)
// 表示解绑事件
let unBindDom: INormalFn[] = []
// 表示数据源弹框显示
const dataSourceShowFlag = ref<boolean>(false)
// 表示当前编辑的block
const currentEditorBlock = ref<IBlockItem | null>(null)

/**
 * @author lihh
 * @description 通过编辑器修改代码内容后 调度判断
 * @param allBlock
 */
const blockDataDispatcherJudge =
  (allBlock: WritableComputedRef<IBlockItem[]>) =>
  (params: [string, string]) => {
    useBlockData(allBlock.value, params[1], params[0])
  }

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

    // 订阅方法
    emitter.on<string>(
      'block-data-editor',
      // @ts-ignore
      blockDataDispatcherJudge(allBlockItem)
    )
  })

  onBeforeMount(() => {
    unBindDom.forEach((fn) => {
      typeof fn === 'function' && fn()
    })

    emitter.off('block-data-editor')
  })

  /**
   * @author lihh
   * @description 点击block元素上方菜单 触发事件
   * @param type 表示点击类型
   * @param id 表示要操作的id
   */
  const singleBlockMenuDispatcher = (type: IBlockMenu, id: string) => {
    // 过滤当前编辑的block
    currentEditorBlock.value = allBlockItem.value.find(
      (item) => item.createDomId === id
    )!

    // 如果数据源单独判断
    if (type === IBlockMenu.DATA) {
      dataSourceShowFlag.value = true
      return
    }
  }

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
    singleBlockClickHandle,
    singleBlockMenuDispatcher,
    dataSourceShowFlag,
    currentEditorBlock
  }
}
