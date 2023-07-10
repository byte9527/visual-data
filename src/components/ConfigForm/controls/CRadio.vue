<template>
  <el-radio-group v-bind="selectProps" :model-value="value">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :model-value="item.value"
    >{{ item.label }}</el-radio>
    </el-radio-group>
</template>

<script lang="ts" setup>
import { computed, useAttrs, ref  } from "vue";

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
  return {...rest, modelValue: props.value};
});

const emit = defineEmits(['change'])


</script>

<style lang='scss' scoped>
</style>