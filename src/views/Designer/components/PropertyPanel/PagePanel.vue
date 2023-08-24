<template>
  <div class="page-panel">
    <ConfigForm :config-data="propertyConfig" :value="value" />
  </div>
</template>

<script>
import ConfigForm from '@/components/ConfigForm';

export default {
  mixins: [],
  components: {
    ConfigForm,
  },
  props: {},
  data() {
    return {
      propertyConfig: {
        name: {
          type: 'input',
          name: '名称'
        },
        layout: {
          type: 'group',
          name: '布局',
          children: {
            type: {
              name: '布局方式',
              type: 'select',
              props: {
                options: [
                  { label: '网格', value: 'grid' },
                  { label: '弹性', value: 'flex' },
                  { label: '定位', value: 'position' },
                  { label: '流式', value: 'fluid' },
                ],
              },
            },
          },
        },
        style: {
          type: 'group',
          name: '样式',
          children: {
            background: {
              type: 'color',
              name: '背景色',
            },
          },
        },
      },
      value: {},
    };
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss"></style>
