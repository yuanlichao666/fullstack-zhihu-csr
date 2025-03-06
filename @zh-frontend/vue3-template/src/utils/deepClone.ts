/**
 * JSON.stringify版本，会将函数、正则表达式、Date等对象忽略或转换为不完整的形式。
 * @param obj
 * @returns
 */
function deepCloneUsingJSON<T>(obj: unknown): T {
  return JSON.parse(JSON.stringify(obj))
}

// 递归版本，无法处理循环引用，会导致无限递归，如a.b = b; b.a = a;
export function deepCloneUseRecursion<T>(obj: unknown): T {
  //   基础类型、null、undefined直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj as T
  }
  //   引用类型（数组）遍历生成新数组

  if (Array.isArray(obj)) {
    return obj.map(deepCloneUseRecursion) as T
  }
  //   引用类型（对象）遍历生成新对象
  const keys: string[] = Object.keys(obj).filter(obj.hasOwnProperty)
  const vals: any[] = Object.values(obj).map(deepCloneUseRecursion)
  return keys.reduce(
    (newObj, key, index) => ((newObj[key] = vals[index]), newObj),
    {} as Record<string, any>,
  ) as T
}

// 进阶版，使用weekmap解决循环引用问题

export function deepClone<T>(obj: unknown, map = new WeakMap()): T {
  //   基础类型、null、undefined直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj as T
  }

  //   如果处理过直接从map中取
  if (map.has(obj)) {
    return map.get(obj) as T
  }

  //   引用类型（数组）遍历生成新数组
  if (Array.isArray(obj)) {
    map.set(
      obj,
      obj.map((v) => deepClone(v, map)),
    )
    return map.get(obj) as T
  }

  //   引用类型（对象）遍历生成新对象
  const keys = Object.keys(obj).filter(obj.hasOwnProperty)
  const vals = Object.values(obj).map((v) => deepClone(v, map))
  map.set(
    obj,
    keys.reduce(
      (newObj, key, index) => ((newObj[key] = vals[index]), newObj),
      {} as Record<string, any>,
    ),
  )
  return map.get(obj) as T
}
