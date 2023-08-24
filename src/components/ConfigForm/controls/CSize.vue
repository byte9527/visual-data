<template>
  <div class="c-size">
    <el-input-number
      :model-value="currentValue"
      @change="change"
    ></el-input-number>

    <el-dropdown @command="handleCommand">
      <span class="c-size__unit">{{ unit }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in unitOptions" :command="item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue';
defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  value: {
    type: [String],
    default: ''
  },
  unitOptions: {
    type: Array,
    default() {
      return [
        { label: 'px', value: 'px' },
        { label: '%', value: '%' },
        { label: 'rem', value: 'rem' }
      ];
    }
  }
});

const emit = defineEmits(['change']);

const matches = props.value.match(/(\-)?\d+(\.\d{1,2})?/g);
const currentValue = matches ? ref(Number(matches[0] || '0')) : undefined;
const change = (val) => {
  if (val !== currentValue) {
    emit('change', `${val}${unit.value}`);
  }
};

const unit = ref('px');
const handleCommand = (val) => {
  if (val !== unit.value) {
    unit.value = val;
    if (val === 'rem') {
    }
  }
};
</script>

<style lang="scss">
.c-size {
  position: relative;
  &__unit {
    position: absolute;
    right: 36px;
    top: 9px;
    color: lightgrey;
    outline: none !important;
  }
}
</style>
