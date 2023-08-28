import { defaultPageSetting } from '../../views/Designer/core/utils/constant';

export default {
  namespaced: true,
  state: {
    pageId: null,
    pageSetting: {
      name: '',
      ...defaultPageSetting(),
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
    setPageSetting(state, data) {
      state.pageSetting = data;
    },
    setPageId(state, id) {
      state.pageId = id;
    },
  },
};
