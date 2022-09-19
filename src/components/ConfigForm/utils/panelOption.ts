export function generateFontSize({ min = 12, max = 100, step = 1 } = {}) {
  const fontOptions = []
  for (let i = min; i <= max; i += step) {
    fontOptions.push({
      label: i,
      value: i
    })
  }
  return fontOptions
}

export default {
  controls: {
    font: {
      fontFamilyOptions: [
        {
          label: '微软雅黑',
          value: '微软雅黑'
        },
        { label: 'DINPro', value: 'DINPro-Medium' },
        { label: '庞门正道', value: '庞门正道' },
        { label: 'FZZZ', value: 'FZZZ' },
        { label: 'Impact', value: 'Impact' },
        { label: 'PangMen', value: 'PangMen' },
        { label: 'PingHeavy', value: 'PingHeavy' },
        { label: 'PingRegular', value: 'PingRegular' },
        { label: '字魂35号', value: '字魂35号' }
      ],
      fontSizeOptions: generateFontSize()
    },
    colorPicker: {
      tabPane: ['pure'], 
      type: 'pure', 
      color: '' 
    },
    upload: {},
  },

  util: {}
}
