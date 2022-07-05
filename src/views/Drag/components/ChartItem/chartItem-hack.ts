import { IBlockItem, IBlockMenu } from '@/types'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { dispatcher } from '@/views/Drag/components/ChartItem/dispatcher'

type IProps = {
  block: IBlockItem
}

interface IEmit {
  (event: 'singleBlockClick' | 'singleBlockMenuClick', ...args: any[]): void
}

// 表示block 菜单列表
const menuList = reactive([
  { type: IBlockMenu.COPY, icon: 'icon-fuzhi', tips: '复制' },
  { type: IBlockMenu.DEL, icon: 'icon-shanchu', tips: '删除' },
  { type: IBlockMenu.TOPPING, icon: 'icon-zhiding', tips: '置顶' },
  { type: IBlockMenu.BOTTOMING, icon: 'icon-zhidi', tips: '置底' },
  { type: IBlockMenu.DATA, icon: 'icon-shujuyuan', tips: '数据源' }
])

// 表示chart 将要绘制的节点
const drawContainerRef = ref<HTMLDivElement | null>(null)

/**
 * @author lihh
 * @description 将文件ChartItem的setup 核心内容抽离
 * @param props 传递的参数
 * @param emit 提交的emit方法
 */
export const chartItemHack = (props: IProps, emit: IEmit) => {
  // 当前图表信息
  const curBlockItem = computed(() => props.block)
  // 计算样式
  const curStyles = computed(() => ({
    width: `${curBlockItem.value?.width}px`,
    height: `${curBlockItem.value?.height}px`,
    top: `${curBlockItem.value?.top}px`,
    left: `${curBlockItem.value?.left}px`,
    zIndex: curBlockItem.value?.zIndex
  }))
  // 表示绘制容易的样式
  const drawContainerStyles = computed(() => ({
    width: `${curBlockItem.value?.width}px`,
    height: `${curBlockItem.value?.height}px`
  }))
  // 表示当前渲染的block
  const currentBlockRef = ref<HTMLDivElement | null>(null)

  // 编辑数据变化 重新渲染
  watch(
    () => curBlockItem.value.data,
    () => {
      dispatcher(drawContainerRef.value!, curBlockItem.value)
    },
    { deep: true }
  )

  /**
   * @author lihh
   * @description 设置元素居中处理
   */
  const elAlignCenterHandle = () => {
    if (!currentBlockRef.value) return

    const { offsetWidth, offsetHeight } =
      currentBlockRef.value as HTMLDivElement
    curBlockItem.value!.left = curBlockItem.value?.left - offsetWidth / 2
    curBlockItem.value!.top = curBlockItem.value?.top - offsetHeight / 2
    curBlockItem.value!.alignCenter = false
  }

  /**
   * @author lihh
   * @description 表示元素菜单点击
   * @param type 表示点击类型
   */
  const singleBlockMenuClickHandle = (type: IBlockMenu) => {
    emit('singleBlockMenuClick', type, curBlockItem.value.createDomId)
  }

  /**
   * @author lihh
   * @description 点击图表事件
   */
  const singleBlockClickHandle = (e: MouseEvent) => {
    // 取消默认事件
    e.preventDefault()
    e.stopPropagation()

    emit('singleBlockClick', e, curBlockItem.value)
  }

  onMounted(() => {
    if (curBlockItem.value?.alignCenter) elAlignCenterHandle()

    // 初期进行渲染
    dispatcher(drawContainerRef.value!, curBlockItem.value)
  })

  return {
    curBlockItem,
    curStyles,
    currentBlockRef,
    singleBlockClickHandle,
    drawContainerRef,
    drawContainerStyles,
    menuList,
    singleBlockMenuClickHandle
  }
}
