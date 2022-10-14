import CDefault from '../controls/CDefault.vue'
import CMenu from '../controls/CMenu.vue'
import CGroup from '../controls/CGroup.vue'
import CSuite from '../controls/CSuite.vue'
import CList from '../controls/CList.vue'
import CSelect from '../controls/CSelect.vue'

// export declare type control =  

export function registerControl(options) {

}

export const components = {}

type componentDictType = {
  [propName: string]: Array<string>;
}

export const componentDict: componentDictType = {}

const controlConfig = [
  {test: ['default'], define: CDefault},
  {test: ['menu'], define: CMenu },
  {test: ['group'], define: CGroup},
  {test: ['suite'], define: CSuite},
  {test: ['list'], define: CList},
  {test: ['select'], define: CSelect},
  {test: ['input'], define: 'ElInput'},
  {test: ['number'], define: 'ElInputNumber'},
  {test: ['slider'], define: 'ElSlider'},
  {test: ['switch'], define: 'ElSwitch'},
  {test: ['color'], define: 'ElColorPicker'},
]

controlConfig.forEach(v => registerControl(v))

export const noTitleTypes = ["group", "menu", "list"]

export function showLabelByType(type: string) {
  return !noTitleTypes.includes(type)
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
      component = components[key] || key
    }
  }
  return component || CDefault
}

export function showTitle(type: string):boolean {
  return !noTitleTypes.includes(type)
}