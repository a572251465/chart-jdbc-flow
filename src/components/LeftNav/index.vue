<script lang="ts" setup>
import {
  navList,
  skipPageHandle,
  configureDbShowFlag,
  navTransformShowFlag
} from './left-nav'
import ConfigureDataBase from '@/components/ConfigureDataBase/index.vue'
import { onBeforeMount, onMounted } from 'vue'
import { bindDom } from '@/utils'
import { INormalFn } from '@/types'
// 卸载绑定事件
let onBindDom: null | INormalFn = null

onMounted(() => {
  onBindDom = bindDom(
    window,
    'dblclick',
    (...args) => {
      const event = args[0] as any as MouseEvent
      if (
        navTransformShowFlag.value ||
        event.x > 60 ||
        (event.target as HTMLDivElement).className.includes('leftNav')
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
      v-show="navTransformShowFlag"
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

  <!-- 配置数据源弹框 -->
  <ConfigureDataBase v-model="configureDbShowFlag" />
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
  border-radius: 0 10px 10px 0;

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
