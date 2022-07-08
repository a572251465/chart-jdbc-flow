<script lang="ts" setup>
import { computed, ref } from 'vue'
import QuerySqlResult from '@/components/QuerySqlResult/index.vue'
import { componentStrategy } from '@/components/FieldComponent/index'
import { getCurrentComponentType } from '@/utils/editor'

// 设置scroll height
const h = ref<number>(window.screen.height - 200)
// 表示当前点击的组件分类
const componentType = getCurrentComponentType()
// 计算当前渲染的组件
const RenderComponent = computed(() => {
  return componentStrategy[componentType.value]
})
</script>

<template>
  <div class="data-config">
    <el-scrollbar :height="h">
      <component :is = "RenderComponent"></component>
      <QuerySqlResult />
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped></style>
