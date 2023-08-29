/*
 * @Author: zhangm
 * @Date: 2023-07-06 20:39:24
 * @LastEditTime: 2023-08-29 14:26:38
 * @LastEditors: zhangm
 * @Description:
 * @FilePath: \visual-data\src\components\ConfigForm\utils\proxyHelp.js
 */
export function deepSet(target, keyPath, value) {
  const keys = keyPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  let temp = target;
  const keyLength = keys.length;
  keys.forEach((k, index) => {
    if (index !== keyLength - 1) {
      if (temp[k]) {
        temp = temp[k];
      } else {
        temp[k] = {};
        temp = temp[k];
      }
    } else {
      temp[k] = value;
    }
  });
}

export function deepGet(target, keyPath) {
  const keys = keyPath.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  let temp = target;
  const keyLength = keys.length;
  keys.forEach((k, index) => {
    keys,
    target,
    keyPath
    if (temp[k] === undefined && index === keyLength - 2) {
      temp[k] = {};
    } 
    
    temp = temp[k]
  });
  return temp;
}
