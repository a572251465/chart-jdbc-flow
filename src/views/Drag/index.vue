<script lang="ts" setup>
import Left from './components/Left'
import Right from './components/Right'
</script>

<template>
  <div class="drag full-height">
    <Left />
    <Right />
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
