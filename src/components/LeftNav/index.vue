<script lang="ts" setup>
import { navList, skipPageHandle, navTransformShowFlag } from './left-nav'
import { onBeforeMount, onMounted, watch } from 'vue'
import { bindDom } from '@/utils'
import { INormalFn } from '@/types'
import { useGlobalStore } from '@/store/GlobalStore'
// 卸载绑定事件
let onBindDom: null | INormalFn = null
// 表示store 仓库
const store = useGlobalStore()

// 监听全屏变化
watch(
  () => store.isFullScreen,
  (value: boolean) => {
    if (!value) navTransformShowFlag.value = true
  }
)

onMounted(() => {
  onBindDom = bindDom(
    window,
    'dblclick',
    (...args) => {
      const event = args[0] as any as MouseEvent
      if (
        navTransformShowFlag.value ||
        event.x > 60 ||
        (event.target as HTMLDivElement).className.includes('leftNav') ||
        store.isFullScreen
      )
        return

      navTransformShowFlag.value = true
    },
    { isThrottle: false }
  )!
})

onBeforeMount(() => typeof onBindDom === 'function' && onBindDom())
</script>

<template>
  <transition name="fade">
    <div
      class="leftNav"
      v-show="navTransformShowFlag && !store.isFullScreen"
      @dblclick.stop="navTransformShowFlag = false"
    >
      <ul>
        <li v-for="item in navList" :key="item.type">
          <el-tooltip :content="item.tips" placement="top">
            <i
              class="iconfont"
              :class="item.icon"
              @click="skipPageHandle(item.type)"
            ></i>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </transition>
</template>

<style lang="less" scoped>
/* 动画区域 */
@keyframes fade-in {
  from {
    width: 0px;
  }
  to {
    width: 60px;
  }
}

.fade-enter-active {
  animation: fade-in 0.2s ease-in-out normal forwards;
}

.fade-leave-active {
  animation: fade-in 0.2s ease-in-out forwards reverse;
}

.leftNav {
  width: 60px;
  height: 100%;
  background: rgba(23, 24, 26, 0.8);

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    height: 60px;
    line-height: 60px;

    i {
      font-size: 25px;
      color: #ffffff;
      cursor: pointer;

      &:hover {
        color: #0b71e6;
      }
    }
  }
}
</style>
