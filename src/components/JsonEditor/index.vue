<script lang="ts" setup>
import { defineProps, onMounted, watch } from 'vue'
// 参数
const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['on-save'])

// 表示编辑器
let editor: {
  setTheme: (arg0: string) => void
  setValue: (value: any) => void
  getValue: () => any
  session: { setMode: (arg0: string) => void }
} | null = null

// 监听参数content 变化
watch(
  () => props.content,
  () => {
    // 判断编辑器是否初始化完成
    if (!editor) return
    setValue()
  }
)

/**
 * @author lihh
 * @description 保存修改格式化后的代码
 */
const saveContent = () => {
  const content = editor!.getValue()
  emits('on-save', content)
}

/**
 * @author lihh
 * @description 给代码编辑器中设置内容
 */
const setValue = () => {
  if (!props.content) return

  try {
    const content = JSON.parse(props.content)
    editor!.setValue(JSON.stringify(content, null, 2))
  } catch (e) {
    console.error(e)
    console.warn(
      'The parameter content of the component must be json Stringify'
    )
  }
}

onMounted(() => {
  editor = ace.edit('editor')

  // 表示识别模板 可以识别JavaScript
  editor!.setTheme('ace/theme/monokai')
  editor!.session.setMode('ace/mode/javascript')
  setValue()
})
</script>

<template>
  <div class="json-editor">
    <div id="editor"></div>
    <button class="save" @click="saveContent">保存</button>
  </div>
</template>

<style lang="less" scoped>
.json-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}

#editor {
  height: 80%;
}

button {
  width: 90%;
  display: block;
  height: 30px;
  outline: none;
  border: none;
  background: #409eff;
  border-radius: 4px;
  color: #ffffff;
  margin: 20px auto;
  cursor: pointer;
}
</style>
