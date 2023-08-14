import { isEqual, cloneDeep, mergeWith } from 'lodash'

export default {
  state:  {
    elList: [],
    elMap: {},
    selectIds: [],
    
  },
  getters: {
  
  
  },
  mutations: {
    setSelectIds(state, data) {
      state.selectIds = data
    },

  }
}