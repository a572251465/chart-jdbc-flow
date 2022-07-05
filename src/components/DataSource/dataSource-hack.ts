import { computed, ref } from 'vue'

type IProps = {
  readonly modelValue: boolean
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

  return {
    showFlag,
    activeTab
  }
}
