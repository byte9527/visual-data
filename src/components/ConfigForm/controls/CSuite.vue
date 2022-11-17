<template>
  <div class="c-suite">
    <el-row v-for="row in layout.colSpan">
      <el-col :span="row[0]">

      </el-col>
    </el-row>

    <ControlWrapper v-for="(item, key) in convertedChildren" class="control-wrap" :config-data="item" :key="key"
      :value-path="getValuePath(key)"></ControlWrapper>
  </div>
</template>

<script lang="ts" setup>
import { forEach } from "lodash";
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
    type: Object,
    default() {
      return {
        type: "row",
        colSpan: [[12, 12]]
      }
    }
  },
});

const convertedChildren = computed(() => {
  const children = toRaw(props.children);
  Object.values(children).forEach((v) => (v.hideName = true));
  return children;
});

const layoutInfo = computed(() => {
  const children = toRaw(props.children);
  const flatColSpan = props.layout.colSpan.flat()
  const maxLength = Math.max(children.length, flatColSpan.length)
  const result = []
  for (let i = 0; i < props.layout.colSpan; i++) {


  }
})

const getValuePath = (key) => {
  if (props.valuePath) {
    return "";
  }
};
</script>

<style lang="scss" scoped>

</style>
