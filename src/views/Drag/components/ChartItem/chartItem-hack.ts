import { IBlockItem, IDbLinkageAbout } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { dispatcher } from '@/views/Drag/components/ChartItem/dispatcher'

type IProps = {
  block: IBlockItem
}

interface IEmit {
  (event: 'singleBlockClick' | 'singleBlockRightMenu', ...args: any[]): void
}

// 表示chart 将要绘制的节点
const drawContainerRef = ref<HTMLDivElement | null>(null)

/**
 * @author lihh
 * @description 根据db 选择的属性结果 解析chart
 * @param type 表示图表的类型
 * @param dbAbout 查询的db 相关的表名/ 属性等
 */
export const resolveChartByDbHandle = (
  type: string,
  dbAbout: IDbLinkageAbout
) => {}

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
   * @description 点击图表事件
   */
  const singleBlockClickHandle = (e: MouseEvent) => {
    // 取消默认事件
    e.preventDefault()
    e.stopPropagation()

    emit('singleBlockClick', e, curBlockItem.value)
  }

  /**
   * @author lihh
   * @description 图表右击事件处理
   * @param e 事件对象
   */
  const dragBlockRightMenuHandle = (e: MouseEvent) => {
    // 禁止默认事件
    e.preventDefault()
    e.stopPropagation()

    emit('singleBlockRightMenu', e, curBlockItem.value)
  }

  onMounted(() => {
    if (curBlockItem.value?.alignCenter) elAlignCenterHandle()

    // 初期进行渲染
    dispatcher(drawContainerRef.value!, curBlockItem.value)
  })

  return {
    dragBlockRightMenuHandle,
    curBlockItem,
    curStyles,
    currentBlockRef,
    singleBlockClickHandle,
    drawContainerRef,
    drawContainerStyles
  }
}
