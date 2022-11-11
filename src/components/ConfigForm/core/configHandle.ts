export const transformOptions = {
  // 不会被转换的配置
  // exclude: [{ type: 'tabs', keys: ['template'] }],
  // 会被转换的key
  keys: ['showInPanel', 'options', 'children'],
  // 字符串表达式正则
  stringExp: {
    test: /^\$\{.*\}$/,
    match: /(?<=\$\{).+(?=\})/g
  }
}

function getType(val: any) {
  let type: string = typeof val
  switch (type) {
    case 'object':
      if (Array.isArray(val)) {
        type = 'array'
      }
      break

    default:
      break
  }
  return type
}

function transformArray(target: Array<any>, context: cForm.FormContext, util: object, keyPath?: string): Array<object> {
  const arr: Array<object> = []
  target.forEach((item) => {
    const type: any = getType(item)
    switch (type) {
      case 'array':
        arr.push(transformArray(item, context, util))
        break

      case 'object':
        arr.push(objConfigTransform(item, context, util))
        break

      case 'string':
        arr.push(transformString(item, context, util))
        break

      default:
        arr.push(item)
        break
    }
  })
  return arr
}

let deps: Array<string>, options: object;
export function configHandle(target: object, context:cForm.FormContext, util = {}, opt: object): object {
  options = opt
  deps = []
  const newConfig = objConfigTransform(target, context, util),
    filterDeps = Array.from(new Set(deps))
  transformDeps(filterDeps)
  return {
    config: newConfig,
    deps: filterDeps
  }
}

/**
 * @description: 针对panelTabs的配置依赖进行转换
 * @param {*} param
 * @return {*}
 */
function transformDeps(param: Array<string>):void {
  param.forEach((item, index) => {
    if (/\[\d\]/g.test(item)) {
      param[index] = param[index].replace(/[\[\d\]]{1,}/g, '\\[\\d\\]')
    }
  })
}

export function objConfigTransform(target: cForm.AnyKeyObject, context = {form:{}}, util = {}, keyPath?:string) {
  const obj:cForm.AnyKeyObject = {}

  // target = cloneDeep(target)
  Object.keys(target).forEach((k) => {
    const value = target[k]
    const type = getType(value)
    const newKeyPath:string = keyPath ? `${keyPath}.${k}` : k
    switch (type) {
      case 'array':
        obj[k] = transformArray(value, context, util, newKeyPath)
        break

      case 'object':
        obj[k] = objConfigTransform(value, context, util, newKeyPath)
        break

      case 'string':
        obj[k] = transformString(value, context, util, newKeyPath)
        break
      case 'function':
        // 针对具备循环特征且已template作为子配置模板的套件
        if (k === 'template') {
          const firstEl = value({}, 0)
          obj[k] = value
          objConfigTransform(firstEl.children)
        } else {
          obj[k] = value
        }
        break
      default:
        obj[k] = value
        break
    }
  })
  return obj
}

function getDepByString(content: string): Array<string> {
  const reg = /form[$\w\d\[\].]+|context[.$\w\d.]+/g
  const matches = content.match(reg)
  return matches || []
}

function transformString(str: string, context: cForm.FormContext, util: object, keyPath?: string): any {
  const cb = function () {
  }
  const { test, match } = transformOptions.stringExp
  if (test.test(str)) {
    const matches:RegExpMatchArray | null = str.match(match)
    if (!matches) {
      return
    }
    const content = matches[0]

    deps = deps.concat(getDepByString(content))
    let result

    try {
      const func = new Function(
        'form',
        'context',
        'util',
        'cb',
        `return ${content}`
      )
      const { form = {} } = context
      result = func(form|| {}, context, util, cb)
    } catch (error) {
      console.warn(error)
      result = false
    }
    // 处理异步操作
    if (result instanceof Promise) {
      result.then(res => {
        if (options.asyncOperateCallback) {
          options.asyncOperateCallback(keyPath, res)
        }
      })
    } else {
      return result
    }
  } else {
    return str
  }
}

/**
 * @description: 根据config配置获取formValue的根层keys
 * @param {*} target
 * @return {*}
 */
export function getRootValueKeys(target:cForm.AnyKeyObject) {
  let keys:Array<string> = []
  Object.keys(target).forEach((key) => {
    const item = target[key]
    if (item.valuePath === false) {
      keys = keys.concat(getRootValueKeys(item.children || {}))
    } else {
      keys.push(key)
    }
  })
  return keys
}
