<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";

export default defineComponent({
  name: "ConfigForm",
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
  },
});
</script>