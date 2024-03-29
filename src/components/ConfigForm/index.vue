<template>
  <div class="config-form">
    <ControlWrapper
      v-for="(item, key) in renderData"
      :key="key"
      :key-path="key"
      :config-data="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import mitt from 'mitt';
import type { PropType } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import merge from 'lodash/merge';
import ControlWrapper from './core/ControlWrapper.vue';

import { SearchManager, searchSingleton } from './core/SearchManager';
import { configHandle } from './core/configHandle';
import defaultOption from './utils/option';
import { deepSet } from './utils/proxyHelp';

export default defineComponent({
  name: 'ConfigForm',
  inheritAttrs: false,
  components: {
    ControlWrapper,
  },
  mixins: [],
  props: {
    configData: {
      type: Object as PropType<cForm.ControlNode>,
      default() {
        return {};
      },
    },
    hooks: {
      type: Object,
      default() {
        return {};
      },
    },
    context: {
      type: [Object],
      default() {
        return {};
      },
    },
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    keyPath: {
      type: String,
      default: '',
    },
    searchManager: {
      type: SearchManager,
      default() {
        return searchSingleton;
      },
    },
    updateDeps: {
      type: Array,
      default() {
        return [];
      },
    },
    formKey: {
      type: String,
      default: '',
    },
    util: {
      type: Object,
      default() {
        return {};
      },
    },
    formSetting: {
      type: Object as PropType<cForm.FormSetting>,
      default() {
        return {};
      },
    },
  },
  data() {
    const result = (this as any).handleConfig();
    const formBus = new mitt();
    const rawVal = toRaw(this.value);
    return {
      computedUpdateDeps: result.deps,
      renderData: this.configData,
      formBus,
      // stateValue: this.value,
      stateValue: cloneDeep(rawVal),
    };
  },
  computed: {
    mergeUpdateDeps(): Array<string> {
      return Array.from(
        new Set([...this.updateDeps, ...this.computedUpdateDeps]),
      );
    },
  },
  watch: {
    activeId() {
      (this as any).stateValue = cloneDeep(this.value);
    },
    value: {
      handler(newVal) {
        (this as any).stateValue = cloneDeep(newVal);
      },
      deep: true,
    },
  },
  provide() {
    return {
      formSetting: merge(defaultOption, this.formSetting),
      formBus: this.formBus,
      context: {},
      rootForm: this,
      formValue: this.stateValue,
    };
  },
  mounted() {
    this.formBus.on('fieldChange', (payload) => {
      deepSet(this.stateValue, payload.keyPath, payload.value);
      this.$emit('change', this.stateValue);
      this.stateValue;
    });
  },
  unmounted() {},
  methods: {
    /**
     * @description: 获取来自控件发送的消息，并透传给外部
     * @param {*} payload { type: '', params: {} }
     * @return {*}
     */
    getControlMsg(payload: object) {
      this.$emit('messageDispatch', payload);
    },
    getValueByPath(value: any, valuePath: string | true, key: string) {
      if ((valuePath as string).length) {
        return value[valuePath as string];
      } else if ((valuePath as boolean) === false) {
        return value;
      } else {
        return value[key];
      }
    },
    getValuePath(valuePath: string | boolean, parentPath: string, key: string) {
      if ((valuePath as string).length) {
        return valuePath;
      } else if ((valuePath as boolean) === false) {
        return parentPath;
      } else {
        return `${parentPath ? parentPath + '.' + key : key}`;
      }
    },
    triggerHook(...args: any[]) {
      const [name, ...params] = args;
      const cb = this.hooks[name];
      if (cb) {
        const api = {
          getFieldValue: this.getFieldValue,
          getFormValue: this.getFormValue,
          getContext: this.getContext,
          setFieldValue: this.setFieldValue,
          setMultipleFieldValue: this.setMultipleFieldValue,
        };
        const cbParams = [...params, api];
        cb(...cbParams);
      }
    },
    getContext() {
      return this.context;
    },
    setMultipleFieldValue(params: cForm.AnyKeyObject) {},
    getFieldValue(path: string) {},
    setFieldValue(value, valuePath) {},
    getFormValue() {
      return this.stateValue;
    },
    handleConfig() {
      const data = this.stateValue || this.value;

      const newData = configHandle(
        toRaw(this.configData),
        {
          form: data,
          ...(this as any).context,
        },
        this.util,
        {
          asyncOperateCallback: (keyPath: string, data: object) => {},
        },
      );
      return newData;
    },
  },
});
</script>

<style lang="scss" scoped>
.config-form {
  color: black;
  // width: 320px;
  padding-right: 8px;
  user-select: none;
  box-sizing: border-box;
  user-select: none;

  & > .control-wrapper {
    margin-bottom: 8px;
  }
}
</style>
