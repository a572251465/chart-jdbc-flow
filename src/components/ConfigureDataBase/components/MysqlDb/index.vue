<script lang="ts" setup>
import { mysqlHack } from '@/components/ConfigureDataBase/components/MysqlDb/mysql-hack'

const props = defineProps({
  // 表示默认类型
  type: {
    type: String,
    default: ''
  }
})

// 导出数据
const {
  clearFormInfo,
  commitFormInfo,
  dbInfo,
  ruleFormRef,
  rules,
  isDbConnect,
  setMockDataHandle,
  loadingFlags
} = mysqlHack(props)
</script>

<template>
  <div class="mysql-db">
    <el-result
      :icon="isDbConnect ? 'success' : 'info'"
      :title="isDbConnect ? '连接成功' : '未连接'"
    />
    <el-form
      ref="ruleFormRef"
      :model="dbInfo"
      label-position="left"
      :rules="rules"
      size="large"
      label-width="90px"
      status-icon
    >
      <el-form-item label="host" prop="host">
        <el-input v-model="dbInfo.host" />
      </el-form-item>
      <el-form-item label="user" prop="user">
        <el-input v-model="dbInfo.user" />
      </el-form-item>
      <el-form-item label="password" prop="password">
        <el-input type="password" v-model="dbInfo.password" />
      </el-form-item>
      <el-form-item label="database" prop="database">
        <el-input v-model="dbInfo.database" />
      </el-form-item>
      <el-form-item label="port" prop="port">
        <el-input v-model="dbInfo.port" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="commitFormInfo(ruleFormRef)"
          >{{ loadingFlags ? '校验中' : '连接' }}
        </el-button>
        <el-button @click="clearFormInfo(ruleFormRef)">重置</el-button>
        <el-button link type="primary" @click="setMockDataHandle"
          >模拟接口
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
.mysql-db {
  padding: 0px 10px;
}
</style>
