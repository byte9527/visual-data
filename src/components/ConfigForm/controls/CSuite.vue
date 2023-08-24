<template>
  <div class="c-suite">
    <el-row v-for="(row, id) in layoutInfo" :key="id">
      <el-col v-for="(col, index) in row" :key="index" :span="col.colSpan">
        <ControlWrapper
          class="control-wrap"
          :config-data="col.child"
          :key-path="getKeyPath(col.child.key, col.child)"
        >
        </ControlWrapper>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRaw } from 'vue';
import ControlWrapper from '../core/ControlWrapper.vue';
import { useCommonUtil } from '../utils/controlSetup';

const props = defineProps({
  value: {
    type: Object,
    default() {
      return {};
    }
  },
  children: {
    type: Object,
    default() {
      return {};
    }
  },
  valuePath: {
    type: [String, Boolean],
    default: ''
  },
  layout: {
    type: Object,
    default() {
      return {
        type: 'row',
        colSpan: [[12, 12]]
      };
    }
  }
});

const convertedChildren = computed(() => {
  const children = toRaw(props.children);
  Object.values(children).forEach((v) => (v.hideName = true));
  return children;
});

interface colInfo {
  colSpan: number;
  child: {
    key: string;
    value: {
      [prop: string]: any;
    };
  };
}

const layoutInfo = computed(() => {
  const children = toRaw(props.children);
  const result = [];
  const setting = props.layout.setting;
  let count = 0;
  const keys = Object.keys(children);
  for (let i = 0; i < setting.length; i++) {
    result[i] = [];
    const row = setting[i];
    for (let j = 0; j < row.length; j++) {
      const colSpan = row[j];
      if (count < Object.keys(children).length) {
        result[i].push({
          colSpan,
          child: {
            key: keys[count],
            hideName: true,
            ...children[keys[count]]
          }
        });
      }
      count++;
    }
  }
  return result;
});

const { getKeyPath } = useCommonUtil(props);
</script>

<style lang="scss" scoped></style>
