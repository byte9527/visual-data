<template>
  <div class="c-group" :class="{ 'c-group--noHeader': hideHeader }">
    <el-collapse v-if="!hideHeader">
      <el-collapse-item :title="name" name="1">
        <template slot="title">
          <div>
            <el-switch
              v-if="enableHide"
              v-model="value.show"
              size="mini"
              active-text=""
              inactive-text=""
              style="margin-right: 1px"
              class="el-switch--nano"
            />
            <span>{{ name }}</span>
          </div>
        </template>
        <ControlWrapper
          v-for="(item, key) in children"
          class="control-wrap"
          :config-data="item"
          :key="key"
        ></ControlWrapper>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  value: {
    type: Object,
    default() {
      return {};

    },
  },
  children: {
    type: Object,
    default() {
      return {};
    },
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "",
  },
  valuePath: {
    type: [String, Boolean],
    default: "",
  },
  enableHide: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang='scss'>
  .c-group {
    width: 100%;
    .control-wrapper {
      margin-bottom: 8px;
    }
    .el-collapse-item__content {
      padding-bottom: unset;
    }
  }
</style>
