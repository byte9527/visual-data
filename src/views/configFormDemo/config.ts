export const config1 = {
  dataConfig: {
    option: {
      type: 'menu',
      children: {
        tooltip: {
          name: '提示框',
          type: 'group',
          props: {
            hideHeader: true,
            enableOpen: false
          },
          children: {
            show: {
              type: 'switch',
              name: '是否显示'
            },
            showContent: {
              type: 'radio',
              name: '提示框浮层',
              props: {
                options: [
                  { label: '是', value: true },
                  { label: '否', value: false },
                ]
              }
            },
            padding: {
              type: 'slider',
              name: '内边距'
            },
            extraCssText: {
              type: 'input',
              name: '额外样式',
              props: {
                placeholder: '请输入'

              }
            },
            triggerOn: {
              type: 'select',
              name: '触发方式',
              props: {
                options: [
                  { label: '悬浮', value: 'mousemove' },
                  { label: '点击', value: 'click' },
                ]
                // options: "${util.getOptions(context.data)}"
              }
            },
            border: {
              type: 'suite',
              name: '边框',
              valuePath: false,
              props: {
                layout: {
                  type: 'row',
                  setting: [[18, 6]]
                }
              },
              children: {
                borderWidth: {
                  name: '边框宽度',
                  type: 'number'
                },
                borderColor: {
                  name: '边框颜色',
                  type: 'color'
                }
              }
            },
            textStyle: {
              type: 'group',
              name: '文本样式',
              props: {
                hideHeader: false
              },
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
                },
              }
            }
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
              props: {
                enableOpen: false,
                hideHeader: true
              },
              children: {
                show: {
                  type: 'switch',
                  name: '显示'
                },
                name: {
                  type: 'input',
                  name: '名称'
                }
              },
            },
            yAxis: {
              name: 'y轴',
              type: 'group',
              props: {
                hideHeader: true,
                enableOpen: false,
              },
              children: {
                show: {
                  type: 'switch',
                  name: '显示'
                },
                name: {
                  type: 'input',
                  name: '名称'
                }
              },
            }
          },

        },
        name: {
          type: 'input',
          name: '名称'
        },
        series: {
          type: 'list',
          name: '系列',
          props: {
            template(item, i) { // item为defaultValue创建的新值，i为当前系列下标
              return {
                name: `系列${i + 1}`,
                children: {
                  show: {
                    name: '展示',
                    type: 'switch'
                  },
                  type: {
                    type: 'select',
                    name: '类型',
                    show: `\$\{$form.option.series[${i}].show\}`,
                    props: {
                      options: [{ label: '柱状图', value: 'bar' }, { label: '折线图', value: 'line' },]
                    }
                  },
                  color: {
                    type: 'color',
                    name: '颜色',
                  }
                }
              }
            },
          }
        },
      }

    }
  },
  initValue: {
    option: {
      tooltip: {
        show: true,
        showContent: false,
        padding: 30,
        triggerOn: 'mousemove',
        textStyle: {
          fontSize: 12
        }
      },
      axis: {
        xAxis: {
        },
        yAxis: {
        },
      },
      name: '',
      series: [{ type: 'bar', color: '', show: false }, { type: 'line', color: '', show: false },]
    }
  },
  hooks: {

  }
}

export const config2 = {
  dataConfig: {
    tooltip: {
      name: '提示框',
      type: 'group',
      props: {
        enableOpen: false
      },
      children: {
        show: {
          type: 'switch',
          name: '是否显示'
        },
        showContent: {
          type: 'radio',
          show: '${$form.tooltip.show}',
          name: '提示框浮层',
          props: {
            options: [
              { label: '是', value: true },
              { label: '否', value: false },
            ]
          },
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
            // options: "${util.getOptions(context.data)}"
          }
        },
        border: {
          type: 'suite',
          name: '边框',
          valuePath: false,
          props: {
            layout: {
              type: 'row',
              setting: [[18, 6]]
            }
          },
          children: {
            borderWidth: {
              name: '边框宽度',
              type: 'number'
            },
            borderColor: {
              name: '边框颜色',
              type: 'color'
            }
          }
        },

      },
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
        },
      }
    }
  },
  initValue: {
    tooltip: {
      show: true,
      showContent: false,
      padding: 30,
      triggerOn: 'mousemove',
      extraCssText: 'dsafs',
      textStyle: {
        fontSize: 12
      },
      border: {
        borderWidth: 1
      }
    },
    textStyle: {}
  },
  hooks: {

  }
}

export const config3 = {
  dataConfig: {
    show: {
      type: 'switch',
      name: '是否显示',
      style: {
        marginTop: '8px'
      }
    },
    showContent: {
      type: 'radio',
      show: '${$form.tooltip.show}',
      name: '提示框浮层',
      props: {
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ]
      },
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
        // options: "${util.getOptions(context.data)}"
      }
    },
    border: {
      type: 'suite',
      name: '边框',
      valuePath: false,
      props: {
        layout: {
          type: 'row',
          setting: [[18, 6]]
        }
      },
      children: {
        borderWidth: {
          name: '边框宽度',
          type: 'number'
        },
        borderColor: {
          name: '边框颜色',
          type: 'color'
        }
      }
    },
    width: {
      type: 'size',
      name: '宽度',
      props: {
        size: 'small'
      }
    },
    fontsize: {
      type: 'fontsize',
      name: '文本大小',
      props: {
        size: 'small'
      }
    }
  },
  layout: {

  },
  initValue: {
    show: true,
    showContent: false,
    padding: 30,
    triggerOn: 'mousemove',
    extraCssText: 'dsafs',
    textStyle: {
      fontSize: 12
    },
    border: {
      borderWidth: 1
    }
  },
}
