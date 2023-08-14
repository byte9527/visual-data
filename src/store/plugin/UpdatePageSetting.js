/*
 * @Author: zhangm
 * @Date: 2022-04-27 19:12:33
 * @LastEditTime: 2022-08-15 19:36:41
 * @LastEditors: zhangm
 * @Description:
 */
import Step from './Step'
import { getPrevStructureValue } from './UpdateElements'

class UpdatePageSetting extends Step {
  /**
   * @description: 获取prev的数据
   * @param {*}
   * @return {*}
   */
  getPrevPayload() {
    const elementData = this.prevData.pageSetting
    this.prevPayload = getPrevStructureValue(this.payload, elementData)
  }

  undo() {
    this.updatePageSetting(this.prevPayload)
  }

  redo() {
    this.updatePageSetting(this.payload)
  }
}
export default UpdatePageSetting
