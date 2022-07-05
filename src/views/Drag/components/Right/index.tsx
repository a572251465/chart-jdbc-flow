import { defineComponent, PropType } from 'vue'
import '@/views/Drag/components/index.less'
import ChartItem from '@/views/Drag/components/ChartItem'
import DataLinkage from '@/components/DataLinkage/index.vue'
import { IBlockItem } from '@/types'
import { rightHack } from '@/views/Drag/components/Right/right-hack'
import DataSourceComponent from '@/components/DataSource/index.vue'

export default defineComponent({
  components: {
    ChartItem,
    DataLinkage
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
      singleBlockClickHandle,
      markLine,
      allBlockItem,
      editorRef,
      singleBlockMenuDispatcher,
      dataSourceShowFlag,
      currentEditorBlock
    } = rightHack(props, ctx)

    return () => (
      <div class="drag-right">
        <div class="drag-right-container">
          <div class="drag-right-container-inner" ref={editorRef}>
            {allBlockItem.value.map((item) => (
              <ChartItem
                key={item.createDomId}
                block={item}
                onSingleBlockMenuClick={singleBlockMenuDispatcher}
                onSingleBlockClick={singleBlockClickHandle}
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
        </div>

        {/*  数据源弹框 */}
        <DataSourceComponent currentEditorBlock = {currentEditorBlock.value} v-model={dataSourceShowFlag.value} />
      </div>
    )
  }
})
