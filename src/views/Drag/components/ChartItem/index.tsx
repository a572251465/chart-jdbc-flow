import { defineComponent, PropType } from 'vue'
import { IBlockItem, IBlockMenu } from '@/types'
import '@/views/Drag/components/index.less'
import { ElTooltip } from 'element-plus'
import BlockResize from '@/views/Drag/components/BlockResize'
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
  emits: ['singleBlockClick', 'singleBlockMenuClick'],
  setup(props, { emit }) {
    // 执行抽离函数
    const {
      singleBlockClickHandle,
      currentBlockRef,
      curBlockItem,
      curStyles,
      drawContainerRef,
      drawContainerStyles,
      menuList,
      singleBlockMenuClickHandle
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
                }`}
                onClick={() =>
                  singleBlockMenuClickHandle(
                    curBlockItem.value.isLock
                      ? IBlockMenu.UNLOCK
                      : IBlockMenu.LOCK
                  )
                }></i>
            </ElTooltip>
            {menuList.map((item) => (
              <ElTooltip placement="top" content={item.tips}>
                <i
                  class={`iconfont ${item.icon}`}
                  onClick={() => singleBlockMenuClickHandle(item.type)}></i>
              </ElTooltip>
            ))}
          </div>
        ) : null}
        {/*  绘制可以拖拽的节点 */}
        {curBlockItem.value.isFocus ? (
          <BlockResize curBlock={curBlockItem.value} />
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
