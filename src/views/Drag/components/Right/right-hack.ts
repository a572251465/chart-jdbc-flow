import {
  computed,
  CSSProperties,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  WritableComputedRef
} from 'vue'
import { IBlockItem, INormalFn } from '@/types'
import { useFocusAboutBlock } from '@/hook/useFocusAboutBlock'
import { useBlockDragMove } from '@/hook/useBlockDragMove'
import { bindDom, setCurrentEditorDrag } from '@/utils'
import { VuMessageBox } from 'vu-design-plus'
import { ElNotification } from 'element-plus'

export const enum IContextMenuEnum {
  DEL = 'del',
  Copy = 'copy',
  DB = 'db'
}

type IProps = { readonly modelValue: IBlockItem[] | undefined }

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
// 提前一步对选中的数据进行保存
const prevFocusData = [] as IBlockItem[]

/**
 * @author lihh
 * @description 批量删除 block元素
 * @param allBlockItem 原来的数据
 */
const batchDelBlocksHandle = (
  allBlockItem: WritableComputedRef<IBlockItem[]>
) => {
  // 表示删除回调
  const delCallback = () => {
    console.log(prevFocusData)
    const ids = prevFocusData.map((item) => item.createDomId)
    allBlockItem.value = allBlockItem.value.filter(
      (item) => !ids.includes(item.createDomId)
    )
    prevFocusData.length = 0
    ElNotification.success('删除成功')
  }

  VuMessageBox.delete('确定要删除选中的资源吗', {
    callback: delCallback
  })
}

// 调度方法 策略模式
const dispatcherStrategy: Record<IContextMenuEnum, INormalFn> = {
  [IContextMenuEnum.DEL]: batchDelBlocksHandle,
  [IContextMenuEnum.Copy]: () => {},
  [IContextMenuEnum.DB]: () => {}
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
   */
  const singleBlockRightMenuHandle = (e: MouseEvent) => {
    const { x, y } = e

    rightMenuConfigInfo.left = x
    rightMenuConfigInfo.top = y
    rightMenuConfigInfo.showFlag = true

    // 设置选中的数据
    prevFocusData.length = 0
    prevFocusData.push(...focusData.value.focusBlocks)
  }

  /**
   * @author lihh
   * @description 调度方法
   * @param e 事件对象
   * @param type 点击类型
   */
  const dispatcherHandle = (e: MouseEvent, type: IContextMenuEnum) => {
    // 阻止默认事件
    e.stopPropagation()
    e.preventDefault()

    if (!Reflect.has(dispatcherStrategy, type)) return

    dispatcherStrategy[type](allBlockItem)
  }

  return {
    rightMenuStyles,
    rightMenuConfigInfo,
    markLine,
    allBlockItem,
    editorRef,
    singleBlockClickHandle,
    singleBlockRightMenuHandle,
    dispatcherHandle
  }
}
