<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import { bindDom } from '@/utils'
import { INormalFn } from '@/types'

// 表示head是否显示
const headShowFlag = ref<boolean>(true)
// 表示销毁dom用
let unBindDom: INormalFn | null = null

onMounted(() => {
  // 监听window 双击事件
  unBindDom = bindDom(window, 'dblclick', (...args) => {
    const e = args[0] as MouseEvent
    if (Reflect.has(e, 'y') && !headShowFlag.value) {
      const { y } = e
      if (y <= 40) headShowFlag.value = true
    }
  })!
})

onBeforeMount(() => {
  typeof unBindDom === 'function' && unBindDom()
})
</script>

<template>
  <transition name="fade">
    <div
      class="header"
      v-show="headShowFlag"
      @dblclick.stop="headShowFlag = false"
    ></div>
  </transition>
</template>

<style lang="less" scoped>
@import '@/assets/css/constant.less';

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

.header {
  height: @headHeight;
  background: #090a0a;
}
</style>
