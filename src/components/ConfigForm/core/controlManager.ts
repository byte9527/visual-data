
// import PanelSuite from '../PanelSuite'

export const controls = {
}

export function injectCommonMixin(component) {
  // component.mixins = component.mixins || []
  // component.mixins.push(controlMixin)
}

export const componentDict = {
  // PanelTree: ['tree'],
}

export function showLabelByType(type:string) {
  const arr = ['group', 'menu', 'tabs']
  return !arr.includes(type)
}

/**
 * @description: 获取控件名称
 * @param {*} keyword
 * @return {*}
 */
export function getComponentName(keyword: string): string {
  if (!keyword) {
    console.trace()
    return 'PanelDefault'
  }
  keyword = keyword.toLowerCase()
  let componentRealName
  for (const [key: string, value:Array<string>] of Object.entries(componentDict)) {
    const lowerValue = value.map((item) => item.toLowerCase())
    if (lowerValue.includes(keyword) || key.toLowerCase() === keyword) {
      componentRealName = key
    }
  }
  return componentRealName || 'PanelDefault'
}
