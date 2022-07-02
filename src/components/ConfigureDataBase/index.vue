<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { configureHack } from './configure-hack'
import MysqlDb from '@/components/ConfigureDataBase/components/MysqlDb/index.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue'])

// hack方法
const { showFlag, dbType } = configureHack(props, emits)
</script>

<template>
  <el-drawer
    v-model="showFlag"
    :close-on-click-modal="false"
    :with-header="false"
    :size="400"
  >
    <div class="configure-database">
      <el-tabs v-model="dbType" type="card">
        <el-tab-pane label="Mysql" name="Mysql">
          <MysqlDb :type="dbType" />
        </el-tab-pane>
        <el-tab-pane label="Mock" name="Mock">Config</el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
