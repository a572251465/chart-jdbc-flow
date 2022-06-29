<script lang="ts" setup>
import { ref, watch } from 'vue'
import Left from './components/Left'
import Right from './components/Right'
import defaultBlocks from './editor-data'
import { IBlockItem } from '@/types'

// 表示所有的block item
const allBlockItem = ref<IBlockItem[]>(defaultBlocks)

watch(
  allBlockItem,
  (value) => {
    console.log(value)
  },
  { deep: true }
)
</script>

<template>
  <div class="drag full-height">
    <Left v-model="allBlockItem" />
    <Right v-model="allBlockItem" />
  </div>
</template>

<style lang="less" scoped>
.drag {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
}
</style>
