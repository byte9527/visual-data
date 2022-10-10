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
            <p class="header-item-name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="c-menu__content">
      <keep-alive>
        <ControlWrapper
          v-for="(item, key) in activeComponents"
          class="control-wrap"
          :key="key"
        ></ControlWrapper>
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
    default: "vertical",
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
  });
  return cloneConfig;
});

const activeComponents = computed(() => {
  const r = adjustChildren.value[state.activeKey];
  return r;
});

const menuClasses = computed(() => {
  return [
    "c-menu",
    props.layout === "vertical" ? "c-menu--vertical" : "c-menu--horizontal",
  ];
});

const contentChild = computed(() => {
  return state.activeKey;
});
</script>

<style lang='scss' scoped>
$textColor: #fff;
$activeBg: #0046ff;
.c-menu {
  display: flex;
  color: $textColor;

  &--horizontal {
    flex-direction: column;
  }

  &--vertical {
    flex-direction: row;
    .header-item {
      padding: 16px 0;

      &--active {
        background: $activeBg;
      }
    }

    .header-item-name {
      writing-mode: tb;
    }
  }
}
</style>
