<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 弹框显隐
const showFlag = computed<boolean>({
  get: () => props.modelValue,
  set(value: boolean) {
    emits('update:modelValue', value)
  }
})
</script>

<template>
  <el-drawer v-model="showFlag" :with-header="false" :size="400">
    <div class="configure-database">

      <el-radio-group size="large">
        <el-radio-button label="Mysql" />
        <el-radio-button label="Mysql" />
        <el-radio-button label="Los Mysql" />
        <el-radio-button label="Mysql" />
      </el-radio-group>
    </div>

  </el-drawer>
</template>
