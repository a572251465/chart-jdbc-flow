<script lang="ts" setup>
import { defineEmits, defineProps, watch } from 'vue'
import { connectDbHack } from '@/components/ConnectDb/connectDb-hack'
import { VuDialog } from 'vu-design-plus'

// 参数
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])

const {
  showFlag,
  clearFormInfo,
  commitFormInfo,
  dbInfo,
  ruleFormRef,
  rules,
  dbSourceList
} = connectDbHack(props, emits)

// 监听弹框变化
watch(
  () => props.modelValue,
  (value: boolean) => {
    if (!value) clearFormInfo(ruleFormRef.value)
  }
)
</script>

<template>
  <VuDialog v-model="showFlag" title="配置数据源" :width="500" :existBtns="[]">
    <div class="mysql-db">
      <el-form
        ref="ruleFormRef"
        :model="dbInfo"
        label-position="left"
        :rules="rules"
        size="large"
        label-width="100px"
        status-icon
      >
        <el-form-item label="数据源">
          <el-select placeholder="选择数据源" v-model="dbInfo.dbTarget">
            <el-option
              v-for="item in dbSourceList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据库别名" prop="name">
          <el-input placeholder="请输入数据库别名" v-model="dbInfo.name" />
        </el-form-item>
        <el-form-item label="连接地址" prop="host">
          <el-input placeholder="请输入连接地址(host)" v-model="dbInfo.host" />
        </el-form-item>
        <el-form-item label="用户名" prop="user">
          <el-input placeholder="请输入用户名(user)" v-model="dbInfo.user" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            placeholder="请输入密码(password)"
            type="password"
            v-model="dbInfo.password"
          />
        </el-form-item>
        <el-form-item label="数据库" prop="database">
          <el-input
            placeholder="请输入数据库(database)"
            v-model="dbInfo.database"
          />
        </el-form-item>
        <el-form-item label="端口号" prop="port">
          <el-input placeholder="请输入端口号(port)" v-model="dbInfo.port" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            plain
            @click="commitFormInfo(ruleFormRef, 1)"
            >测试连接</el-button
          >
          <el-button type="primary" @click="commitFormInfo(ruleFormRef, 2)"
            >保存信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </VuDialog>
</template>

<style lang="less" scoped></style>
