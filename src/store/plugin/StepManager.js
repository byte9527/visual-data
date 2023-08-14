/*
 * @Author: zhangm
 * @Date: 2022-04-25 16:41:40
 * @LastEditTime: 2022-04-29 14:52:23
 * @LastEditors: zhangm
 * @Description:
 */
import Vue from 'vue'
import AddElements from './AddElements'
import DeleteElements from './DeleteElements'
import UpdateElements from './UpdateElements'
import UpdatePageSetting from './UpdatePageSetting'
import UpdateElementList from './UpdateElementList'

let stamp = Date.now()

const stepClassMap = {
  ADD_ELEMENTS_IN_CONTAINER: AddElements,
  DELETE_ELEMENTS: DeleteElements,
  UPDATE_ELEMENTS: UpdateElements,
  UPDATE_PAGE_SETTING: UpdatePageSetting,
  UPDATE_ELEMENT_LIST: UpdateElementList
}
class StepManager extends Vue {
  constructor() {
    super()
    this.isWork = false
    this.stack = []
    // 光标
    this.cursor = null
    this.lastOperate = ''
    // 间隔
    this.interval = 100
  }

  get canUndo() {
    return this.cursor > 0
  }
  get canRedo() {
    return this.cursor < this.stack.length
  }

  collectMutation(mutation, prevData) {
    if (this.isWork) {
      return
    }

    const nowStamp = Date.now()
    if (nowStamp - stamp >= this.interval) {
      if (this.cursor !== this.stack.length) {
        this.stack = this.stack.filter((item, index) => {
          // const filterIndex = this.lastOperate === 'undo' ? this.cursor - 1 : this.cursor
          return index < this.cursor
        })
      }
      this.stack.push([])
      this.cursor = this.stack.length
    }
    stamp = Date.now()
    this.push({
      prevData,
      payload: mutation.payload,
      type: mutation.type
    })
  }

  clear() {
    this.stack = []
  }

  push(option) {
    const { type } = option
    const lastGroup = this.stack[this.stack.length - 1]
    const step = new stepClassMap[type](option)
    lastGroup.push(step)
    this.$emit('access', {
      canUndo: this.canUndo,
      canRedo: this.canRedo
    })
  }

  undo() {
    if (this.cursor === 0 || this.stack.length === 0) {
      return
    }
    this.cursor--
    this.isWork = true
    let group = this.stack[this.cursor]
    group = group.reverse()
    group.forEach((step) => {
      step.undo()
    })
    this.lastOperate = 'undo'

    this.$emit('access', {
      canUndo: this.canUndo,
      canRedo: this.canRedo
    })
    setTimeout(() => {
      this.isWork = false
    }, 0)
  }

  redo() {
    if (this.cursor === this.stack.length) {
      return
    }
    this.isWork = true
    const group = this.stack[this.cursor]
    group.forEach((step) => {
      step.redo()
    })
    this.lastOperate = 'redo'
    this.cursor++
    this.$emit('access', {
      canUndo: this.canUndo,
      canRedo: this.canRedo
    })
    setTimeout(() => {
      this.isWork = false
    }, 0)
  }
}

export default new StepManager()
