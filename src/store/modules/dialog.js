/*
 * @Description: 处理模态框
 * @Author: songyuan
 * @Date: 2021-11-15 19:10:48
 * @LastEditors: songyuan
 * @LastEditTime: 2021-11-15 19:10:48
 */
const state = {
  dialogCollection: false
}

const mutations = {
  DIALOG_COLLECTION_STATE: (s) => {
    state.dialogCollection = !s.dialogCollection
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
