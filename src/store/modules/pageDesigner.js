export default {
  namespaced: true,
  state: {
    pageSetting: {
      name: '',
      style: {},
      layout: {
        type: 'grid',
        gridSetting: {
          showInEdit: true,
          paddingX: 16,
          paddingY: 16,
          colNum: 12,
          cellHeight: 32,
          xSpace: 8,
          ySpace: 0,
        },
        flexSetting: {
          flexDirection: 'row',
        },
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
    updatePageSetting(state, data) {
      state.pageSetting = data;
    },
  },
};
