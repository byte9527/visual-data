<template>
  <component
    :is="componentType"
    v-bind="componentProps"
    :value="state.value"
    @change="valueChange"
  ></component>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { getComponentTag } from "../core/controlManager";

const props = defineProps({
  valuePath: {
    type: String,
    default: "",
  },
  configData: {
    type: Object,
    default() {
      return {};
    },
  },
});

const componentType = getComponentTag(props.configData.type);

const componentProps = computed(() => {
  const { showInPanel, type, ...rest } = props.configData;
  return rest;
});

const state = reactive({
  value: ''
})

const valueChange = () => {};

const initSearcher = () => {};

const responseSearch = () => {};

</script>

<style lang='scss' scoped>
</style>

