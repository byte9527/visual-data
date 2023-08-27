<template>
  <div class="c-size">
    <el-input-number
      :model-value="currentValue"
      controls-position="right"
      v-bind="numberProps"
      @change="change"
    ></el-input-number>

    <el-dropdown @command="handleCommand">
      <span class="c-size__unit">{{ unit }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in unitOptions" :key="item.value" :command="item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, useAttrs, computed } from 'vue';
defineOptions({
  inheritAttrs: false
})

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

const attrs = useAttrs()
const numberProps = computed(() => {
  const { modelValue, ...rest } = attrs;
  return { ...rest};
});

const emit = defineEmits(['change']);

const matches = props.value.match(/(\-)?\d+(\.\d{1,2})?/g);
const currentValue = matches ? ref(Number(matches[0] || '0')) : ref("");

const change = (val) => {
  if (val !== currentValue.value) {
    currentValue.value = val
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

// const 
</script>

<style lang="scss">
.c-size {
  position: relative;
  &__unit {
    position: absolute;
    right: 26px;
    top: 5px;
    color: lightgrey;
    outline: none !important;
  }

  .el-input-number {
    width: 100%;
  }
}
</style>
