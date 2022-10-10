export default {
  dataConfig: {
    option: {
      type: 'menu',
      children: {
        group: {
          name: '分组',
          type: 'group',
          props: {
            
          },
          children: {
            text: {
              type: 'input',
            },
            group_1: {
              type: 'group',
              name: 'group_1',
              children: {
                switch: {
                  name: '开关',
                  type: 'switch'
                },
                slider: {
                  name: '滑块',
                  type: 'slider'
                }
              }
            },
            group_2: {
              type: 'group',
              name: 'group_2',
              children: {
                switch: {
                  name: '下拉选择',
                  type: 'select',
                  props: {
                    options: [
                      {label: '', value: ''},
                      {label: '', value: ''},
                    ]
                  }
                },
              }
            },
          },
        },
        secondaryMenu: {
          name: '二级菜单',
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
  hooks: {
    
  }
}