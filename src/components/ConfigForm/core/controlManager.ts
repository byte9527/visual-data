import CDefault from '../controls/CDefault.vue'
import CMenu from '../controls/CMenu.vue'
import CGroup from '../controls/CGroup.vue'
import CSuite from '../controls/CSuite.vue'
import CList from '../controls/CList.vue'
import CSelect from '../controls/CSelect.vue'
import CRadio from '../controls/CRadio.vue'

interface controlOption {
  test: Array<string>;
  define: any;
  key: string;
  type: string
}

export const controyTypes = {
  container: 'container',
  basic: 'basic'
}

export function registerControl(option: controlOption) {
  const { key, define, test } = option
  if (key) {
    components[key] = define
    componentDict[key] = test
  }
}

export const components = {}

type componentDictType = {
  [propName: string]: Array<string>;
}

export const componentDict: componentDictType = {}

const systemControls = [
  { test: ['default'], define: CDefault, key: 'CDefault', type: controyTypes.basic, titleInLabel: true },
  { test: ['menu'], define: CMenu, key: 'CMenu', type: controyTypes.container, titleInLabel: false },
  { test: ['group'], define: CGroup, key: 'CGroup', type: controyTypes.container, titleInLabel: false },
  { test: ['suite'], define: CSuite, key: 'CSuite', type: controyTypes.container, titleInLabel: true },
  { test: ['list'], define: CList, key: 'CList', type: controyTypes.container, titleInLabel: false },
  { test: ['select'], define: CSelect, key: 'CSelect', type: controyTypes.basic, titleInLabel: true },
  { test: ['radio'], define: CRadio, key: 'CRadio', type: controyTypes.basic, titleInLabel: true },
  { test: ['input'], define: 'ElInput', key: 'ElInput', type: controyTypes.basic, titleInLabel: true },
  { test: ['number'], define: 'ElInputNumber', key: 'ElInputNumber', type: controyTypes.basic, titleInLabel: true },
  { test: ['slider'], define: 'ElSlider', key: 'ElSlider', type: controyTypes.basic, titleInLabel: true },
  { test: ['switch'], define: 'ElSwitch', key: 'ElSwitch', type: controyTypes.basic, titleInLabel: true },
  { test: ['color'], define: 'ElColorPicker', key: 'ElColorPicker', type: controyTypes.basic, titleInLabel: true },
  { test: ['rate'], define: 'ElRate', key: 'ElRate', type: controyTypes.basic, titleInLabel: true },
]

systemControls.forEach(v => registerControl(v))

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

export function showTitle(type: string): boolean {
  return !noTitleTypes.includes(type)
}