// 工具方法

export const isObject = val => typeof val === 'object' && val !== null;

export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)

export const hasChanged = (newvalue, oldvalue) => newvalue !== oldvalue

export const isFunction = fn => typeof fn === 'function'

export const def = (target, key, value) => {
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        value
    })
}

export const toTypeString = value => Object.prototype.toString.call(value);

export const toRawType = value => toTypeString(value).slice(8, -1);

export function makeMap(str, expectsLowerCase) {
    const map = Object.create(null);
    const list = str.split(',');
    for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
}
