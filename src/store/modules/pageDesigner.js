export default {
  state: {
    pageSetting: {
      layout: {
        type: '',
        gridLayout: {

        },
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
