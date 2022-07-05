import { computed, CSSProperties, reactive, ref } from 'vue'
import { IBlockItem } from '@/types'
import { emitter } from '@/utils'

type IProps = {
  readonly modelValue: boolean
  readonly currentEditorBlock: IBlockItem
}

interface IEmit {
  (event: 'update:modelValue', ...args: any[]): void
}

// 表示当前激活的tab
const activeTab = ref<string>('JSON')

/**
 * @author lihh
 * @description 将文件ConfigureDataBase setup方法 进行抽离
 * @param props 传递参数
 * @param emit 提交emit事件
 */
export const dataSourceHack = (props: IProps, emits: IEmit) => {
  // 弹框显隐
  const showFlag = computed<boolean>({
    get: () => props.modelValue,
    set(value: boolean) {
      emits('update:modelValue', value)
    }
  })
  // 计算jsonEditor 样式
  const jsonEditorStyles = reactive<CSSProperties>({
    height: `${window.screen.height * 0.75}px`
  })
  // 表示要转换的内容
  const transformCodeContent = computed<string>(() => {
    const { data, type } = props.currentEditorBlock
    if (type === 'pie') {
      return data[2]
    }
    return ''
  })

  /**
   * @author lihh
   * @description 编辑器修改代码后 回调
   * @param content 回调内容
   */
  const saveContentCallback = (content: string) => {
    showFlag.value = false

    // 发布订阅 进行发布 告诉right.tsx 修改数据
    emitter.emit('block-data-editor', [
      content,
      props.currentEditorBlock.createDomId
    ])
  }

  return {
    showFlag,
    activeTab,
    jsonEditorStyles,
    transformCodeContent,
    saveContentCallback
  }
}
