<script lang="ts" setup>
// 表示编辑器
import { onMounted, reactive, ref } from 'vue'
import { IDataSourceTarget, IEmitterTypes } from '@/types'
import { useDbStore } from '@/store/DbStore'
import { ElNotification } from 'element-plus'
import { execSqlReq } from '@/api'
import { emitter } from '@/utils'

let editor: {
  setTheme: (arg0: string) => void
  setValue: (value: any) => void
  getValue: () => any
  session: { setMode: (arg0: string) => void }
} | null = null
let resultEditor: {
  setTheme: (arg0: string) => void
  setValue: (value: any) => void
  getValue: () => any
  session: { setMode: (arg0: string) => void }
} | null = null
// 表示数据源类型
const dataSourceTypes = reactive<{ label: string; value: IDataSourceTarget }[]>(
  []
)
// 表示选中的数据源
const activeDataSource = ref<IDataSourceTarget>(IDataSourceTarget.MYSQL)
const store = useDbStore()
// 表示sql执行状态
const sqlExecFlags = ref<boolean>(false)

/**
 * @author lihh
 * @description 表示执行sql
 */
const execSqlHandle = async () => {
  const sql = editor!.getValue()
  if (!sql) {
    ElNotification.error('请输入sql')
    return
  }

  sqlExecFlags.value = true
  const res = await execSqlReq(sql)
  sqlExecFlags.value = false
  if (res.code !== 200) {
    ElNotification.error('sql执行失败')
    console.error(res)
    return
  }

  // 告诉其他组件已经查询出来了
  emitter.emit(IEmitterTypes.SQL_QUERY_RESULT, JSON.stringify(res.data))
  // 设置显示内容
  resultEditor!.setValue(JSON.stringify(res.data, null, 2))
}

/**
 * @author lihh
 * @description 从store中获取数据源的类型
 */
const getSourceTypeByStore = () => {
  const { dataSources } = store
  for (const dataSourcesKey in dataSources) {
    const value = dataSourcesKey as IDataSourceTarget
    dataSourceTypes.push({ value, label: dataSources[value].name })
  }
}

onMounted(() => {
  editor = ace.edit('editor_querySql')

  // 表示识别模板 可以识别JavaScript
  editor!.setTheme('ace/theme/monokai')
  editor!.session.setMode('ace/mode/sql')

  resultEditor = ace.edit('editor_queryResult')

  // 表示识别模板 可以识别JavaScript
  resultEditor!.setTheme('ace/theme/monokai')
  resultEditor!.session.setMode('ace/mode/json')

  // 获取数据源的类型
  getSourceTypeByStore()
})
</script>

<template>
  <div class="query-sql-result">
    <div class="part">
      <span>数据源类型: </span>
      <el-select v-model="activeDataSource">
        <el-option
          v-for="item in dataSourceTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div id="editor_querySql"></div>
    <div class="part1">
      <el-button type="primary" class="btn" @click="execSqlHandle" plain round
        >{{ sqlExecFlags ? '执行中...' : '执行SQL' }}
      </el-button>
    </div>
    <div id="editor_queryResult"></div>
  </div>
</template>

<style lang="less" scoped>
.split {
  background: #2d2f38;
  padding: 10px 5px;
  font-size: 13px;
  margin: 10px 0px 20px 0px;
  border-radius: 5px;
}

.part1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.btn {
  margin-top: 10px;
}

.part {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  span {
    font-size: 14px;
    margin-right: 20px;
    font-style: italic;
  }

  ::v-deep(.el-select) {
    flex: 1;
  }
}

#editor_querySql {
  height: 100px;
  margin-top: 20px;
}

#editor_queryResult {
  height: 300px;
  margin-top: 20px;
}
</style>
