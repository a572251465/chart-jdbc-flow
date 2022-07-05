import { defineComponent, PropType } from 'vue'
import { IBlockItem } from '@/types'
import '@/views/Drag/components/index.less'
import { ElTooltip } from 'element-plus'
import { chartItemHack } from '@/views/Drag/components/ChartItem/chartItem-hack'

export default defineComponent({
  components: {
    ElTooltip
  },
  props: {
    // 传递的内容
    block: {
      type: Object as PropType<IBlockItem>,
      default: () => ({})
    }
  },
  emits: ['singleBlockClick', 'singleBlockRightMenu'],
  setup(props, { emit }) {
    // 执行抽离函数
    const {
      singleBlockClickHandle,
      currentBlockRef,
      curBlockItem,
      curStyles,
      drawContainerRef,
      drawContainerStyles,
      menuList
    } = chartItemHack(props, emit)

    return () => (
      <div
        class={
          curBlockItem.value?.isFocus
            ? 'editor-single-block-item editor-item-focus'
            : 'editor-single-block-item'
        }
        style={curStyles.value}
        ref={currentBlockRef}
        onMousedown={(e) => singleBlockClickHandle(e)}>
        {/* 表示block 悬浮的菜单 */}
        {curBlockItem.value.isFocus ? (
          <div class="editor-single-block-item-over">
            <ElTooltip
              placement="top"
              content={curBlockItem.value.isLock ? '解锁' : '锁定'}>
              <i
                class={`iconfont ${
                  curBlockItem.value.isLock ? 'icon-jiesuo' : 'icon-suoding'
                }`}></i>
            </ElTooltip>
            {menuList.map((item) => (
              <ElTooltip placement="top" content={item.tips}>
                <i class={`iconfont ${item.icon}`}></i>
              </ElTooltip>
            ))}
          </div>
        ) : null}
        {/* 图表渲染el*/}
        <div
          ref={drawContainerRef}
          id={curBlockItem.value?.createDomId}
          style={drawContainerStyles.value}></div>
      </div>
    )
  }
})
