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
  getters: {
    elSnapshot() {
      return {
        xxId: {
          parentId: '',
        },
      };
    },
  },
  mutations: {
    setSelectIds(state, data) {
      state.selectIds = data;
    },
    deleteWidget(state, data) {},
    updateWidget(state, data) {},
    addWdiget(state, data) {},
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
