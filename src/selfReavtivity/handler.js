import { reactive } from './reactive'
import { isObject } from '../../utils'
import { track } from './effect'

function getter(target, key, receiver) {
    // console.log(target, key, target[key], receiver)
    const result = Reflect.get(target, key, receiver)
    track(target, 'get', key)
    if (isObject(result)) {
        return reactive(result)
    }
    return result
}

function setter() {

}

export default {
    get: getter,
    set: setter,
}