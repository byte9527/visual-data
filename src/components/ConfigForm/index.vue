<template>
  <div class="panel-group panel-group--noHeader config-form">
    <div
      v-for="(item, key) in renderData"
      v-show="item.showInPanel !== false"
      :key="item.id"
      class="control-item"
    >
      <label
        v-show="item.name && showLabel(item.type)"
        class="control-item__label"
        >{{ item.name }}</label
      >
      <ControlWrapper class="control-item__control-wrap">
        <component
          :is="getComponentName(item.type)"
          :value="getValueByPath(formValue, item.valuePath, `${key}`)"
          class="control-item__control"
          :key-path="`${keyPath ? keyPath + '.' + key : key}`"
          :value-path="getValuePath(item.valuePath, '', `${key}`)"
          :config-data="item"
        />
      </ControlWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from 'vue'
import { set, get, isEqual, merge } from "lodash";
import ControlWrapper from "./core/ControlWrapper.vue";

import { SearchManager, searchSingleton } from "./core/SearchManager";
import { getComponentName, showLabelByType } from "./core/controlManager";
import { configHandle, getRootValueKeys } from "./core/configHandle";
import defaultOption from "./utils/option";

interface FormSetting {
  util: object;
  controls: object
}

interface anyKeyObject {
  [propName: string]: any;
}

interface config {
  deps: Array<string>;
}

export default defineComponent({
  components: {
    ControlWrapper,
  },
  mixins: [],
  props: {
    configData: {
      type: Object,
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
      default: "",
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
      default: "",
    },
    util: {
      type: Object,
      default() {
        return {};
      },
    },
    formSetting: {
      type: Object as PropType<FormSetting>,
      default() {
        return {};
      },
    },
  },
  data() {
    const result = (this as any).handleConfig();
    return {
      computedUpdateDeps: result.deps,
      renderData: result.config,
    };
  },
  provide()  {
    return {
      formSetting: merge(defaultOption, this.formSetting),
    };
  },
  computed: {
    mergeUpdateDeps(): Array<string> {
      return Array.from(
        new Set([...this.updateDeps, ...this.computedUpdateDeps])
      );
    },
    formValue() {
      const styleValue = this.value;
      const filterValue:anyKeyObject = {};
      const rootKeys = getRootValueKeys(this.configData);
      rootKeys.forEach((key) => {
        if (styleValue[key]) {
          filterValue[key] = styleValue[key];
        }
      });
      return filterValue;
    },
  },
  watch: {
    activeId() {
      // 切换组件后重新加入观察
      this.addWatchers();
      this.stateValue = this.value
    },
    value: {
      handler(newVal) {
        this.stateValue = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
    "configData.options": {
      handler() {
        this.renderData = this.transformConfig();
      },
      deep: true,
    },
  },
  provide() {
    return {
      eventBus: this,
      getContext: () => {
        return this.context;
      },
    };
  },
  mounted() {
    // this.$on("valueChange", this.setFieldValue);
    // this.$on("message", this.getControlMsg);
    this.stateValue = this.value;
    this.addWatchers();
    this.formSetting;
  },
  destroyed() {
    // this.$off("valueChange", this.setFieldValue);
    // this.$off("message", this.getControlMsg);
  },
  methods: {
    getComponentName,
    /**
     * @description: 获取来自控件发送的消息，并透传给外部
     * @param {*} payload { type: '', params: {} }
     * @return {*}
     */
    getControlMsg(payload: object) {
      this.$emit("messageDispatch", payload);
    },
    getValueByPath(value: any, valuePath: string | true, key: string) {
      if ((valuePath as string).length) {
        return value[valuePath as string];
      } else if (valuePath as boolean === false) {
        return value;
      } else {
        return value[key];
      }
    },
    getValuePath(valuePath: string | boolean, parentPath: string, key: string) {
      if ((valuePath as string).length) {
        return valuePath;
      } else if (valuePath as boolean === false) {
        return parentPath;
      } else {
        return `${parentPath ? parentPath + "." + key : key}`;
      }
    },
    /**
     * @description: 加入对context的观察
     * @param {*}
     * @return {*}
     */
    addWatchers() {
      this.deleteWatchers();
      const deps = this.mergeUpdateDeps.filter((item) =>
        item.includes("context")
      );
      deps.forEach((dep) => {
        this.$watch(
          dep,
          (newVal: any, val: any) => {
            if (!isEqual(newVal, val)) {
              this.configLinkage();
              this.triggerHook("contextChange", dep, newVal);
            }
          },
          { deep: true }
        );
      });
    },
    triggerHook(...args) {
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
    deleteWatchers() {
      const watchers = this.watchers || [];
      watchers.forEach((unwatch) => unwatch());
      this.watchers = [];
    },
    setMultipleFieldValue(params: anyKeyObject) {
      Object.keys(params).forEach((key) => {
        this.setFieldValue(params[key], key);
      });
    },
    getFieldValue(path: string) {
      return get(this.stateValue, path);
    },
    setFieldValue(value, valuePath) {
      if (!valuePath || isEqual(value, get(this.stateValue, valuePath))) {
        return;
      }
      this.triggerHook("fieldValueChange", valuePath, value);
      set(this.stateValue, valuePath, value);
      const isMatch = this.checkMatchDeps(`form.${valuePath}`);
      if (isMatch) {
        this.configLinkage();
      }
      // 子组件处理值的改变
      this.$emit("formValueChange", `form.${valuePath}`);
      this.$emit("change", this.stateValue);
    },
    getFormValue() {
      return this.stateValue;
    },
    checkMatchDeps(str: string) {
      // this.mergeUpdateDeps.includes()
      return this.mergeUpdateDeps.some((item) => {
        const reg = new RegExp(item);
        return reg.test(str);
      });
    },
    configLinkage() {
      const newRenderData = this.transformConfig();
      if (!isEqual(newRenderData, this.renderData)) {
        this.renderData = newRenderData;
      }
    },
    transformConfig() {
      const data = this.handleConfig();
      this.$nextTick(() => {
        this.computedUpdateDeps = data.deps;
      });
      return data.config;
    },
    handleConfig() {
      const data = this.stateValue || this.value;
      const newData = configHandle(
        this.configData,
        {
          form: data,
          ...this.context,
        },
        this.util,
        {
          asyncOperateCallback: (keyPath:string, data: object) => {
            set(this.renderData, keyPath, data);
          },
        }
      );
      return newData;
    },
    showLabel(type:string) {
      return showLabelByType(type);
    },
  },
});
</script>

<style lang="scss" scoped>
$bg_color: #151a25;
$focus_border_color: #409eff;

.config-form {
  background: #1f2839;
  flex: 1;
  .control-item {
    padding: 0;
    height: auto;
    .control-item__control-wrap {
      margin: 0;
      .control-item__control {
        height: 100%;
      }
    }
  }
  ::v-deep {
    .el-input__icon {
      width: inherit;
    }
  }
}
</style>
