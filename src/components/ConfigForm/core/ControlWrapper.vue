<template>
  <div class="control-wrapper" v-if="renderData.show !== false" :style="configData.style">
    <span class="control-title" v-if="showName">
      {{ renderData.name }}
    </span>
    <div class="control-content">
      <component
        v-bind="componentProps"
        :is="componentDefine"
        :value="controlValue"
        :modelValue="controlValue"
        :valuePath="keyPath"
        @change="valueChange"
      ></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  reactive,
  computed,
  inject,
  toRaw,
  ref,
  unref,
  onMounted,
  watch,
} from 'vue';
import { getComponent, getComponentConfig, showTitle } from './controlManager';
import { configHandle } from './configHandle';
import { deepGet } from '../utils/proxyHelp';
import cloneDeep from 'lodash/cloneDeep';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  keyPath: {
    type: [String, Boolean],
    default: '',
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
const componentConfig = getComponentConfig(props.configData.type);

const rootForm = inject('rootForm');
const context = inject('context');
const formBus = inject('formBus');

const formValue = computed(() => {
  return (rootForm as any).stateValue;
});

const componentProps = computed(() => {
  const defaultProps =
    componentConfig.defaultProps && componentConfig.defaultProps();
  const { show, type, props: componentProps, style, ...rest } = props.configData;
  return { ...rest, ...defaultProps, ...componentProps };
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
      form: formValue.value,
      ...(context as cForm.AnyKeyObject),
    },
    {}, // util
    {},
  );
  return newData;
};

const options = handleConfig();

const renderData = ref(options.config);
const controlValue = ref(deepGet(formValue.value, props.keyPath));
const showName = showTitle(props.configData.type) && !props.configData.hideName;

onMounted(() => {
  if (options.deps.length) {
    const watchSource = options.deps.map((item) => {
      return () => {
        return deepGet(formValue.value, item.replace('form.', ''));
      };
    });
    watch(watchSource, () => {
      const opt = handleConfig();
      renderData.value = opt.config;
    });
  }
  watch(formValue,
    () => {
      controlValue.value = deepGet(formValue.value, props.keyPath);
    },
  );
});

const valueChange = (val) => {
  if (val instanceof Event) {
    return;
  }

  controlValue.value = val;
  formBus.emit('fieldChange', { keyPath: props.keyPath, value: val });
};
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
    > div {
      width: 100%;
    }
  }
}
</style>
