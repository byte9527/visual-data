/*
 * @Author: zhangm
 * @Date: 2022-04-27 17:15:09
 * @LastEditTime: 2022-04-28 10:11:03
 * @LastEditors: zhangm
 * @Description:
 */
import Step from './Step'

class DeleteElements extends Step {
  // constructor(options) {
  //   super(options)
  //   this.type = 'deleteElements'
  // }

  /**
   * @description: 获取prev的数据
   * @param {*}
   * @return {*}
   */
  getPrevPayload() {
    const [id] = this.payload
    const { elementMap, elementIndexMap } = this.prevData
    const firstElInfo = elementIndexMap[id]
    const { parentId, indexPath = '' } = firstElInfo
    const list = this.payload.map((value) => {
      return {
        id: value,
        children: elementIndexMap[value].children
      }
    })
    const map = {}

    this.payload.forEach((val) => {
      map[val] = elementMap[val]
      const indexInfo = elementIndexMap[val]
      indexInfo.flatChildrenIds.forEach((v) => {
        map[v] = elementMap[v]
      })
    })
    this.prevPayload = {
      parentId,
      path: indexPath,
      addInfo: {
        list,
        map
      }
    }
  }

  undo() {
    this.addElementsInContainer(this.prevPayload)
  }

  redo() {
    this.deleteElements(this.payload)
  }
}

export default DeleteElements
