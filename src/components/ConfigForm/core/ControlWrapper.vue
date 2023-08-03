<template>
  <div class="control-wrapper" v-if="state.renderData.show !== false">
    <span class="control-title" v-if="state.showName">
      {{ state.renderData.name }}
    </span>
    <div class="control-content">
      <component
        v-bind="componentProps"
        :is="componentDefine"
        :value="state.value"
        :model-value="state.value"
        :value-path="keyPath"
        @change="valueChange"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, inject, toRaw, onMounted, watch } from "vue";
import {
  getComponent,
  showTitle,
} from "./controlManager";
import { configHandle } from "./configHandle";
import { deepGet } from "../utils/proxyHelp";

const props = defineProps({
  keyPath: {
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
const formBus = inject("formBus");

const componentProps = computed(() => {
  const { show, type, props: componentProps, ...rest } = props.configData;
  return { ...rest, ...componentProps };
});

interface config {
  config: Object;
  deps: Array<string>;
}

const handleConfig = (): config => {
  const data = {};

  const newData = configHandle(
    toRaw(props.configData),
    {
      form: formValue,
      ...(context as cForm.AnyKeyObject),
    },
    {}, // util
    {}
  );
  return newData;
};

const options = handleConfig();

const state = reactive({
  value: deepGet(formValue, props.keyPath),
  renderData: options.config,
  showName: showTitle(props.configData.type) && !props.configData.hideName,
});

onMounted(() => {
  if (options.deps.length) {
    const watchSource = options.deps.map((item) => {
      return () => {
        return deepGet(formValue, item.replace("form.", ""));
        // let func = new Function('form', `return ${item}`)
        // return func(formValue)
      };
    });
    watch(watchSource, () => {
      const opt = handleConfig();
      state.renderData = opt.config;
    });
  }
});

const valueChange = (val) => {
  if (val instanceof Event) {
    return
  }

  state.value = val;
  formBus.emit("fieldChange", { keyPath: props.keyPath, value: val });
};

const initSearcher = () => {};

const responseSearch = () => {};
</script>

<style lang="scss" scoped>

$titleWidth: 80px;
.control-wrapper {
  display: flex;

  .control-title {
    width: $titleWidth;
    min-width: $titleWidth;
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
