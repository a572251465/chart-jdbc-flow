import { defineComponent, PropType } from 'vue'
import '@/views/Drag/components/index.less'
import ChartItem from '@/views/Drag/components/ChartItem'
import { IBlockItem } from '@/types'
import {
  IContextMenuEnum,
  rightHack
} from '@/views/Drag/components/Right/right-hack'

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
  setup(props, ctx) {
    const {
      rightMenuConfigInfo,
      singleBlockRightMenuHandle,
      rightMenuStyles,
      singleBlockClickHandle,
      markLine,
      allBlockItem,
      editorRef,
      dispatcherHandle
    } = rightHack(props, ctx)

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
            <li onClick={(e) => dispatcherHandle(e, IContextMenuEnum.DEL)}>
              删除
            </li>
            <li onClick={(e) => dispatcherHandle(e, IContextMenuEnum.Copy)}>
              复制
            </li>
            <li onClick={(e) => dispatcherHandle(e, IContextMenuEnum.DB)}>
              数据联动
            </li>
          </ul>
        </div>
      </div>
    )
  }
})
