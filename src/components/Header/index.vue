<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { bindDom } from '@/utils'
import { INormalFn } from '@/types'
import { useGlobalStore } from '@/store/GlobalStore'

// 表示head是否显示
const headShowFlag = ref<boolean>(true)
// 表示销毁dom用
let unBindDom: INormalFn | null = null
// 表示store 仓库
const store = useGlobalStore()

// 进行watch数据监听
watch(
  () => store.isFullScreen,
  (value: boolean) => {
    if (!value) headShowFlag.value = true
  }
)

onMounted(() => {
  // 监听window 双击事件
  unBindDom = bindDom(window, 'dblclick', (...args) => {
    const e = args[0] as MouseEvent
    // 全屏模式 触发通过双击显示
    if (Reflect.has(e, 'y') && !headShowFlag.value && !store.isFullScreen) {
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
      v-show="headShowFlag && !store.isFullScreen"
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
