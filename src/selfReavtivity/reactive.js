import handler from './handler';

import { isObject } from '../../utils'


export function reactive (target) {
    // target必须是一个对象
    if (!isObject(target)) return target
    // 做Proxy的代理
    const obsered =  new Proxy(target, handler)
    return obsered
}

