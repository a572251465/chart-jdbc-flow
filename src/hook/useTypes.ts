export enum ITypes {
  Number = 'Number',
  String = 'String',
  Function = 'Function',
  Boolean = 'Boolean',
  Object = 'Object',
  Array = 'Array'
}

const isType = (type: ITypes) => {
  return <T>(value: T): boolean => {
    const res = Object.prototype.toString.call(value)
    return res === `[object ${type}]`
  }
}

const isArray = isType(ITypes.Array)
const isFunction = isType(ITypes.Function)
const isString = isType(ITypes.String)
const isObject = isType(ITypes.Object)

const getType = <T>(value: T): string => {
  const res = Object.prototype.toString.call(value)
  const resArr = res.match(/\[object ([a-zA-Z]+)\]/)
  return resArr ? resArr[1].toLowerCase() : ''
}

/**
 * @author lihh
 * @description 通过高阶函数实现类型判断
 */
export { isArray, isFunction, isString, isObject, getType }
