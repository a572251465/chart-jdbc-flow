<script lang="ts" setup>
const enum IIconTypes {
  PREVIEW = 'PREVIEW',
  FULLSCREEN = 'FULLSCREEN'
}

const icons = [
  { icon: 'icon-yulan', type: IIconTypes.PREVIEW, tips: '时时预览' },
  { icon: 'icon-quanping', type: IIconTypes.FULLSCREEN, tips: '全屏' }
]
</script>

<template>
  <ul class="drag-footer">
    <li v-for="item in icons" :key="item.type">
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
    margin: 0 15px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
