// 工具方法

export const isObject = val => typeof val === 'object' && val !== null;

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export const hasChanged = (newvalue, oldvalue) => newvalue !== oldvalue

export const isFunction = fn => typeof fn === 'function'
