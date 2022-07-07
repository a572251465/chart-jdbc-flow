import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElNotification } from 'element-plus'
import { IDataSourceTarget, IDbConfigInfo, INormalFn } from '@/types'
import { useDbStore } from '@/store/DbStore'
import { dbConnectReq } from '@/api'

interface IProps {
  readonly modelValue: boolean | undefined
}

interface IEmits {
  (event: 'update:modelValue', ...args: any[]): void
}

interface INewDbConfigInfo extends IDbConfigInfo {
  dbTarget: IDataSourceTarget
  name: string
}

// 表示数据源
const dbSourceList = reactive([
  { label: 'MYSQL数据库', value: IDataSourceTarget.MYSQL }
])

// 表示db信息
const dbInfo = reactive<INewDbConfigInfo>({
  dbTarget: IDataSourceTarget.MYSQL,
  name: '',
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
})
// 表示校验规则
const rules = reactive<FormRules>({
  name: [{ required: true, message: 'Please input db name', trigger: 'blur' }],
  host: [{ required: true, message: 'Please input db host', trigger: 'blur' }],
  user: [{ required: true, message: 'Please input db user', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input db password', trigger: 'blur' }
  ],
  database: [
    { required: true, message: 'Please input db database', trigger: 'blur' }
  ],
  port: [{ required: true, message: 'Please input db port', trigger: 'blur' }]
})
// form表单实例
const ruleFormRef = ref<FormInstance>()
// 表示保存成功的回调
let commitFormEditStoreCallback: INormalFn | null = null

/**
 * @author lihh
 * @description 提交表单信息
 * @param formEl 表单实例
 * @param type 测试连接/ 保存信息  1 = 测试连接 2 = 保存信息
 */
const commitFormInfo = async (
  formEl: FormInstance | undefined,
  type: number
) => {
  // 如果表单实例为空
  if (!formEl) return

  // 进行数据请求
  const dbConnectCallback = async () => {
    const param = { ...dbInfo }
    if (Reflect.has(param, 'name')) Reflect.deleteProperty(param, 'name')
    if (Reflect.has(param, 'dbTarget'))
      Reflect.deleteProperty(param, 'dbTarget')
    const res = await dbConnectReq(param)

    if (res.code !== 200) {
      ElNotification.error('连接失败')
      console.error(JSON.stringify(res.message))
      return
    }

    if (type === 1) {
      ElNotification.success('连接成功')
    } else {
      commitFormEditStoreCallback!()
    }
  }

  await formEl.validate(async (valid) => {
    if (!valid) return
    await dbConnectCallback()
  })
}

/**
 * @author lihh
 * @description 清空表单信息
 * @param formEl 表单实例
 */
const clearFormInfo = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

/**
 * @author lihh
 * @description 文件mysqlDb中 setup函数内容抽离
 * @param props 表示传递参数类型
 * @param emits 提交的emits函数
 */
export const connectDbHack = (props: IProps, emits: IEmits) => {
  // 弹框显隐
  const showFlag = computed({
    get: () => props.modelValue!,
    set: (value: boolean) => {
      emits('update:modelValue', value)
    }
  })

  /**
   * @author lihh
   * @description 提交表单成功后 回调修改store仓库
   * @param tables 获取的数据库中的表
   */
  commitFormEditStoreCallback = () => {
    const store = useDbStore()

    // 将信息保存到缓存中
    store.editStoreField({
      dataSources: {
        ...store.dataSources,
        [dbInfo.dbTarget]: { name: dbInfo.name }
      }
    })
    ElNotification.success('保存成功')
    showFlag.value = false
  }

  return {
    dbInfo,
    showFlag,
    rules,
    ruleFormRef,
    commitFormInfo,
    clearFormInfo,
    dbSourceList
  }
}
