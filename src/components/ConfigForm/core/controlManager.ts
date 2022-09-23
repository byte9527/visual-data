import CMenu from '../controls/CMenu.vue'
import CGroup from '../controls/CGroup.vue'
import CSuite from '../controls/CSuite.vue'
import CList from '../controls/CList.vue'
import CDefault from '../controls/CDefault.vue'

export const components = {
  CMenu,
  CGroup,
  CSuite,
  CList,
  CDefault
}

type componentDictType = {
  [propName: string]: Array<string>;
}

export const componentDict: componentDictType = {
  CMenu: ['menu'],
  CGroup: ['group'],
  CSuite: ['suite'],
  CList: ['list'],
  ElInput: ['input'],
  ElInputNumber: ['input'],
  ElRadioGroup: ['radio'],
  ElSelect: ['select'],
  ElSlider: ['slider'],
  ElSwitch: ['switch'],
  ElColorPicker: ['color'],
  ElCheckbox: ['checkbox'],
  CDefault: ['default'],
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
export function getComponentTag(keyword: string): string {
  if (!keyword) {
    console.trace()
    return 'PanelDefault'
  }
  keyword = keyword.toLowerCase()
  let componentRealName
  for (const [key, value] of Object.entries(componentDict)) {
    const lowerValue = value.map((item) => item.toLowerCase())
    if (lowerValue.includes(keyword) || key.toLowerCase() === keyword) {
      componentRealName = key
    }
  }
  return componentRealName || 'CDefault'
}
