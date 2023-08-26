<template>
    <el-input  v-model="currentValue" @blur="change"></el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


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
</script>

<style lang="scss" scoped></style>
