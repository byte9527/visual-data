<template>
  <div class="control-wrapper" v-if="state.renderData.show !== false">
    <span class="control-title" v-if="state.showName">
      {{ state.renderData.name }}
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
import { reactive, computed, inject, toRaw, onMounted, watch } from "vue";
import { getComponent, showTitle } from "./controlManager";
import { configHandle } from "./configHandle";
import get from "lodash/get";
import option from "../utils/option";

const props = defineProps({
  valuePath: {
    type: [String, Boolean],
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

const formValue = inject("formValue");
const context = inject("context");

const componentProps = computed(() => {
  const { show, type, props: componentProps, ...rest } = props.configData;
  return { ...rest, ...componentProps };
});

interface config {
  config: Object;
  deps: Array<string>
}

const handleConfig = ():config => {
  const data = {};

  const newData = configHandle(
    toRaw(props.configData),
    {
      form: data,
      ...(context as cForm.AnyKeyObject),
    },
    {}, // util
    {}
  );
  return newData;
};

const options = handleConfig();

const state = reactive({
  value: get(formValue, props.valuePath as any),
  renderData: options.config,
  showName: showTitle(props.configData.type) && !props.configData.hideName,
});

onMounted(() => {
  if (options.deps.length) {
    const watchSource = options.deps.map(item => {
      return () => {
        return get(formValue, item.replace("form", ""))
      }
    })
    watch(watchSource, () => {
      state.renderData = handleConfig()
    
    })
  }
})

const valueChange = (val) => {
  state.value = val
};

const initSearcher = () => {};

const responseSearch = () => {};
</script>

<style lang="scss" scoped>
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
