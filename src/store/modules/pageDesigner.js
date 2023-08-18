export default {
  state: {
    pageSetting: {
      layout: {
        type: '',
        gridLayout: {},
      },
    },
    elList: [],
    elMap: {},
    selectIds: [],
  },
  getters: {},
  mutations: {
    setSelectIds(state, data) {
      state.selectIds = data;
    },
  },
};

const widgetPropertyDemo = {
  layout: {
    grid: {
      x: 0,
      y: 0,
      w: 4,
      h: 4,
    },
  },
  style: {
    border: {},
    background: {},
    size: {
      width: '',
      height: '',
    },
  },
  property: {},
  data: {},
};
