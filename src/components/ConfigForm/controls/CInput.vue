<template>
    <el-input v-bind="inputOptions"  v-model="currentValue" @blur="change"></el-input>
</template>

<script lang="ts" setup>
import { ref, useAttrs, computed, watchEffect } from 'vue';
defineOptions({
  inheritAttrs: false
})


const props = defineProps({
  value: {
    type: [String, Number, Array, Boolean, Object]
  },
});

const emit = defineEmits(['change']);

const currentValue = ref(props.value);

const change = (e) => {
  const val = e.target.value
  if (val !== currentValue.value) {
    emit('change', val);
  }
};

watchEffect(() => {
  currentValue.value = props.value
})

const attrs = useAttrs()
const inputOptions = computed(() => {
  const { modelValue, ...rest } = attrs;
  return { ...rest };
});

</script>

<style lang="scss" scoped></style>
