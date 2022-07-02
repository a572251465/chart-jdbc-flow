import { computed, ref } from 'vue'

type IProps = {
  readonly modelValue: boolean
}

interface IEmit {
  (event: 'update:modelValue', ...args: any[]): void
}

// 表示db类型
const dbType = ref<string>('Mysql')

/**
 * @author lihh
 * @description 将文件ConfigureDataBase setup方法 进行抽离
 * @param props 传递参数
 * @param emit 提交emit事件
 */
export const configureHack = (props: IProps, emits: IEmit) => {
  // 弹框显隐
  const showFlag = computed<boolean>({
    get: () => props.modelValue,
    set(value: boolean) {
      emits('update:modelValue', value)
    }
  })

  return {
    showFlag,
    dbType
  }
}
