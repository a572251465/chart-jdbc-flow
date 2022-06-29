import { defineComponent, reactive } from 'vue'
import './index.less'
import dataConfig from '@/views/Drag/initial-data'

// 表示图表数据
const chartData = reactive(dataConfig)

export default defineComponent({
  setup() {},
  render() {
    return (
      <div class="drag-left">
        <ul>
          {chartData.map((item, key) => (
            <li key={key}>
              <img src={item.icon} alt="物料" />
            </li>
          ))}
        </ul>
      </div>
    )
  }
})
