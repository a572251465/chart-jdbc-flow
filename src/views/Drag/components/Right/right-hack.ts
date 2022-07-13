import {
  computed,
  CSSProperties,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  WritableComputedRef
} from 'vue'
import { IBlockItem, IBlockMenu, IEmitterTypes, INormalFn } from '@/types'
import { useFocusAboutBlock } from '@/hook/useFocusAboutBlock'
import { useBlockDragMove } from '@/hook/useBlockDragMove'
import { emitter, genKey, jsonEditorTips, setCurrentEditorDrag } from '@/utils'
import { useTips } from '@/hook/useTips'
import { blockMenuStrategy } from '@/views/Drag/components/Right/menuDispatcher'
import { mountedEvent } from '@/views/Drag/components/Right/mountedEvent'
import {
  getCopyBlock,
  setCopyBlockPos,
  setCurrentComponentType,
  setSelectedBlock
} from '@/utils/editor'
import { defaultBlockItem } from '@/views/Drag/editor-data'
import { ElNotification } from 'element-plus/es'

type IProps = { readonly modelValue: IBlockItem[] | undefined }

// 表示当前画布的 ref
const editorRef = ref<null | HTMLDivElement>(null)
// 表示解绑事件
let unBindDom: INormalFn[] = []
// 表示数据源弹框显示
const dataSourceShowFlag = ref<boolean>(false)
// 表示当前编辑的block
const currentEditorBlock = ref<IBlockItem | null>(null)
// 表示右击菜单的配置属性
const rightContextInfo = reactive<{ x: number; y: number; showFlag: boolean }>({
  x: 0,
  y: 0,
  showFlag: false
})
const rightContextStyles = computed<CSSProperties>(() => ({
  left: `${rightContextInfo.x}px`,
  top: `${rightContextInfo.y}px`
}))

/**
 * @author lihh
 * @description 表示粘贴组件处理
 * @param allBlockItem 全部的组件
 */
export const pasteComponentHandle =
  (allBlockItem: WritableComputedRef<IBlockItem[]>) => () => {
    const copyBlock = getCopyBlock()
    const newAllBlock = [
      Object.assign({}, defaultBlockItem, {
        ...copyBlock.block,
        top: copyBlock.x,
        left: copyBlock.y,
        createDomId: genKey()
      }),
      ...allBlockItem.value
    ]
    allBlockItem.value = newAllBlock
    ElNotification.success('组件粘贴成功')
    rightContextInfo.showFlag = false
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

    mountedEvent(
      unBindDom,
      allBlockItem,
      mouseDownClearComputedState,
      clearAllBlockFocusState,
      lastSelectedBlock
    )
  })

  onBeforeMount(() => {
    unBindDom.forEach((fn) => {
      typeof fn === 'function' && fn()
    })

    emitter.off(IEmitterTypes.BLOCK_DATA_EDITOR)
  })

  /**
   * @author lihh
   * @description 表示画布容器点击事件/ 或是右击事件
   * @param e 表示鼠标点击事件
   * @param type 表示事件触发类型 contextmenu/ click
   */
  const dragContainerClickOrRightClickHandle = (
    e: MouseEvent,
    type: string
  ) => {
    const { offsetX, x, y, offsetY } = e
    // 保存鼠标的位置
    setCopyBlockPos(offsetY, offsetX)

    // 判断是否是右击事件
    if (type === 'contextmenu' && getCopyBlock().block) {
      rightContextInfo.x = x
      rightContextInfo.y = y
      rightContextInfo.showFlag = true
    } else {
      rightContextInfo.showFlag = false
    }
  }

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

    // 设置当前编辑的组件类型
    setCurrentComponentType(currentEditorBlock.value.type)
    setSelectedBlock(currentEditorBlock.value)

    // 如果数据源单独判断
    if (type === IBlockMenu.DATA) {
      const [tips] = useTips(currentEditorBlock.value.type)
      jsonEditorTips.value = tips
      dataSourceShowFlag.value = true
      return
    } else {
      // 执行策略方法 锁定/ 解锁/ 复制/ 删除/ 置顶/ 置底
      blockMenuStrategy[type](currentEditorBlock, allBlockItem)
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
    currentEditorBlock,
    dragContainerClickOrRightClickHandle,
    rightContextStyles,
    rightContextInfo,
    pasteComponentHandle: pasteComponentHandle(allBlockItem)
  }
}
