<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { dataSourceHack } from './dataSource-hack'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue'])

// hack方法
const { showFlag, activeTab } = dataSourceHack(props, emits)
</script>

<template>
  <el-drawer
    v-model="showFlag"
    :close-on-click-modal="false"
    :with-header="false"
    :size="400"
  >
    <div class="configure-database">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="JSON" name="JSON"> </el-tab-pane>
        <el-tab-pane label="DB" name="DB">Config</el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
