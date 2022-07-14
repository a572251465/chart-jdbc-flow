<script lang="ts" setup>
import { INormalFn } from '@/types'
import { useGlobalStore } from '@/store/GlobalStore'
import { ElNotification } from 'element-plus'

const enum IIconTypes {
  PREVIEW = 'PREVIEW',
  FULLSCREEN = 'FULLSCREEN'
}

// 表示store仓库
const globalStore = useGlobalStore()

/**
 * @author lihh
 * @description 预览处理
 */
const previewHandle = () => {}

/**
 * @author lihh
 * @description 全屏处理
 */
const fullScreenHandle = () => {
  globalStore.editStoreField({ isFullScreen: true })
  ElNotification.success('设置全屏成功, esc键返回')
}

// 表示方法策略
const fnStrategy: Record<IIconTypes, INormalFn> = {
  [IIconTypes.PREVIEW]: previewHandle,
  [IIconTypes.FULLSCREEN]: fullScreenHandle
}

const icons = [
  { icon: 'icon-yulan', type: IIconTypes.PREVIEW, tips: '时时预览' },
  { icon: 'icon-quanping', type: IIconTypes.FULLSCREEN, tips: '全屏' }
]

/**
 * @author lihh
 * @description icon 点击事件
 * @param type 点击类型
 */
const iconClickHandle = (type: IIconTypes) => {
  const fn = fnStrategy[type]
  if (typeof fn === 'function') {
  }
  fn()
}
</script>

<template>
  <ul class="drag-footer">
    <li
      v-for="item in icons"
      :key="item.type"
      @click="iconClickHandle(item.type)"
    >
      <el-tooltip :content="item.tips" placement="top">
        <i class="iconfont" :class="item.icon"></i>
      </el-tooltip>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.drag-footer {
  display: flex;
  justify-content: flex-end;
  padding: 0 50px;
  height: 100%;
  align-items: center;

  i {
    margin: 0 12px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
