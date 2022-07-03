import { computed } from 'vue'
import { useDbStore } from '@/store/DbStore'

type IProps = {
  modelValue: boolean | undefined
}

interface IEmits {
  (event: 'update:modelValue', ...args: any[]): void
}

/**
 * @author lihh
 * @description 将组件DataLinkage setup方法进行抽离
 * @param props 传递的props
 * @param emits 传递的emits
 */
export const linkageHack = (props: IProps, emits: IEmits) => {
  // 表示store 仓库
  const store = useDbStore()
  // 表示弹框显隐显示
  const showFlag = computed({
    get: () => props.modelValue!,
    set: (value: boolean) => {
      emits('update:modelValue', value)
    }
  })
  // 设置展示的table 列表
  const tableList = computed(() => store.mysqlConfigInfo.tables)

  return {
    showFlag,
    tableList
  }
}
