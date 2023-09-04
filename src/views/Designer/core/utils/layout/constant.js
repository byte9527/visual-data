const layoutDictionary = {
  grid: {
    name: '栅格布局',
    key: 'grid',
    description: '',
    config: {}
  },
  flex: {
    name: '栅格布局',
    key: 'flex',
    description: '',
    config: {}
  },
  fluid: {
    name: '流式布局',
    key: 'fluid',
    description: '',
    config: {}
  },
  position: {
    name: '定位布局',
    key: 'position',
    description: '',
    config: {}
  }
};

export const layoutOptions = Object.values(layoutDictionary).map((item) => {
  return {
    label: item.name,
    value: item.key
  };
});
