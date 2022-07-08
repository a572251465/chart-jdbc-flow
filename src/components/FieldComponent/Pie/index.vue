<script lang="ts" setup>
import { reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { emitter } from '@/utils'
import { IEmitterTypes } from '@/types'
import { currentSelectedBlock, getSelectedBlock } from '@/utils/editor'

interface IOptions {
  label: string
  value: string
}

// 传递参数
const props = defineProps({
  sqlRes: {
    type: String,
    default: '[]'
  }
})

// 表示下拉框中的值
const selectList = reactive<IOptions[]>([])
// 表示下拉选中的值
const fields = reactive({
  x: '',
  s: ''
})
// 表示查询数据
const sqlQueryResult = reactive<Record<string, any>[]>([])

// 使用发布订阅 监听查询结果
// @ts-ignore
emitter.on<IEmitterTypes>(IEmitterTypes.SQL_QUERY_RESULT, (value: string) => {
  const arr = JSON.parse(value) as Record<string, any>[]
  if (arr.length === 0) return

  sqlQueryResult.push(...arr)
  resolvePropsDataHandle()
})

/**
 * @author lihh
 * @description 映射图表数据
 */
const mappingChartDataHandle = () => {
  debugger
  if (!fields.s || !fields.x) {
    ElNotification.error('请选择类型或是值')
    return
  }

  // 开始匹配数据
  const { x, s } = fields,
    result = [] as { value: any; name: string }[]
  sqlQueryResult.forEach((item) => {
    result.push({
      value: item[s],
      name: item[x]
    })
  })

  const currentSelectedBlock = getSelectedBlock()
  emitter.emit(IEmitterTypes.BLOCK_DATA_EDITOR, [
    JSON.stringify(result),
    currentSelectedBlock.createDomId
  ])
}

/**
 * @author lihh
 * @description 解析props 传递的结果
 */
const resolvePropsDataHandle = () => {
  selectList.length = 0
  Object.keys(sqlQueryResult[0]).forEach((keyName) => {
    selectList.push({ label: keyName, value: keyName })
  })
}
</script>

<template>
  <ul class="pie">
    <li class="pie-head">
      <div>字段</div>
      <div>映射</div>
      <div>说明</div>
    </li>
    <li class="pie-head pie-list">
      <div>x</div>
      <el-select v-model="fields.x" placeholder="请选择展示的类目">
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
      <div>类目</div>
    </li>
    <li class="pie-head pie-list">
      <div>s</div>
      <el-select v-model="fields.s" placeholder="请选择展示的值">
        <el-option
          v-for="item in selectList"
          :key="item.value"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
      <div>值</div>
    </li>
  </ul>
  <el-button class="btn" @click="mappingChartDataHandle"
    >映射为图表数据
  </el-button>
</template>

<style lang="less" scoped>
.btn {
  display: block;
  margin: 0px auto;
  margin-bottom: 20px;
}

.pie {
  margin-bottom: 20px;

  &-list {
    background: none !important;
  }

  &-head {
    background: black;
    border-top: 1px solid #1b1c1f;
    border-bottom: 1px solid #1b1c1f;
    display: flex;
    width: 100%;

    & > div {
      text-align: center;
      padding: 10px 0;
      font-size: 13px;
    }

    & > div:nth-child(1) {
      width: 25%;
    }

    & > div:nth-child(2) {
      flex: 1;
    }

    & > div:nth-child(3) {
      width: 25%;
    }
  }
}
</style>
