<template>
  <el-select v-bind="selectProps">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed } from "vue-demi";

const props = defineProps({
  value: {
    type: Object,
    default() {
      return {};
    },
  },
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});

const selectProps = computed(() => {
  const { options, ...rest } = props;
  return rest;
});
</script>

<style lang='scss' scoped>
</style>