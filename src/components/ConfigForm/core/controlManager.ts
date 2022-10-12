import CDefault from '../controls/CDefault.vue'
import CMenu from '../controls/CMenu.vue'
import CGroup from '../controls/CGroup.vue'
import CSuite from '../controls/CSuite.vue'
import CList from '../controls/CList.vue'
import CSelect from '../controls/CSelect.vue'

export const components = {
  CMenu,
  CGroup,
  CSuite,
  CList,
  CDefault,
  CSelect
}

type componentDictType = {
  [propName: string]: Array<string>;
}

export const componentDict: componentDictType = {
  CMenu: ['menu'],
  CGroup: ['group'],
  CSuite: ['suite'],
  CList: ['list'],
  CSelect: ['select'],
  ElInput: ['input'],
  ElInputNumber: ['number'],
  ElRadioGroup: ['radio'],
  ElSlider: ['slider'],
  ElSwitch: ['switch'],
  ElColorPicker: ['color'],
  ElCheckbox: ['checkbox'],
  CDefault: ['default']
}

export function showLabelByType(type: string) {
  const arr = ['group', 'menu', 'tabs']
  return !arr.includes(type)
}

/**
 * @description: 获取控件名称
 * @param {*} keyword
 * @return {*}
 */
export function getComponent(keyword: string) {
  if (!keyword) {
    return CDefault;
  }
  keyword = keyword.toLowerCase()
  let component;
  for (const [key, value] of Object.entries(componentDict)) {
    const lowerValue = value.map((item) => item.toLowerCase())
    if (lowerValue.includes(keyword) || key.toLowerCase() === keyword) {
      component = components[key]
    }
  }
  return component || CDefault
}

