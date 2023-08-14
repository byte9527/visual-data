/*
 * @Author: zhangm
 * @Date: 2022-04-25 16:37:18
 * @LastEditTime: 2022-04-28 18:36:24
 * @LastEditors: zhangm
 * @Description:
 */
import { cloneDeep } from 'lodash'
import stepManager from './StepManager'

const matchMutationTypes = [
  'ADD_ELEMENTS_IN_CONTAINER',
  'UPDATE_ELEMENTS',
  'DELETE_ELEMENTS',
  'UPDATE_PAGE_SETTING',
  'UPDATE_ELEMENT_LIST',
]

function clonePrevData(state, store) {
  return cloneDeep({
    elementMap: state.elementMap,
    elementList: state.elementList,
    selectedIds: state.selectedIds,
    pageSetting: state.pageSetting,
    elementIndexMap: store.getters['screen/elementIndexMap']
  })
}

const dataStack = (store) => {
  let prevData
  store.subscribe((mutation, state) => {
    if (mutation.type.includes('screen/')) {
      if (mutation.type.includes('UPDATE_PAGE')) {
        prevData = clonePrevData(state.screen, store)
      }

      const type = mutation.type.replace('screen/', '')
      if (matchMutationTypes.includes(type)) {
        stepManager.collectMutation(
          {
            type,
            payload: mutation.payload
          },
          prevData
        )
        prevData = clonePrevData(state.screen, store)
        return
      }
    }
  })
}

export default dataStack
