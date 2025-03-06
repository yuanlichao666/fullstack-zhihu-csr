import { isArray, isObject, isString } from '@vue/shared'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
  isPlainObject, //纯粹的对象类型{}，不包括null、array、date等其他内置对象类型
} from '@vue/shared'
export { isNil } from 'lodash-unified' //null 或undefined
export const isUndefined = (val: any): val is undefined => val === undefined
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean'
export const isNumber = (val: any): val is number => typeof val === 'number'

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)
