<script lang="ts" setup>
import { computed, ref } from 'vue'
import Left from './components/Left'
import Right from './components/Right'
import DragFooter from '@/components/DragFooter/index.vue'
import defaultBlocks from './editor-data'
import { IBlockItem } from '@/types'
import { useGlobalStore } from '@/store/GlobalStore'

// 表示所有的block item
const allBlockItem = ref<IBlockItem[]>(defaultBlocks)
// store数据
const globalStore = useGlobalStore()
// 表示是否全屏
const isFullScreen = computed<boolean>(() => globalStore.isFullScreen)
</script>

<template>
  <div class="drag full-height">
    <div class="drag-top">
      <Left v-model="allBlockItem" />
      <Right v-model="allBlockItem" />
    </div>
    <transition name="fade">
      <div class="drag-bottom" v-show="!isFullScreen">
        <DragFooter />
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
/* 动画区域 */
@keyframes fade-in {
  from {
    height: 0px;
  }
  to {
    height: 40px;
  }
}

.fade-enter-active {
  animation: fade-in 0.2s ease-in-out normal forwards;
}

.fade-leave-active {
  animation: fade-in 0.2s ease-in-out forwards reverse;
}

.drag {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-top {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    flex: 1;
  }

  &-bottom {
    background: black;
    height: 40px;
    margin-top: 10px;
  }
}
</style>
