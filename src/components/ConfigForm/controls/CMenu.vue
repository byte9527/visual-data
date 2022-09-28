<template>
  <div :class="menuClasses" class="c-menu">
    <div class="c-menu__header-wrap">
      <div class="c-menu__header">
        <div class="item-container">
          <div
            v-for="(item, key) in children"
            :key="key"
            class="header-item"
            :class="{
              'header-item--active': state.activeKey === key,
            }"
            @click="state.activeKey = key"
          >
            <p class="header-item-name">{{ item._tabName }}</p>
          </div>
        </div>
      </div>
      <div
        class="c-menu__indicator"
        :style="{
          transition: 'transform 0.2s ease-in-out',
          transform: indicatorTranslate,
        }"
      ></div>
    </div>

    <div class="c-menu__content">
      <keep-alive>
        <ControlWrapper class="control-wrap"> </ControlWrapper>
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { computed, reactive } from "vue";

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
  layout: {
    type: String,
    default: "horizontal",
  },
});

const state = reactive({
  activeKey: "",
});

const adjustChildren = computed(() => {
  const cloneConfig = cloneDeep(props.children);
  Object.values(cloneConfig).forEach((value) => {
    if (!value.type) {
      value.type = "group";
      value.props = {
        hideHeader: true,
      };
    }
    value._tabName = value.name || value.props?.title || "";
  });
  return cloneConfig;
});

const menuClasses = computed(() => {
  return [];
});

const indicatorTranslate = computed(() => {
  return "";
});
</script>

<style lang='scss' scoped>
.c-menu {
}
</style>
