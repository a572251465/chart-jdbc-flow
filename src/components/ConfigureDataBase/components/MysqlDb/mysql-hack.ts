import { computed, ComputedRef, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { IDbConfigInfo } from '@/types'
import { ITable, useDbStore } from '@/store/DbStore'
import { dbConnectReq } from '@/api'
import { ElNotification } from 'element-plus'

type IProps = {
  readonly type: string
}

const mockData: IDbConfigInfo = {
  host: 'localhost',
  user: 'uino@root',
  password: 'uino@root',
  database: 'chart-jdbc-flow',
  port: 3306
}

// 表示db信息
const dbInfo = reactive<IDbConfigInfo>({
  host: '',
  user: '',
  password: '',
  database: '',
  port: 3306
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
// 表示加载中状态
const loadingFlags = ref<boolean>(false)

/**
 * @author lihh
 * @description 提交表单成功后 回调修改store仓库
 * @param tables 获取的数据库中的表
 */
const commitFormEditStoreCallback = (tables: ITable[]) => {
  const store = useDbStore()

  store.editStoreField({
    isDbConnect: true,
    mysqlConfigInfo: {
      ...store.mysqlConfigInfo,
      tables
    }
  })
}

/**
 * @author lihh
 * @description 提交表单信息
 * @param formEl 表单实例
 */
const commitFormInfo = (isDbConnect: ComputedRef<boolean>) => {
  return async (formEl: FormInstance | undefined) => {
    // 如果表单实例为空 && 已经连接db时
    if (!formEl || isDbConnect.value) return

    loadingFlags.value = true
    // 进行数据请求
    const dbConnectCallback = async () => {
      const res = await dbConnectReq(dbInfo)

      loadingFlags.value = false
      if (res.code !== 200) {
        ElNotification.error('连接失败')
        console.error(JSON.stringify(res.message))
        return
      }

      ElNotification.success('连接成功')
      commitFormEditStoreCallback(res.data)
    }

    await formEl.validate(async (valid) => {
      if (!valid) return
      await dbConnectCallback()
    })
  }
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
 * @description 设置模拟数据
 */
const setMockDataHandle = () => {
  const { host, user, password, database, port } = mockData
  dbInfo.host = host
  dbInfo.user = user
  dbInfo.password = password
  dbInfo.database = database
  dbInfo.port = port
}

/**
 * @author lihh
 * @description 文件mysqlDb中 setup函数内容抽离
 * @param props 表示传递参数类型
 */
export const mysqlHack = (props: IProps) => {
  // 表示pina store
  const store = useDbStore()
  // 监听tab切换
  watch(
    () => props.type,
    (value: string) => {
      if (value === 'Mysql') clearFormInfo(ruleFormRef.value)
    }
  )
  // 表示db 连接状态
  const isDbConnect = computed<boolean>(() => store.isDbConnect)

  return {
    dbInfo,
    rules,
    ruleFormRef,
    commitFormInfo: commitFormInfo(isDbConnect),
    clearFormInfo,
    isDbConnect,
    setMockDataHandle,
    loadingFlags
  }
}
