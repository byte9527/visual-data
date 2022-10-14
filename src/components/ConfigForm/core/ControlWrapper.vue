<template>
  <div class="control-wrapper" v-if="configData.showInPanel !== false">
    <span class="control-title" v-if="state.showControlTitle">
      {{ configData.name }}
    </span>
    <div class="control-content">
      <component
      :is="componentDefine"
      :value="state.value"
      :model-value="state.value"
      v-bind="componentProps"
      @change="valueChange"
    ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed } from "vue";
import { getComponent, showTitle } from "../core/controlManager";

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
  const { showInPanel, type, props: componentProps, ...rest } = props.configData;
  return {...rest, ...componentProps};
});

const state = reactive({
  value: "",
  showControlTitle: showTitle(props.configData.type)
});

const valueChange = (val) => {
  state.value = val
};

const initSearcher = () => {};

const responseSearch = () => {};
</script>

<style lang='scss' scoped>

  .control-wrapper {
    display: flex;
    
    .control-title {
      width: 100px;
      min-width: 100px;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 16px;
    }

    .control-content {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
    }
  }
</style>

