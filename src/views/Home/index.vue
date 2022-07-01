<script lang="ts" setup>
import Header from '@/components/Header/index.vue'
import LeftNav from '@/components/LeftNav/index.vue'
</script>

<template>
  <div class="home-container full-height">
    <Header></Header>
    <div class="home-container-body">
      <LeftNav />
      <router-view name="container"></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/assets/css/constant.less';

.home-container {
  display: flex;
  flex-direction: column;
}

.home-container-body {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
</style>
