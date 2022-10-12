<template>
  <div class="control-wrapper">
    <span class="control-title" v-show="configData.showInPanel !== false">
      {{ configData.name }}
    </span>
    <div class="control-content">
      <component
      :is="componentDefine"
      v-bind="componentProps"
      :value="state.value"
      @change="valueChange"
    ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { getComponent } from "../core/controlManager";

const props = defineProps({
  valuePath: {
    type: String,
    default: "",
  },
  configData: {
    type: Object,
    required: true,
    default() {
      return {};
    },
  },
});

const componentDefine = getComponent(props.configData.type);

const componentProps = computed(() => {
  const { showInPanel, type, ...rest } = props.configData;
  return rest;
});

const state = reactive({
  value: "",
});

const valueChange = () => {};

const initSearcher = () => {};

const responseSearch = () => {};
</script>

<style lang='scss' scoped>
</style>

