export default {
  dataConfig: {
    option: {
      type: 'menu',
      children: {
        tooltip: {
          name: '提示框',
          type: 'group',
          props: {
            hideHeader: true,
            enableHide: true
          },
          children: {
            show: {
              type: 'switch',
              name: '是否显示'
            },
            padding: {
              type: 'slider',
              name: '内边距'
            },
            extraCssText: {
              type: 'input',
              name: '额外样式'
            },
            triggerOn: {
              type: 'select',
              name: '触发方式',
              props: {
                options: [
                  { label: '悬浮', value: 'mousemove' },
                  { label: '点击', value: 'click' },
                ]
              }
            },
            textStyle: {
              type: 'group',
              name: '文本样式',
              children: {
                color: {
                  name: '颜色',
                  type: 'color'
                },
                fontSize: {
                  name: '大小',
                  type: 'number',
                  props: {
                    min: 12,
                    max: 100
                  }
                }
              }
            },
          },
        },
        axis: {
          name: '轴信息',
          type: 'menu',
          props: {
            layout: 'horizontal'
          },
          children: {
            xAxis: {
              name: 'x轴',
              type: 'group',
              enableHide: true,
              children: {
              },
            },
            yAxis: {
              name: 'y轴',
              type: 'group',
              enableHide: true,
              children: {
              },
            }
          },

        },
        // list: {
        // },

      }

    }
  },
  initValue: {
    option: {
      tooltip: {
        show: true,
        padding: 6,
        triggerOn: 'mousemove',
        textStyle: {
          fontSize: 12
        }
      },
      xAxis: {
      },
      yAxis: {
      }
    }
  },
  hooks: {

  }
}