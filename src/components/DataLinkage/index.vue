<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'
import { linkageHack } from '@/components/DataLinkage/linkage-hack'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:modelValue'])

// 表示导出数据
const {
  showFlag,
  tableList,
  dataSourceInfo,
  tableChangeHandle,
  tableFieldInfos
} = linkageHack(props, emits)
</script>

<template>
  <el-drawer
    v-model="showFlag"
    :close-on-click-modal="false"
    :with-header="false"
    :size="400"
  >
    <el-result icon="success" title="配置数据源" />
    <div class="step">DB 表</div>
    <div class="container">
      <el-select
        placeholder="请选择表"
        size="large"
        @change="tableChangeHandle"
        v-model="dataSourceInfo.table"
      >
        <el-option
          v-for="(item, key) in tableList"
          :key="key"
          :label="item.tableComment"
          :value="item.tableName"
        />
      </el-select>
    </div>
    <div class="step">表 属性</div>
    <div class="container">
      <div class="checkbox-container">
        <el-scrollbar>
          <el-checkbox-group v-model="dataSourceInfo.tableField">
            <el-checkbox
              v-for="item in tableFieldInfos"
              :key="item.fieldName"
              :label="item.fieldName"
              >{{ item.fieldComment }}
            </el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </div>
    <div class="step">其他设置</div>
    <div class="container">
      <div class="part">
        <span>请求次数</span>
        <el-input
          type="number"
          v-model="dataSourceInfo.loopCounter"
          placeholder="请输入请求频次"
          clearable
        />
        <el-tooltip
          placement="top"
          effect="dark"
          content="什么是请求频次呢？可以模拟请求，按照个数不停的请求"
        >
          <div class="flags">?</div>
        </el-tooltip>
      </div>
      <div class="part">
        <span>频次间隔(s)</span>
        <el-input
          type="number"
          v-model="dataSourceInfo.loopTime"
          placeholder="请输入频次间隔(以秒为单位)"
          clearable
        />
        <el-tooltip
          placement="top"
          effect="dark"
          content="什么是频次间隔呢？每次触发请求的间隔时间"
        >
          <div class="flags">?</div>
        </el-tooltip>
      </div>
    </div>
    <div class="container btns">
      <button>保存</button>
    </div>
  </el-drawer>
</template>

<style lang="less" scoped>
.container {
  padding: 15px 20px;

  ::v-deep(.el-select) {
    width: 100%;
  }

  .part {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-bottom: 10px;

    > span {
      width: 100px;
      display: inline-block;
    }

    > .flags {
      color: red;
      font-weight: bold;
      font-size: 20px;
      margin-left: 10px;
    }
  }
}

.btns {
  margin-top: 20px;

  button {
    background: #0b71e6;
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 0;
    cursor: pointer;
    border-radius: 6px;
  }
}

.step {
  color: #ffffff;
  font-size: 16px;
  height: 20px;
  font-style: italic;
  display: flex;

  &:before {
    display: inline-block;
    content: '';
    width: 6px;
    height: 100%;
    background: #0b71e6;
    margin-right: 3px;
  }
}

.checkbox-container {
  border: 1px solid #4c4d4f;
  padding: 20px 30px;
  border-radius: 3px;
  height: 200px;

  ::v-deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
  }
}
</style>
