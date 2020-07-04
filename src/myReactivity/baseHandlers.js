const get = createGeeter();
const set = createSetter();

function createGeeter() {
    return function getter(target, key, recevier) {
        // target[key]这样写并不好，因为可能这个值无法访问或访问不到
        // 所以这里最好用proxy + reflect
        const result = Reflect.get(target, key, recevier)
        // todo..
        console.log('用户对这个值取值了', target, key)
        return result
    }
}

function createSetter() {
    return function setter(target, key, value, recevier) {
        const result = Reflect.get(target, key, value, recevier)
        return result
    }
}

export const mutableHandler = {
    get,
    set,
}