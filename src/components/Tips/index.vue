<script lang="ts" setup>
import { jsonEditorTips } from '@/utils'
</script>

<template>
  <div class="tips" v-show="jsonEditorTips.length > 0">
    <h4>WARNING</h4>
    <ul>
      <li class="content" v-for="(item, key) in jsonEditorTips" :key="key">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.tips {
  padding: 3px 16px;
  background-color: rgba(245, 108, 108, 0.3);
  border-radius: 4px;
  border-left: 5px solid #f56c6c;
  margin: 20px 0;

  h4 {
    padding: 10px 0;
    margin: 0;
  }

  .content {
    font-size: 12px;
    margin: 3px 3px 3px 13px;
    list-style: square;
    list-style: unset;
  }
}
</style>
