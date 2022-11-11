<template>
  <div class="c-suite">
    <ControlWrapper
      v-for="(item, key) in convertedChildren"
      class="control-wrap"
      :config-data="item"
      :key="key"
      :value-path="getValuePath(key)"
    ></ControlWrapper>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRaw } from "vue";

const props = defineProps({
  value: {
    type: Object,
    default() {
      return {};
    },
  },
  children: {
    type: Object,
    default() {
      return {};
    },
  },
  valuePath: {
    type: [String, Boolean],
    default: "",
  },
  layout: {
    type: Object
  }
});

const convertedChildren = computed(() => {
  const children = toRaw(props.children)
  Object.values(children).forEach(v => v.hideName = true)
  return children
})

const getValuePath = (key) => {
  if (props.valuePath) {
    return "";
  }
};
</script>

<style lang="scss" scoped>

</style>
