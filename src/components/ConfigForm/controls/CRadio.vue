<!--
 * @Author: zhangm
 * @Date: 2022-10-17 19:23:52
 * @LastEditTime: 2022-10-17 19:25:50
 * @LastEditors: zhangm
 * @Description: 
 * @FilePath: \visual-data\src\components\ConfigForm\controls\CRadio.vue
-->
<template>
  <el-radio-group v-bind="selectProps" :model-value="value">
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
    </el-radio-group>
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