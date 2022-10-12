<template>
  <div class="c-group" :class="{ 'c-group--noHeader': hideHeader }">
    <el-collapse v-if="!hideHeader">
      <el-collapse-item :title="title" name="1">
        <div
          v-for="(item, key) in children"
          v-show="item.showInPanel !== false"
          :key="key"
          class="control-item control-item-el-collapse"
        >
          <span
            v-show="item.name"
            :class="[
              'control-item__label',
              item.name.length > 4 ? 'label-wrap' : '',
            ]"
            >{{ item.name }}</span
          >
          <div class="control-item__control-wrap">
            <ControlWrapper
              v-for="(item, key) in children"
              class="control-wrap"
              :config-data="item"
              :key="key"
            ></ControlWrapper>
          </div>
        </div>
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
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang='scss' scoped>
</style>
