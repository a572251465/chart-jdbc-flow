<script lang="ts" setup>
import { ref } from 'vue'
import QuerySqlResult from '@/components/QuerySqlResult/index.vue'

// 设置scroll height
const h = ref<number>(window.screen.height - 200)
</script>

<template>
  <div class="data-config">
    <el-scrollbar :height="h">
      <QuerySqlResult />
    </el-scrollbar>
  </div>
</template>

<style lang="less" scoped></style>
