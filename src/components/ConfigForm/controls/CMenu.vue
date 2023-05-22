<template>
  <div :class="menuClasses" class="c-menu">
    <div class="c-menu__header-wrap">
      <div class="c-menu__header">
        <div class="item-container">
          <div v-for="(item, key) in children" :key="key" class="header-item" :class="{
            'header-item--active': state.activeKey === key,
          }" @click="state.activeKey = key">
            <p class="header-item-name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="c-menu__content">
      <!-- <keep-alive>
        <ControlWrapper :config-data="activeComponent"></ControlWrapper>
      </keep-alive> -->
      <ControlWrapper :config-data="activeComponent"></ControlWrapper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from "lodash-es";
import { computed, reactive, toRaw } from "vue";

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
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: "vertical",
  },
});



const state = reactive({
  activeKey: Object.keys(toRaw(props.children))[0]
});

const adjustChildren = computed(() => {
  const cloneConfig = cloneDeep(props.children);
  Object.values(cloneConfig).forEach((value) => {
    if (!value.type) {
      value.type = "group";
    }
    if (value.type === 'group') {
      value.props = Object.assign({}, value.props || {})
    }
  });
  return cloneConfig;
});

const activeComponent = computed(() => {
  const r = adjustChildren.value[state.activeKey];
  return r
});

const menuClasses = computed(() => {
  return [
    "c-menu",
    props.layout === "vertical" ? "c-menu--vertical" : "c-menu--horizontal",
  ];
});

</script>

<style lang='scss' scoped>
$textColor: #fff;
$activeBg: #409eff;

.c-menu {
  display: flex;
  flex-grow: 1;

  .header-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &--horizontal {
    flex-direction: column;

    .c-menu__header {
      height: 40px;
    }

    .header-item {
      padding: 0 8px;

      &--active {
        background: $activeBg;
      }
    }
  }

  &--vertical {
    flex-direction: row;

    .c-menu__header {
      width: 40px;
    }

    .header-item {
      padding: 16px 0;

      &--active {
        background: $activeBg;
      }
    }

    .c-menu__content {
      flex-grow: 1;
      .control-wrapper {
        margin-bottom: 8px;
      }
    }

    .header-item-name {
      writing-mode: tb;
    }
  }
}
</style>
