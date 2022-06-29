import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

// 表示db信息
const dbInfo = reactive({
  ip: '',
  host: '',
  password: '',
  type: ''
})
// 表单实例
const ruleFormRef = ref<FormInstance>()
// 表示验证规则
const rules = reactive<FormRules>({
  ip: [{ required: true, message: '请输入IP', trigger: 'blur' }]
})

export { dbInfo, ruleFormRef }
