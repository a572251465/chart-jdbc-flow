import { computed, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useGlobalStore } from '@/store/GlobalStore'

type IProps = {
  readonly type: string
}

// 表示db信息
const dbInfo = reactive({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '',
  port: '3306'
})
// 表示校验规则
const rules = reactive<FormRules>({
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

/**
 * @author lihh
 * @description 提交表单信息
 * @param formEl 表单实例
 */
const commitFormInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid) => {
    if (!valid) return
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
 */
export const mysqlHack = (props: IProps) => {
  // 表示pina store
  const store = useGlobalStore()
  // 监听tab切换
  watch(
    () => props.type,
    (value: string) => {
      console.log(value)
      if (value === 'Mysql') clearFormInfo(ruleFormRef.value)
    }
  )
  // 表示db 连接状态
  const isDbConnect = computed<boolean>(() => store.isDbConnect)

  return {
    dbInfo,
    rules,
    ruleFormRef,
    commitFormInfo,
    clearFormInfo,
    isDbConnect
  }
}
