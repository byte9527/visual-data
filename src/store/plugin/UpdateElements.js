/*
 * @Author: zhangm
 * @Date: 2022-04-27 17:17:29
 * @LastEditTime: 2022-04-27 19:06:03
 * @LastEditors: zhangm
 * @Description:
 */
import Step from './Step'

export function getPrevStructureValue(newData, prevData = {}) {
  const res = {}
  Object.keys(newData).forEach(key => {
    const value = newData[key]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        res[key] = prevData[key]
      } else {
        res[key] = getPrevStructureValue(value, prevData[key])
      }
    } else {
      res[key] = prevData[key]
    }
  })
  return res
}

class UpdateElements extends Step {
  // constructor(options) {
  //   super(options)
  //   this.type = 'updateElements'
  // }

  /**
   * @description: 获取prev的数据
   * @param {*}
   * @return {*}
   */
  getPrevPayload() {
    this.prevPayload = this.payload.map(item => {
      const elementData = this.prevData.elementMap[item.id]
      return getPrevStructureValue(item, elementData)
    })
  }

  undo() {
    this.updateElements(this.prevPayload)
  }

  redo() {
    this.updateElements(this.payload)
  }
}
export default UpdateElements
