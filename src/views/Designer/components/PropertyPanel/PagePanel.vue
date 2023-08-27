<template>
  <div class="page-panel">
    <ConfigForm
      :config-data="propertyConfig"
      :value="pageSetting"
      @change="updatePageSetting"
    />
  </div>
</template>

<script>
import ConfigForm from '@/components/ConfigForm';
import { mapState, mapMutations } from 'vuex';

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
          props: {
            expanded: true,
          },
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
          props: {
            expanded: true,
          },
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
              props: {
                // expanded: true,
                hideHeader: true,
              },
              children: {
                showInEdit: {
                  type: 'switch',
                  name: '展示编辑网格',
                },
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
                // expanded: true,
                hideHeader: true,
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
                justifyContent: {
                  type: 'select',
                  name: '${ $form.layout.flexSetting.flexDirection === "row" ? "横向对齐" : "纵向对齐" }',
                  props: {
                    options: [
                      { label: '起点对齐', value: 'flex-start' },
                      { label: '终点对齐', value: 'flex-end' },
                      { label: '居中', value: 'center' },
                      { label: '元素间距相同', value: 'space-between' },
                      { label: '相邻元素间距相同', value: 'space-around' },
                    ],
                  },
                },
                alignItems: {
                  type: 'select',
                  name: '${ $form.layout.flexSetting.flexDirection === "row" ? "纵向对齐" : "横向对齐" }',
                  props: {
                    options: [
                      { label: '起点对齐', value: 'flex-start' },
                      { label: '终点对齐', value: 'flex-end' },
                      { label: '居中', value: 'center' },
                    ],
                  },
                },
                rowGap: {
                  type: 'number',
                  name: '横向间隔',
                },
                columnGap: {
                  type: 'number',
                  name: '纵向间隔',
                },
              },
            },
            positionSetting: {
              type: 'group',
              props: {
                hideHeader: true,
              },
              children: {
                showRule: {
                  type: 'switch',
                  name: '显示标尺',
                },
              },
            },
          },
        },
      },
    };
  },
  watch: {},
  computed: {
    ...mapState('pageDesigner', ['pageSetting']),
  },
  mounted() {},
  methods: {
    ...mapMutations('pageDesigner', ['updatePageSetting']),
  },
};
</script>

<style lang="scss"></style>
