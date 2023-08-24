/*
 * @Author: zhangm
 * @Date: 2022-04-27 17:14:25
 * @LastEditTime: 2022-04-27 17:21:56
 * @LastEditors: zhangm
 * @Description:
 */
import Step from './Step'

class AddElements extends Step {
  // constructor(options) {
  //   super(options)
  //   this.type = 'addElements'
  // }

  /**
   * @description: 获取prev的数据
   * @param {*}
   * @return {*}
   */
  getPrevPayload() {
    const { addInfo } = this.payload
    const { list } = addInfo
    this.prevPayload = list.map((item) => item.id)
  }

  undo() {
    this.deleteElements(this.prevPayload)
    this.clearSelectedElements()
  }

  redo() {
    this.addElementsInContainer(this.payload)
  }
}
export default AddElements