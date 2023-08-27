<template>
  <el-radio-group v-bind="selectProps" :model-value="currentValue" @change="change">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.value"
      :model-value="item.value"
    >{{ item.label }}</el-radio>
    </el-radio-group>
</template>

<script lang="ts" setup>
import { computed, useAttrs, ref } from 'vue';
// defineOptions({
//   inheritAttrs: false
// })
const props = defineProps({
  value: {
    type: [String, Number, Array, Boolean, Object]
  },
  options: {
    type: Object,
    default() {
      return {};  
    }
  }
});

const attrs = useAttrs()

const selectProps = computed(() => {
  const { options, ...rest } = attrs;
  return { ...rest, modelValue: props.value };
});

const emit = defineEmits(['change']);

const currentValue = ref(props.value);

const change = (val) => {
  if (val !== currentValue.value) {
    emit('change', val);
    currentValue.value = val
  }
};

</script>

<style lang='scss' scoped>

</style>