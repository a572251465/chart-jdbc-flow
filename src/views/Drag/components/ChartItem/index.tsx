import { defineComponent, PropType, watch } from 'vue'
import { IBaseChartsData, IBlockItem } from '@/types'
import { ElSkeleton } from 'element-plus'
import '@/views/Drag/components/index.less'
import { chartItemHack } from '@/views/Drag/components/ChartItem/chartItem-hack'
import { dbAboutSchedulerTask, setupScheduler } from '@/utils'
import { strategyFieldReq } from '@/utils/req'
import { strategyChart } from '@/utils/draw'

export default defineComponent({
  components: {
    ElSkeleton
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
      dragBlockRightMenuHandle,
      currentBlockRef,
      curBlockItem,
      curStyles,
      drawContainerRef,
      drawContainerStyles
    } = chartItemHack(props, emit)

    // 针对db相关的处理进行监听
    watch(
      () => props.block?.dbAbout,
      (value) => {
        const { loopCounter, loopTime, table, tableField } = value!
        // 启动调度任务
        setupScheduler()

        // 添加调度任务
        Promise.resolve().then(() => {
          dbAboutSchedulerTask(
            { loopCounter: loopCounter!, loopTime: loopTime! },
            async () => {
              // 请求策略以及绘制策略
              const req = strategyFieldReq[curBlockItem.value.type]
              const draw = strategyChart[curBlockItem.value.type]

              const data = (await req(
                table,
                tableField
              )) as any as IBaseChartsData<string, number>
              draw(drawContainerRef, data)
              curBlockItem.value.isScreenFrame = false
            }
          )
        })
      },
      { deep: true }
    )

    return () => (
      <div
        onContextmenu={(e) => dragBlockRightMenuHandle(e)}
        class={
          curBlockItem.value?.isFocus
            ? 'editor-single-block-item editor-item-focus'
            : 'editor-single-block-item'
        }
        style={curStyles.value}
        ref={currentBlockRef}
        onMousedown={(e) => singleBlockClickHandle(e)}>
        <ElSkeleton
          rows={7}
          animated={true}
          v-show={curBlockItem.value?.isScreenFrame}
        />
        <div
          ref={drawContainerRef}
          id={curBlockItem.value?.createDomId}
          style={drawContainerStyles.value}
          v-show={!curBlockItem.value?.isScreenFrame}></div>
      </div>
    )
  }
})
