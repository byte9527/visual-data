<template>
  <el-select>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
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
    }
  }
});



</script>

<style lang='scss' scoped>
</style>