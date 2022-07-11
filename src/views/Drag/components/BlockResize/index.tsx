import { defineComponent } from 'vue'
import "./index.less"

export default defineComponent({
  setup() {
    return () => <>
      <div class="block-resize block-resize-left"></div>
      <div class="block-resize block-resize-right"></div>
      <div class="block-resize block-resize-top"></div>
      <div class="block-resize block-resize-bottom"></div>
      <div class="block-resize block-resize-top-left"></div>
      <div class="block-resize block-resize-top-right"></div>
      <div class="block-resize block-resize-bottom-left"></div>
      <div class="block-resize block-resize-bottom-right"></div>
    </>
  }
})
