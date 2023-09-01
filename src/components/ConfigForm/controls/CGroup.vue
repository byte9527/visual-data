<template>
  <div class="c-group" :class="{ 'c-group--noHeader': hideHeader }">
    <el-collapse v-model="activeValue">
      <el-collapse-item :title="name" name="1">
        <!-- <template slot="title" v-if="!hideHeader">
          <div>
            <el-switch
              v-if="enableOpen"
              v-model="value.show"
              size="mini"
              active-text=""
              inactive-text=""
              style="margin-right: 1px"
              class="el-switch--nano"
            />
            <span>{{ name }}</span>
          </div>
        </template> -->
        <ControlWrapper
          v-for="(item, key) in children"
          class="control-wrap"
          :config-data="item"
          :key="key"
          :key-path="getKeyPath(key, item)"
        ></ControlWrapper>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCommonUtil } from '../utils/controlSetup';
import ControlWrapper from '../core/ControlWrapper.vue';

const props = defineProps({
  modelValue: {
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
  hideHeader: {
    type: Boolean,
    default: false,
  },
  layout: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  valuePath: {
    type: String,
    default: '',
  },
  enableOpen: {
    type: Boolean,
    default: false,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const activeValue = ref(props.hideHeader || props.expanded ? '1' : '');

const { getKeyPath } = useCommonUtil(props);
</script>

<style lang="scss">
.c-group {
  width: 100%;

  > .el-collapse {
    border-top: none;
    border-bottom: none;
  }

  .el-collapse-item__wrap {
    border-bottom: none;
  }

  &--noHeader {
    > .el-collapse > .el-collapse-item > div:first-of-type {
      .el-collapse-item__header {
        display: none;
      }
    }
    > .el-collapse {
      border-bottom: none;
    }
  }

  .control-wrapper {
    margin-bottom: 8px;
  }

  .el-collapse-item__header {
    padding-left: 8px;
    background-color: unset;
    font-weight: bold;
  }

  .el-collapse-item__wrap {
    background-color: unset;
  }

  .el-collapse-item__content {
    padding-bottom: unset;
    padding-bottom: 8px;

    .control-wrapper:last-child {
      margin-bottom: 0;
    }
  }
}

.c-group--noHeader {
  > .el-collapse {
    .el-collapse-item__wrap {
      padding-top: 0.5rem;
    }
  }
}
</style>
