<script lang="ts" setup>
// 表示导航列表内容
const navList = [
  {
    type: 'database',
    icon: 'icon-shujuyuan',
    tips: '配置数据源'
  },
  {
    type: 'drag',
    icon: 'icon-tuozhuai',
    tips: '拖拽图表'
  },
  {
    type: 'setting',
    icon: 'icon-shezhi',
    tips: '预设置'
  }
]
</script>

<template>
  <div class="leftNav">
    <ul>
      <li v-for="item in navList" :key="item.type">
        <el-tooltip :content="item.tips" placement="top">
          <i class="iconfont" :class="item.icon"></i>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
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
