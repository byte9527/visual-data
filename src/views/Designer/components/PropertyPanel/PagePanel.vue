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
          name: '名称',
        },
        style: {
          type: 'group',
          name: '样式',
          children: {
            background: {
              type: 'color',
              name: '背景色',
            },
            size: {
              type: 'suite',
              name: '页面尺寸',
              valuePath: false,
              props: {
                layout: {
                  type: 'row',
                  setting: [[12, 12]],
                },
              },
              children: {
                width: {
                  name: '边框宽度',
                  type: 'size',
                },
                height: {
                  name: '边框颜色',
                  type: 'size',
                },
              },
            },
          },
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
            gridSetting: {
              type: 'group',
              name: '网格设置',
              show: '${$form.layout.type === "grid"}',
              children: {
                colNum: {
                  type: 'number',
                  name: '列数',
                },
                cellHeight: {
                  type: 'number',
                  name: '行高',
                },
                paddingY: {
                  type: 'number',
                  name: '垂直内边距',
                },
                paddingX: {
                  type: 'number',
                  name: '水平内边距',
                },
                xSpace: {
                  type: 'number',
                  name: '水平间隔',
                },
                ySpace: {
                  type: 'number',
                  name: '垂直间隔',
                },
              },
            },
            flexSetting: {
              name: '弹性布局设置',
              type: 'group',
              show: '${$form.layout.type === "flex"}',
              props: {
                //  hideHeader: true,
                //  enableOpen: false
              },
              children: {
                flexDirection: {
                  type: 'radio',
                  name: '方向',
                  props: {
                    options: [
                      {
                        label: '横向',
                        value: 'row',
                      },
                      {
                        label: '纵向',
                        value: 'column',
                      },
                    ],
                  },
                },
              },
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
