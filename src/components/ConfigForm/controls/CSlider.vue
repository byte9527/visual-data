<template>
    <el-slider v-bind="options" v-model="currentValue" @change="change"></el-slider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
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

const change = (val) => {
  if (val !== currentValue.value) {
    emit('change', val);
  }
};
</script>

<style lang="scss" scoped></style>