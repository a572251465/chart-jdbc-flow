<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from 'vue'
import { dataSourceHack } from './dataSource-hack'
import JsonEditor from '@/components/JsonEditor/index.vue'
import { IBlockItem } from '@/types'
import ChartDataConfig from '@/components/ChartDataConfig/index.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  currentEditorBlock: {
    type: Object as PropType<IBlockItem>,
    default: () => ({})
  }
})
const emits = defineEmits(['update:modelValue'])

// hack方法
const {
  showFlag,
  activeTab,
  jsonEditorStyles,
  transformCodeContent,
  saveContentCallback
} = dataSourceHack(props, emits)
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
        <el-tab-pane label="JSON" name="JSON">
          <div :style="jsonEditorStyles">
            <JsonEditor
              :content="transformCodeContent"
              @on-save="saveContentCallback"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="DB" name="DB">
          <ChartDataConfig />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
