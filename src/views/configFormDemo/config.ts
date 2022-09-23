export default {
  option: {
    type: 'menu',
    children: {
      chart: {
        name: '图表',
        children: {
          margin: {
            type: 'margin',
            name: '边距',
            default: {
              top: 20,
              bottom: 30,
              left: 35,
              right: 15
            }
          },
          loadAmount: {
            name: '最多加载',
            description:
              '为保证大屏展示效果此组件开启数据加载限制，最多加载前指定条数据记录进行计算、布局与绘制',
            type: 'stepper',
            default: 2000,
            step: 1
          },
          bar: {
            name: '柱图样式',
            type: 'group',
            children: {
              bgColor: {
                name: '背景颜色',
                type: 'fill',
                default: 'RGBA(255,255,255,0.1)'
              }
            }
          },
          numericalLabel: {
            name: '值标签',
            type: 'group',
            children: {
              show: {
                name: '显示/隐藏',
                type: 'boolean',
                default: false
              },
              textStyle: {
                type: 'font',
                name: '文本',
                default: {
                  fontFamily: 'Microsoft Yahei',
                  fontWeight: 'normal',
                  fontSize: 10,
                  color: '#000'
                }
              },
              pos: {
                name: '位置',
                type: 'iconRadio',
                default: 'center',
                options: [
                  {
                    label: '顶部',
                    value: 'top',
                    src: 'top-center-pos'
                  },
                  {
                    label: '中间',
                    value: 'center',
                    src: 'middle-center-pos'
                  },
                  {
                    label: '底部',
                    value: 'bottom',
                    src: 'bottom-center-pos'
                  }
                ]
              },
              emptyData: {
                name: '空值数据',
                type: 'switch',
                default: false
              }
            },
            enableHide: true
          }
        },
        type: 'menuChild',
        mode: 'single'
      },
      axis: {
        name: '坐标轴',
        children: {
          xaxis: {
            name: 'x轴',
            children: {
              isShow: {
                type: 'switch',
                name: 'x轴可见',
                default: true
              },
              boundaryGap: {
                type: 'slider',
                name: '两边留白',
                default: 0.6,
                step: 0.01,
                min: 0,
                max: 1,
                precision: 2,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]],
                  logicalType: '$and'
                }
              },
              interval: {
                type: 'slider',
                name: '分割间隔',
                default: 0.6,
                step: 0.01,
                min: 0,
                max: 0.95,
                precision: 2,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]],
                  logicalType: '$and'
                }
              },
              label: {
                name: '轴标签',
                type: 'group',
                enableHide: true,
                children: {
                  show: {
                    default: true
                  },
                  format: {
                    name: '显示格式',
                    type: 'select',
                    default: '%m月',
                    description:
                      '时间请参照 %m/%d/%Y %H:%M:%S, 整数参照 d, 浮点参照 .1f',
                    options: [
                      {
                        value: 'd',
                        label: '11(整数)'
                      },
                      {
                        value: '.1f',
                        label: '11.1(浮点数)'
                      },
                      {
                        value: '.2f',
                        label: '11.11(浮点数)'
                      },
                      {
                        value: '%Y年',
                        label: '2016年'
                      },
                      {
                        value: '%Y',
                        label: '2016(年份)'
                      },
                      {
                        value: '%m月%d日',
                        label: '01月01日'
                      },
                      {
                        value: '%m/%d',
                        label: '01/01(月/日)'
                      },
                      {
                        value: '%H:%M:%S',
                        label: '02:30:00'
                      },
                      {
                        value: '%H:%M',
                        label: '02:30(时:分)'
                      },
                      {
                        value: '%Y/%m/%d %H:%M',
                        label: '2016/01/01 02:30'
                      },
                      {
                        value: '%Y/%m/%d',
                        label: '2016/01/01'
                      },
                      {
                        value: '%m/%d %H:%M',
                        label: '01/01 02:30'
                      },
                      {
                        value: '%m月',
                        label: '1月'
                      },
                      {
                        value: '%d日',
                        label: '2日'
                      },
                      {
                        value: '%Hh',
                        label: '02h'
                      },
                      {
                        value: '%H',
                        label: '02(时)'
                      },
                      {
                        value: '%m-%d',
                        label: '01-01'
                      },
                      {
                        value: '%m.%d',
                        label: '01.01'
                      }
                    ],
                    filterable: true,
                    allowCustom: true,
                    showInPanel: {
                      conditions: [['..type', '$ne', 'category']]
                    }
                  },
                  textarea: {
                    type: 'font',
                    name: '文本',
                    default: {
                      fontFamily: 'Microsoft Yahei',
                      fontWeight: 'normal',
                      fontSize: 12,
                      color: 'rgb(144, 160, 174)'
                    }
                  },
                  display: {
                    type: 'suite',
                    name: '轴标签展示',
                    children: {
                      angle: {
                        name: '角度',
                        type: 'iconRadio',
                        default: '0',
                        options: [
                          {
                            value: '0',
                            label: '水平',
                            src: 'horizontal'
                          },
                          {
                            value: '45',
                            label: '斜角',
                            src: 'incline'
                          },
                          {
                            value: '90',
                            label: '垂直',
                            src: 'vertical'
                          }
                        ],
                        col: 12
                      },
                      amount: {
                        name: '数量',
                        type: 'stepper',
                        default: 0,
                        min: 0,
                        step: 1,
                        description: '坐标轴刻度标签最多显示个数',
                        col: 12
                      },
                      unit: {
                        type: 'text',
                        default: '',
                        name: '轴单位',
                        col: 12
                      }
                    }
                  }
                },
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              },
              axisLine: {
                name: '轴线',
                type: 'group',
                children: {
                  show: {
                    default: true
                  },
                  color: {
                    type: 'fill',
                    name: '颜色',
                    default: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                enableHide: true,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              },
              grid: {
                name: '网格线',
                type: 'group',
                children: {
                  show: {
                    default: false
                  },
                  color: {
                    type: 'fill',
                    name: '颜色',
                    default: '#fff'
                  }
                },
                enableHide: true,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              }
            },
            enableHide: true
          },
          yaxis: {
            name: 'y轴',
            children: {
              isShow: {
                name: 'y轴可见',
                type: 'switch',
                default: true
              },
              extent: {
                type: 'suite',
                name: '范围',
                children: {
                  min: {
                    type: 'select',
                    name: '最小值',
                    default: '0',
                    description: '可输入数值来自定义标签最小值。',
                    options: [
                      {
                        value: 'auto',
                        label: '自动取整'
                      },
                      {
                        value: 'dataMin',
                        label: '数据最小值'
                      }
                    ],
                    filterable: true,
                    allowCustom: true,
                    col: 12
                  },
                  max: {
                    type: 'select',
                    name: '最大值',
                    default: 'dataMax',
                    description: '可输入数值来自定义标签最大值。',
                    options: [
                      {
                        value: 'auto',
                        label: '自动取整'
                      },
                      {
                        value: 'dataMax',
                        label: '数据最大值'
                      }
                    ],
                    filterable: true,
                    allowCustom: true,
                    col: 12
                  }
                },
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              },
              label: {
                name: '轴标签',
                type: 'group',
                enableHide: true,
                children: {
                  format: {
                    name: '显示格式',
                    type: 'select',
                    default: '.0f',
                    description: '整数参照 d, 浮点参照 .1f',
                    options: [
                      {
                        value: null,
                        label: '默认'
                      },
                      {
                        value: '.0f',
                        label: '11(整数)'
                      },
                      {
                        value: '.1f',
                        label: '11.1(浮点数)'
                      },
                      {
                        value: '.2f',
                        label: '11.11(浮点数)'
                      },
                      {
                        value: '%',
                        label: '11%'
                      },
                      {
                        value: '.1%',
                        label: '11.1%'
                      },
                      {
                        value: '.2%',
                        label: '11.11%'
                      }
                    ],
                    filterable: true,
                    allowCustom: true
                  },
                  textarea: {
                    type: 'font',
                    name: '文本',
                    default: {
                      fontFamily: 'Microsoft Yahei',
                      fontWeight: 'normal',
                      fontSize: 12,
                      color: 'rgb(144, 160, 174)'
                    }
                  },
                  display: {
                    type: 'suite',
                    name: '轴标签展示',
                    children: {
                      amount: {
                        name: '数量',
                        type: 'stepper',
                        default: 6,
                        min: 0,
                        step: 1,
                        description: '坐标轴刻度标签最多显示个数',
                        col: 12
                      },
                      unit: {
                        type: 'text',
                        name: '单位',
                        default: '',
                        col: 12,
                        enableHide: true
                      }
                    }
                  }
                },
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              },
              axisLine: {
                name: '轴线',
                type: 'group',
                children: {
                  show: {
                    default: true
                  },
                  color: {
                    type: 'fill',
                    name: '颜色',
                    default: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                enableHide: true,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              },
              grid: {
                name: '网格线',
                type: 'group',
                children: {
                  show: {
                    default: false
                  },
                  color: {
                    type: 'fill',
                    name: '颜色',
                    default: '#434343'
                  }
                },
                enableHide: true,
                showInPanel: {
                  conditions: [['.isShow', '$eq', true]]
                }
              }
            },
            enableHide: true
          }
        },
        type: 'menuChild',
        mode: 'multiple'
      },
      series: {
        type: 'menuChild',
        name: '系列',
        children: {
          series2type: {
            type: 'switch',
            name: '系列转类型',
            default: false
          },
          series: {
            type: 'tabs',
            name: '数据系列',
            default: [
              {
                color: {
                  type: 'flat',
                  value: 'rgb(10, 115, 255)'
                }
              }
            ],
            template: {
              type: 'object',
              name: '系列<%= i + 1%>',
              children: {
                color: {
                  name: '颜色',
                  type: 'fill',
                  default: {
                    type: 'flat',
                    value: 'rgba(131,32,220,0.5)'
                  },
                  components: ['flat', 'linearGradient']
                }
              }
            }
          }
        }
      },
      others: {
        name: '其它',
        children: {
          animation: {
            name: '缓动动画',
            type: 'group',
            fold: true,
            children: {
              show: {
                default: true
              },
              setting: {
                type: 'suite',
                name: '动画设置',
                children: {
                  animationEasing: {
                    name: '缓动效果',
                    type: 'select',
                    options: [
                      {
                        value: 'linear',
                        label: 'linear'
                      },
                      {
                        value: 'quadraticIn',
                        label: 'quadraticIn'
                      },
                      {
                        value: 'quadraticOut',
                        label: 'quadraticOut'
                      },
                      {
                        value: 'quadraticInOut',
                        label: 'quadraticInOut'
                      },
                      {
                        value: 'cubicIn',
                        label: 'cubicIn'
                      },
                      {
                        value: 'cubicOut',
                        label: 'cubicOut'
                      },
                      {
                        value: 'cubicInOut',
                        label: 'cubicInOut'
                      },
                      {
                        value: 'quarticIn',
                        label: 'quarticIn'
                      },
                      {
                        value: 'quarticOut',
                        label: 'quarticOut'
                      },
                      {
                        value: 'quarticInOut',
                        label: 'quarticInOut'
                      },
                      {
                        value: 'quinticIn',
                        label: 'quinticIn'
                      },
                      {
                        value: 'quinticOut',
                        label: 'quinticOut'
                      },
                      {
                        value: 'quinticInOut',
                        label: 'quinticInOut'
                      },
                      {
                        value: 'sinusoidalIn',
                        label: 'sinusoidalIn'
                      },
                      {
                        value: 'sinusoidalOut',
                        label: 'sinusoidalOut'
                      },
                      {
                        value: 'sinusoidalInOut',
                        label: 'sinusoidalInOut'
                      },
                      {
                        value: 'exponentialIn',
                        label: 'exponentialIn'
                      },
                      {
                        value: 'exponentialOut',
                        label: 'exponentialOut'
                      },
                      {
                        value: 'exponentialInOut',
                        label: 'exponentialInOut'
                      },
                      {
                        value: 'circularIn',
                        label: 'circularIn'
                      },
                      {
                        value: 'circularOut',
                        label: 'circularOut'
                      },
                      {
                        value: 'circularInOut',
                        label: 'circularInOut'
                      },
                      {
                        value: 'elasticIn',
                        label: 'elasticIn'
                      },
                      {
                        value: 'elasticOut',
                        label: 'elasticOut'
                      },
                      {
                        value: 'elasticInOut',
                        label: 'elasticInOut'
                      },
                      {
                        value: 'backIn',
                        label: 'backIn'
                      },
                      {
                        value: 'backOut',
                        label: 'backOut'
                      },
                      {
                        value: 'backInOut',
                        label: 'backInOut'
                      },
                      {
                        value: 'bounceIn',
                        label: 'bounceIn'
                      },
                      {
                        value: 'bounceOut',
                        label: 'bounceOut'
                      },
                      {
                        value: 'bounceInOut',
                        label: 'bounceInOut'
                      }
                    ],
                    default: 'cubicInOut',
                    filterable: true,
                    allowCustom: true,
                    col: 12
                  },
                  animationAfterPreviousSeries: {
                    name: '各系列依次动画',
                    type: 'switch',
                    default: false,
                    col: 12
                  }
                }
              },
              enter: {
                type: 'suite',
                name: '入场动画',
                children: {
                  animationDuration: {
                    name: '初始动画时长',
                    type: 'stepper',
                    step: 1,
                    default: 1000,
                    col: 12,
                    suffix: 'ms'
                  }
                }
              },
              update: {
                type: 'suite',
                name: '更新动画',
                children: {
                  animationDurationUpdate: {
                    name: '更新动画时长',
                    type: 'stepper',
                    default: 300,
                    step: 1,
                    col: 12,
                    suffix: 'ms'
                  },
                  animationUpdateFromPrevious: {
                    name: '是否从之前位置开始',
                    type: 'switch',
                    default: true,
                    col: 12
                  }
                }
              }
            },
            enableHide: true
          },
          tooltip: {
            name: '提示框',
            type: 'group',
            fold: true,
            children: {
              show: {
                default: true
              },
              hideDelay: {
                name: '消失延迟时间',
                type: 'stepper',
                default: 100,
                step: 1,
                suffix: 'ms'
              },
              trigger: {
                type: 'suite',
                name: '触发方式',
                children: {
                  type: {
                    name: '触发类型',
                    type: 'iconRadio',
                    options: [
                      {
                        value: 'item',
                        label: '数据项',
                        src: 'item'
                      },
                      {
                        value: 'axis',
                        label: '坐标轴',
                        src: 'axis'
                      }
                    ],
                    default: 'item',
                    col: 12
                  },
                  action: {
                    name: '触发动作',
                    type: 'iconRadio',
                    options: [
                      {
                        value: 'hover',
                        label: '悬浮',
                        src: 'hover'
                      },
                      {
                        value: 'click',
                        label: '点击',
                        src: 'click'
                      }
                    ],
                    default: 'hover',
                    col: 12
                  }
                }
              },
              textStyle: {
                name: '文本样式',
                type: 'font',
                default: {
                  fontFamily: 'Microsoft Yahei',
                  fontWeight: 'normal',
                  fontSize: 14,
                  color: '#fff'
                }
              },
              axisPointer: {
                name: '坐标轴指示器',
                type: 'group',
                fold: true,
                children: {
                  show: {
                    name: '显示/隐藏',
                    type: 'boolean',
                    default: true
                  },
                  _type: {
                    name: '类型',
                    type: 'select',
                    options: [
                      {
                        name: '直线指示器',
                        value: 'line'
                      }
                    ],
                    default: 'line',
                    showInPanel: {
                      conditions: [['.show', '$eq', true]]
                    }
                  },
                  lineStyle: {
                    name: '指示线样式',
                    type: 'suite',
                    fold: true,
                    showInPanel: {
                      conditions: [
                        ['.show', '$eq', true],
                        ['._type', '$eq', 'line']
                      ]
                    },
                    children: {
                      width: {
                        name: '宽度',
                        type: 'stepper',
                        step: 1,
                        default: 1,
                        col: 12,
                        suffix: 'px'
                      },
                      _type: {
                        name: '类型',
                        type: 'iconRadio',
                        options: [
                          {
                            name: '实线',
                            value: 'solid',
                            src: 'solid'
                          },
                          {
                            name: '虚线',
                            value: 'dashed',
                            src: 'dashed-line'
                          },
                          {
                            name: '点线',
                            value: 'dotted',
                            src: 'dot-line'
                          }
                        ],
                        default: 'solid',
                        col: 12
                      },
                      color: {
                        name: '颜色',
                        type: 'fill',
                        default: '#f00',
                        col: 24
                      }
                    }
                  }
                },
                enableHide: true,
                showInPanel: {
                  conditions: [['.trigger.type', '$eq', 'axis']]
                }
              },
              bgBox: {
                name: '背景框样式',
                type: 'group',
                children: {
                  backgroundColor: {
                    name: '背景色',
                    type: 'fill',
                    default: 'rgba(0, 0, 0, 0.65)'
                  },
                  customSize: {
                    name: '自定义',
                    type: 'suite',
                    children: {
                      show: {
                        default: false
                      },
                      width: {
                        name: '宽度',
                        type: 'stepper',
                        default: 150,
                        step: 1,
                        col: 12,
                        suffix: 'px'
                      },
                      height: {
                        name: '高度',
                        type: 'stepper',
                        default: 50,
                        step: 1,
                        col: 12,
                        suffix: 'px'
                      }
                    },
                    enableHide: true
                  },
                  padding: {
                    name: '内边距',
                    type: 'stepper',
                    default: 10,
                    step: 1,
                    suffix: 'px'
                  },
                  offset: {
                    type: 'suite',
                    name: '偏移量',
                    children: {
                      xOffset: {
                        name: '水平偏移量',
                        type: 'stepper',
                        default: 6,
                        step: 1,
                        col: 12,
                        suffix: 'px'
                      },
                      yOffset: {
                        name: '垂直偏移量',
                        type: 'stepper',
                        default: 10,
                        step: 1,
                        col: 12,
                        suffix: 'px'
                      }
                    }
                  },
                  border: {
                    type: 'suite',
                    name: '边框',
                    children: {
                      borderWidth: {
                        name: '边框粗细',
                        type: 'stepper',
                        step: 1,
                        default: 0,
                        col: 12,
                        suffix: 'px'
                      },
                      borderColor: {
                        name: '边框颜色',
                        type: 'fill',
                        default: '#333',
                        col: 12
                      }
                    }
                  }
                }
              }
            },
            enableHide: true
          }
        },
        type: 'menuChild',
        mode: 'single'
      }
    }
  },
  hooks
}