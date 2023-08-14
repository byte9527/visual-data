/*
 * @Author: liujia
 * @Date: 2020-06-06 09:30:51
 * @Last Modified by: Baifann
 * @Last Modified time: 2022-03-07 17:54:15
 * @description: screen模块的工具方法
 */
import componentGroup from '@/views/editor/EditorLeftSideBar/componentGroupConfig'
/**
 * @description 重新调整元素的zindex
 * @param list<Array> 元素列表
 * @param newOrderMap 需要重新调整位置的元素Map，key为调整之后元素在list中的index，值为元素
 */
const adjustZindex = (list, newOrderMap) => {
  const tempList = [...list]
  tempList.sort((item1, item2) => {
    return item2.zIndex - item1.zIndex
  })
  const elements = [...newOrderMap.values()]
  const otherElements = tempList.filter(
    (listItem) => !elements.includes(listItem.id)
  )

  const newElementOrderMap = new Map()
  for (let i = 0; i < tempList.length; i++) {
    if (newOrderMap.get(i)) {
      newElementOrderMap.set(newOrderMap.get(i), {
        id: newOrderMap.get(i),
        zIndex: tempList[i].zIndex
      })
    } else {
      const element = otherElements.shift()
      newElementOrderMap.set(element.id, {
        id: element.id,
        zIndex: tempList[i].zIndex
      })
    }
  }
  const diffArr = []
  tempList.forEach((item) => {
    if (item.zIndex !== newElementOrderMap.get(item.id).zIndex) {
      diffArr.push(newElementOrderMap.get(item.id))
    }
  })
  return diffArr
}

const getParentList = (list, elementsTree, elementMap) => {
  let parentElementList = elementsTree
  if (list[0].parentId) {
    parentElementList = elementMap[list[0].parentId]
    parentElementList = parentElementList.children.map((id) => elementMap[id])
    parentElementList.sort((item1, item2) => {
      return item2.zIndex - item1.zIndex
    })
  }
  return parentElementList
}

const getStandardOffset = (elements, pageSetting) => {
  let offsetX = 0
  let offsetY = 0
  const edgeX = pageSetting.width
  const edgeY = pageSetting.height
  elements.forEach((item) => {
    let currentOffsetX = 0
    let currentOffsetY = 0
    if (item.left < 0) {
      currentOffsetX = 0 - item.left
    }
    if (item.left > edgeX) {
      currentOffsetX = item.left - edgeX
    }
    offsetX =
      Math.abs(offsetX) > Math.abs(currentOffsetX) ? offsetX : currentOffsetX
    if (item.top < 0) {
      currentOffsetY = 0 - item.top
    }
    if (item.top > edgeY) {
      currentOffsetY = item.top - edgeY
    }
    offsetY =
      Math.abs(offsetY) > Math.abs(currentOffsetY) ? offsetY : currentOffsetY
  })
  return {
    left: offsetX,
    top: offsetY
  }
}

const getComponentGroupType = (componentName) => {
  const groupItem = componentGroup.find((item) =>
    item.components.includes(componentName)
  )
  if (groupItem) {
    return groupItem.name
  }
  return '未知类别'
}

const getComponentGroupIcon = (componentName) => {
  const groupItem = componentGroup.find((item) =>
    item.components.includes(componentName)
  )
  if (groupItem) {
    return groupItem.icon
  }
  return 'zidingyi'
}
/**
 * @description 将各种全局参数合并然后根据优先级排序给出最后的全局参数值
 * @param {Array} param 全局参数
 * @param {Object} value 全局参数对应的值
 * @param {Object} element 元素对应的值
 */
const mergeParamAndValue = (param = [], value = {}, element = {}) => {
  const valueTypes = [
    'UserOperateValue',
    'PassInDefault',
    'InteractiveComponentDefault'
  ]
  // 不下钻又用到了全局参数的回退方案
  let unDrillDownParam = new Set()
  if (
    element.interactionForm &&
    element.interactionForm.isDrillDown === false
  ) {
    if (element.region === '数据库') {
      // 找到所有引用的字段
      const matchRes = element.sqlContent.match(/\$\s*\{\s*([^\s${}]+)\s*\}/g)
      if (matchRes) {
        unDrillDownParam = new Set(
          matchRes.map((matchItem) => {
            return matchItem.replace(/\$\s*\{\s*([^\s${}]+)\s*\}/g, '$1')
          })
        )
      }
    }
  }
  return new Map(
    param.map((item) => {
      let realValue = item.default
      for (let index = 0; index < valueTypes.length; index++) {
        const type = valueTypes[index]

        if (
          value[item.name] &&
          Array.isArray(value[item.name][type]) &&
          value[item.name][type].length > 0
        ) {
          const firstValue = value[item.name][type][0]
          if (
            unDrillDownParam.has(item.name) &&
            element.id === firstValue.origin
          ) {
            if (value[item.name][type].length < 2) {
              break
            } else if (value[item.name][type].length >= 2) {
              realValue = value[item.name][type][1].value
              break
            }
          } else {
            realValue = firstValue.value
            break
          }
        }
      }
      return [
        item.name,
        {
          name: item.name,
          type: item.type,
          value: realValue
        }
      ]
    })
  )
}

/**
 * @description 将字符串中的内容用全局参数对应的值替换,全局参数表达式的特殊字符只允许有\n换行符或者br换行符，全局变量命名可以由 下划线、字母、数字组成
 * @param {String} str 需要替换的字符串
 * @param {Object} globalParam 全局参数
 * @param {Object} globalParamValue 全局参数的值
 * @param {Object} addtionalParam 额外的值
 */
const replaceStrByGlobalParam = (
  str,
  globalParam,
  globalParamValue,
  addtionalParam = {}
) => {
  str = str.replace(/&nbsp;/g, ' ')
  const reg =
    /\$(\<.*br.*\/?\>)*\n*\{(\<.*br.*\/?\>)*\n*[^\s{}$]+(\<.*br.*\/?\>)*\n*\}/g
  const mergedParam = mergeParamAndValue(globalParam, globalParamValue)
  const result = str.replace(reg, function(item) {
    let itemTemp = item.replace(/^\$\{([^${}]*)\}$/g, '$1')
    const divTemp = document.createElement('div')
    divTemp.innerHTML = itemTemp
    itemTemp = divTemp.innerText
    const key = itemTemp.replace(/(\s|\n|\r)*(\S+)(\s|\n|\r)*/, '$2')
    if (key) {
      const globalMatchValue = mergedParam.has(key)
        ? mergedParam.get(key).value || ''
        : item
      const realValue =
        typeof addtionalParam[key] !== 'undefined'
          ? addtionalParam[key]
          : globalMatchValue
      return realValue
    } else {
      return item
    }
  })
  return result
}

/**
 * @description 得到选中元素的父元素
 * @param {Array} selectedElements
 * @param {Object} elementMap
 */
const getSelectContainer = (selectedElements, elementMap) => {
  if (selectedElements.length === 0) {
    return false
  }
  const firstElementId = selectedElements[0]
  const firstElement = elementMap[firstElementId]
  if (
    selectedElements.length === 1 &&
    firstElement.children &&
    (firstElement.children.length > 0 || firstElement.isContainer)
  ) {
    return firstElement
  }
  if (firstElement.parentId) {
    return elementMap[firstElement.parentId]
  }
  return false
}

/**
 * @description 遍历元素列表
 * @param {Array} tree 需要遍历的树
 * @param {Object} elementMap 元素的id，obj索引对象
 * @param {Function} op 需要对元素进行的操作
 */
const recursionElements = (tree, elementMap, op = () => {}) => {
  if (Array.isArray(tree) && tree.length > 0) {
    tree.forEach((item) => {
      op(item)
      const children = (item.children || []).map((child) => elementMap[child])
      recursionElements(children, elementMap, op)
    })
  }
}

/**
 * @description 判断是否是tab容器的嵌套
 * @param {Object} container 父级（目标）元素
 * @param {Array} elements 元素列表
 */

export {
  adjustZindex,
  getParentList,
  getStandardOffset,
  getComponentGroupType,
  getComponentGroupIcon,
  mergeParamAndValue,
  replaceStrByGlobalParam,
  getSelectContainer,
  recursionElements
}
