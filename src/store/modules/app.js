/*
 * @Description:
 * @Version: 1.0
 * @Autor: chengweihang
 * @Date: 2022-01-05 09:39:11
 * @LastEditors: zhangm
 * @LastEditTime: 2022-02-16 16:25:52
 */

const state = {
  container: {
    name: '',
    namespace: '',
    version: '',
    displayName: '',
    resourceType: ''
  },
  appInfo: {}
}
const getters = {
  name: (state) => state.container.name,
  namespace: (state) => state.container.namespace,
  version: (state) => state.container.version,
  displayName: (state) => state.container.displayName,
  resourceType: (state) => state.container.resourceType,

}

const mutations = {
  UPDATE_CONTAINER_INFO: (state, params) => {
    state.container = {
      name: params.name,
      namespace: params.namespace,
      version: params.version,
      displayName: params.displayName,
      resourceType: params.resourceType
    }
    state.appInfo = params.appInfo
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
