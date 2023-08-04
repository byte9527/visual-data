<template>
  <el-select v-bind="selectProps" :model-value="value">
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { computed, useAttrs  } from "vue";

const props = defineProps({
  value: {
    type: [String, Number, Array, Boolean, Object],
  },
  options: {
    type: Object,
    default() {
      return {};  
    },
  },
});

const attrs = useAttrs()

const selectProps = computed(() => {
  const { options, ...rest } = attrs;
  return rest;
});

</script>

<style lang='scss' scoped>
</style>