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
          :value="getValueByPath(formValue, item.valuePath, key)"
          class="control-item__control"
          :key-path="`${keyPath ? keyPath + '.' + key : key}`"
          :value-path="getValuePath(item.valuePath, '', key)"
          :config-data="item"
        />
      </ControlWrapper>
    </div>
  </div>
</template>

<script lang="ts">
import { set, get, isEqual } from "lodash";
import ControlWrapper from "./core/ControlWrapper.vue";

import { SearchManager, searchSingleton } from "./core/SearchManager";
import { getComponentName, showLabelByType } from "./core/controlManager";
import { configHandle, getRootValueKeys } from "./core/configHandle";
import defaultOption from "./utils/panelOption";

export default {
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
        return null;
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
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    const result = this.handleConfig();
    return {
      computedUpdateDeps: result.deps,
      renderData: result.config,
    };
  },
  provide() {
    return {
      formSetting: merge(defaultOption, this.formSetting),
    };
  },
  computed: {
    mergeUpdateDeps() {
      return Array.from(
        new Set([...this.updateDeps, ...this.computedUpdateDeps])
      );
    },
    formValue() {
      const styleValue = this.value;
      const filterValue = {};
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
      // this.stateValue = this.value
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
    this.$on("valueChange", this.setFieldValue);
    this.$on("message", this.getControlMsg);
    this.stateValue = this.value;
    this.addWatchers();
  },
  destroyed() {
    this.$off("valueChange", this.setFieldValue);
    this.$off("message", this.getControlMsg);
  },
  methods: {
    getComponentName,
    /**
     * @description: 获取来自控件发送的消息，并透传给外部
     * @param {*} payload { type: '', params: {} }
     * @return {*}
     */
    getControlMsg(payload) {
      this.$emit("messageDispatch", payload);
    },
    getValueByPath(value, valuePath = true, key) {
      if (valuePath.length) {
        return value[valuePath];
      } else if (valuePath === false) {
        return value;
      } else {
        return value[key];
      }
    },
    getValuePath(valuePath = "", parentPath, key) {
      if (valuePath.length) {
        return valuePath;
      } else if (valuePath === false) {
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
          (newVal, val) => {
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
    setMultipleFieldValue(params) {
      Object.keys(params).forEach((key) => {
        this.setFieldValue(params[key], key);
      });
    },
    getFieldValue(path) {
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
    checkMatchDeps(str) {
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
          asyncOperateCallback: (keyPath, data) => {
            set(this.renderData, keyPath, data);
          },
        }
      );
      return newData;
    },
    showLabel(type) {
      return showLabelByType(type);
    },
  },
};
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
