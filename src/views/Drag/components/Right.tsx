import { defineComponent, ref } from 'vue'
import './index.less'
import ChartItem from '@/views/Drag/components/chart-item'
import baseInfo from './editor-data'

// 基础数据
const blockItems = ref(baseInfo)

export default defineComponent({
  setup() {},
  render() {
    return (
      <div class="drag-right">
        <div class="drag-right-container">
          {blockItems.value.map((item, key) => (
            <ChartItem key={key} block={item} />
          ))}
        </div>
      </div>
    )
  }
})
