import type { CSSProperties } from 'vue'
import { isNumber, isString } from './type-utils'

type CSSKeys = keyof CSSProperties
type CSSValues = CSSProperties[CSSKeys]

export type Px2VwConfig = {
  designWidth: number
  unitPrecision: number
  maxWidth?: number
  landscapeWidth?: number
}

export type RuntimeInfo = {
  currentViewportWidth: number
}

let _config: Px2VwConfig = {
  unitPrecision: 5,
  designWidth: 1024,
  maxWidth: 1024,
}

export function initPx2Vw(config: Px2VwConfig = _config) {
  _config = config
}

export function px2vw(size: string): string
export function px2vw(number: number): string
export function px2vw(style: CSSProperties): CSSProperties
export function px2vw(
  arg: number | string | CSSProperties,
): string | CSSProperties {
  return isNumber(arg) || isString(arg)
    ? transformSingleValue(arg)
    : transformStyle(arg)
}

function transformStyle(style: CSSProperties) {
  return mapStyle(style, makeStylePropertyUseVw)
}
function mapStyle(style: CSSProperties, cb: any) {
  Object.keys(style).forEach((key) => {
    const value = style[key as CSSKeys]
    cb(style, key, value)
  })
  return style
}

function makeStylePropertyUseVw(
  style: CSSProperties,
  key: CSSKeys,
  value: string,
) {
  if (isString(style[key])) {
    style[key] = transformStyleValue(style[key]) as any
  }
}

function transformStyleValue(value: CSSValues) {
  value = value?.toString()

  const pxReg = new RegExp(/([0-9\.]+)px/, 'g')
  return value?.replace(pxReg, (matchStr, number) => {
    return transformSingleValue(number)
  })
}

function transformSingleValue(number: number | string): string {
  if (isString(number)) {
    number = parseFloat(number.replace('px', ''))
  }
  if (_config.maxWidth || _config.landscapeWidth) {
    return `min(${computedVwSize(number)}vw,${number}px)`
  }
  return `${computedVwSize(number)}vw`
}

function computedVwSize(px: number) {
  const vw = ((px / _config.designWidth) * 100).toFixed(_config.unitPrecision)
  return vw
}
