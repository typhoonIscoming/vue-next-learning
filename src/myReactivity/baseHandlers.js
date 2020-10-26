import { isObject, hasOwn, hasChanged } from '../../utils'
import { reactive } from './reactive'
import { track, trigger } from './effect';

const get = createGeter();
const set = createSetter();

function createGeter() {
    return function getter(target, key, recevier) {
        // target[key]这样写并不好，因为可能这个值无法访问或访问不到
        // 所以这里最好用proxy + reflect
        const result = Reflect.get(target, key, recevier)
        // todo..
        track(target, 'get', key); // 依赖收集
        // console.log('用户对这个值取值了', target, key)
        // 如果result这个值还是对象，就需要对这个值再次代理
        // 所以再次引入reactive
        if (isObject(result)) {
            return reactive(result)
        }
        return result
    }
}

function createSetter() {
    return function setter(target, key, value, recevier) {
        // 在这里需要增加一个判断，当前操作是增加还是修改一个值(对对象和数组而言),如果原来的值和新设置的值一样则什么都不做
        const hasKey = hasOwn(target, key)
        const oldValue = target[key]
        const result = Reflect.set(target, key, value, recevier)
        if (!hasKey) {
            trigger(target, 'add', key)
            console.log('属性新增操作', target, key, value, oldValue)
            // 如果没有这个key，说明是对这个target的新增操作
        } else if (hasChanged(value, oldValue)) { // 判断新值和旧值是否一样的源代码中有考虑null的情况
            trigger(target, 'set', key, value, oldValue)
            console.log('这是修改操作', target, key)
            // 执行 newState.arr[1] = 4
            // 打印结果如下
            // 用户对这个值取值了 {address: "上海", detail: "浦东新区", arr: Array(3)} arr
            // baseHandlers.js:32 这是修改操作 (3) [1, 2, 3] 2
            // baseHandlers.js:36 对这个值进行了设置 (3) [1, 2, 3] 2 4
            // 这样就减少了操作次数
        }

        
        // console.log('对这个值进行了设置', target, key, value)
        // 在对数组push了一个值之后，会先push值时对数组做一个改变，再对数组的length做一次改变，而push的操作会自动改变length
        // 所以第二步改变length的长度就没有意义
        // 用户对这个值取值了 {address: "上海", detail: "浦东新区", arr: Array(3)} arr
        // baseHandlers.js:13 用户对这个值取值了 (3) [1, 2, 3] push
        // baseHandlers.js:13 用户对这个值取值了 (3) [1, 2, 3] length
        // baseHandlers.js:26 对这个值进行了设置 (3) [1, 2, 3] 3 4
        // baseHandlers.js:26 对这个值进行了设置 (3) [1, 2, 3] length 4
        return result || true
    }
}

export const mutableHandler = {
    get,
    set,
}