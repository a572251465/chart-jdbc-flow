import { computed, reactive, ref } from 'vue'
import { ITableFiled, useDbStore } from '@/store/DbStore'
import { IBlockItem, IDbLinkageAbout } from '@/types'
import { tableInFieldReq } from '@/api'
import { ElNotification } from 'element-plus'

type IProps = {
  modelValue: boolean | undefined
  currentClickBlock: IBlockItem
}
type INewTableField = Omit<IDbLinkageAbout, 'tableField'> & {
  tableField: string[]
}

interface IEmits {
  (event: 'update:modelValue', ...args: any[]): void
}

// 表示配置数据源一些信息
const dataSourceInfo = reactive<INewTableField>({
  table: '',
  tableField: [],
  loopCounter: 1,
  loopTime: 1
})
// 表示表属性信息
const tableFieldInfos = ref<ITableFiled[]>([])

/**
 * @author lihh
 * @description 保存关联动态db 信息
 */
const saveDataLinkageInfo = (props: IProps, emits: IEmits) => () => {
  // 筛选显示的表字段
  const { tableField } = dataSourceInfo
  const tableInField = tableFieldInfos.value.filter((item) =>
    tableField.includes(item.fieldName)
  )

  emits('update:modelValue', false)
}

/**
 * @author lihh
 * @description table发生变化 change事件
 * @param table 表名
 */
const tableChangeHandle = async (table: string) => {
  // 先从缓存中查找
  const { mysqlConfigInfo, editStoreField } = useDbStore()
  // 表 跟 字段的对应关系
  const tableInField = mysqlConfigInfo.tableInField || {}
  // 如果存在的话 直接使用缓存
  if (Reflect.has(tableInField, table)) {
    tableFieldInfos.value = tableInField[table]
    return
  }

  // 进行数据请求
  const res = await tableInFieldReq(table)
  if (res.code !== 200) {
    ElNotification.error('查询失败')
    console.error(res.message)
    return
  }

  tableFieldInfos.value = res.data
  // 将内容保存到缓存
  tableInField[table] = res.data
  editStoreField({
    mysqlConfigInfo: { ...mysqlConfigInfo, tableInField }
  })
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
    tableList,
    dataSourceInfo,
    tableChangeHandle,
    tableFieldInfos,
    saveDataLinkageInfo: saveDataLinkageInfo(props, emits)
  }
}
