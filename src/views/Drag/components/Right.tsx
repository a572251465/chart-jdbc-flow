import { defineComponent, onMounted, ref } from 'vue'
import './index.less'
import ChartItem from '@/views/Drag/components/chart-item'
import baseInfo from '../editor-data'
import { setCurrentEditorDrag } from '@/utils'

// 基础数据
const blockItems = ref(baseInfo)

export default defineComponent({
  components: {
    ChartItem
  },
  setup() {
    // 表示当前画布的 ref
    const editorRef = ref<null | HTMLDivElement>(null)

    onMounted(() => {
      setCurrentEditorDrag(editorRef.value!)
    })

    return () => (
      <div class="drag-right">
        <div class="drag-right-container" ref={editorRef}>
          {blockItems.value.map((item, key) => (
            <ChartItem key={key} block={item} />
          ))}
        </div>
      </div>
    )
  }
})
