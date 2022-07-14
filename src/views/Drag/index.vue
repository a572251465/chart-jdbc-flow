<script lang="ts" setup>
import { ref } from 'vue'
import Left from './components/Left'
import Right from './components/Right'
import DragFooter from '@/components/DragFooter/index.vue'
import defaultBlocks from './editor-data'
import { IBlockItem } from '@/types'

// 表示所有的block item
const allBlockItem = ref<IBlockItem[]>(defaultBlocks)
</script>

<template>
  <div class="drag full-height">
    <div class="drag-top">
      <Left v-model="allBlockItem" />
      <Right v-model="allBlockItem" />
    </div>
    <div class="drag-bottom">
      <DragFooter />
    </div>
  </div>
</template>

<style lang="less" scoped>
.drag {
  width: 100%;

  &-top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    height: calc(100% - 50px);
  }

  &-bottom {
    background: black;
    height: 40px;
    margin-top: 10px;
  }
}
</style>
