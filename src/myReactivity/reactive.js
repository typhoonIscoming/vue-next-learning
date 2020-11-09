import { isObject, def, toRawType, makeMap } from '../../utils'

import { mutableHandler } from './baseHandlers'

export function reactive(target) {
    // 创建一个响应式对象，目标对象可能不单单是数组，或者对象，还有set、map
    return createReactiveObject(target, mutableHandler)
}

const isObservableType = makeMap('Object,Array,Map,Set,WeakMap,WeakSet');

const canObserve = (value) => {
    return (!value["__v_skip" /* SKIP */] &&
        isObservableType(toRawType(value)) &&
        !Object.isFrozen(value));
};
// 哪些数据是可以被代理的：
// Object 、Array、Map、Set、WeakMap、WeakSet
// 非 Object.isFrozen：Object.freeze(obj)

// markRaw()函数用于让数据不可被代理,非 VNode，Vue3 的 VNode 对象带有 __v_skip: true 标识，
// 用于跳过代理（实际上，只要带有 __v_skip 属性并且值为 true 的对象，都不会是被代理）
// function markRaw(value) {
//     def(value, "__v_skip" /* SKIP */, true);
//     return value;
// }

//toRaw() 接收代理对象作为参数，并获取原始对象

function createReactiveObject(target, baseHandler) {
    if (!isObject(target)) { // 如果不是对象，直接返回即可
        return target
    }
    // console.log('======', canObserve(target))
    if (!canObserve(target)) {
        return target;
    }
    const obsered = new Proxy(target, baseHandler)
    def(target, '__v_reactive', obsered)
    return obsered
}

// 除了代理这些方法之外，还可能有其它逻辑，如果功能越多，baseHandler就越复杂，所以对baseHandler进行抽离
// 不同的类型有不同的对象
