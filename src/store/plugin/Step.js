/*
 * @Author: zhangm
 * @Date: 2022-04-27 17:13:30
 * @LastEditTime: 2022-04-28 18:43:16
 * @LastEditors: zhangm
 * @Description: 
 */
import { mapMutations, mapState, mapGetters } from 'vuex'
import store from '@/store'

export default class Step {
  constructor(options) {
    this.payload = options.payload
    this.prevData = options.prevData
    this.type = options.type
    // 获取undo的payload
    this.getPrevPayload()
    // 释放prevData
    this.prevData = null
    this.$store = store
  }
}

function extendStep() {
  const methodMap = mapMutations('screen', {
    deleteElements: 'DELETE_ELEMENTS',
    clearSelectedElements: 'CLEAR_SELECTED_ELEMENTS',
    addSelectedElements: 'ADD_SELECTED_ELEMENTS',
    setSelectElements: 'SET_SELECTED_ELEMENTS',
    deleteSelectedElements: 'DELETE_SELECTED_ELEMENTS',
    copyElements: 'COPY_ELEMENTS',
    updateElements: 'UPDATE_ELEMENTS',
    updateElementsRuntimeData: 'UPDATE_ELEMENTS_RUNTIME_DATA',
    updatePageSetting: 'UPDATE_PAGE_SETTING',
    addResponseElements: 'ADD_RESPONSE_ELEMENT',
    addElementsInContainer: 'ADD_ELEMENTS_IN_CONTAINER',
    deleteChildren: 'DELETE_CHILDREN',
    updateElementList: 'UPDATE_ELEMENT_LIST'
  })

  const stateMap = mapState('screen', {
    selectedIds: 'selectedIds',
    elementList: 'elementList',
    runtimeDataMap: 'runtimeDataMap'
  })

  const getterMap = mapGetters('screen', {
    pageSetting: 'pageSetting',
    elementMap: 'elementMap',
    elementIndexMap: 'elementIndexMap',
    elementIds: 'elementIds',
    selectedElements: 'selectedElements'
  })
  const getProps = { ...stateMap, ...getterMap }

  Object.assign(Step.prototype, methodMap)
  Object.keys(getProps).forEach((key) => {
    const func = getProps[key]
    Object.defineProperty(Step.prototype, key, {
      get: func
    })
  })
}

setTimeout(() => {
  extendStep()
}, 0)