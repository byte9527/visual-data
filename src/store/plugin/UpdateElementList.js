/*
 * @Author: zhangm
 * @Date: 2022-04-28 18:37:04
 * @LastEditTime: 2022-04-28 18:43:44
 * @LastEditors: zhangm
 * @Description: 
 */
import Step from './Step'

class UpdatePageSetting extends Step {
  /**
   * @description: 获取prev的数据
   * @param {*}
   * @return {*}
   */
  getPrevPayload() {
    this.prevPayload = this.prevData.elementList
  }

  undo() {
    this.updateElementList(this.prevPayload)
  }

  redo() {
    this.updateElementList(this.payload)
  }
}
export default UpdatePageSetting
