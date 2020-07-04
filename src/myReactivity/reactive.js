import { isObject } from '../../utils'

import { mutableHandler } from './baseHandlers'

export function reactive(target) {
    // 创建一个响应式对象，目标对象可能不单单是数组，或者对象，还有set、map
    return createReactiveObject(target, mutableHandler)
}

function createReactiveObject(target, baseHandler) {
    if (!isObject(target)) { // 如果不是对象，直接返回即可
        return target
    }
    const obsered = new Proxy(target, baseHandler)
    return obsered
}

// 除了代理这些方法之外，还可能有其它逻辑，如果功能越多，baseHandler就越复杂，所以对baseHandler进行抽离
// 不同的类型有不同的对象
