// Vue3还包括watchEffect, renderEffect都使用了effect,所以effect是Vue3中的核心


export function effect(fn, options = {}) {
    const effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect() // 默认就要执行
    }
    return effect
}


let uid = 0;
let activeEffect;
const effectStack = [];

function createReactiveEffect(fn, options) {
    const effect = function reactiveEffect(...args) {
        // 防止数据更新造成死循环
        if (!effect.active) {
            return options.scheduler ? undefined : fn(...args);
        }
        // 如在effect(() => { newState.num++ }),数据更新执行effect, 又更新，就造成死循环
        if (!effectStack.includes(effect)) {
            try{ // 因为执行fn时可能会报错
                effectStack.push(effect)
                activeEffect = effect
                console.log('33333', +new Date())
                return fn(...args)
            }finally{
                console.log('4444', +new Date())
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.options = options;
    effect.id = uid++;
    effect.active = true;
    effect.deps = []; // 依赖了哪些属性
    return effect
}

// state = {
//     a: 1,
//     b: 2,
// }

// effect(() => {
//     state.a + state.b
// })
// effect(() => {
//     state.a = 'a'
// })

// a对应了[effect, effect],b对应[effect]
// a: Set(effect, effect)
// b: Set(effect)
// 使用了map对应每个依赖

let targetMap = new WeakMap(); // 用法和Map一样，但是是弱引用，不会导致内存泄漏

export function track(target, type, key) {
    console.log('11111', +new Date())
    if (activeEffect === undefined) { // 说明取值不依赖于effect
        // 我们只让在effect方法中被依赖的属性去创建weakmap
        return
    }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}

export function trigger(target, type, key, value, oldvalue) {
    console.log('22222', +new Date())
    const depsMap = targetMap.get(target)
    if(!depsMap) {
        console.log('该对象还未收集')
        return
    }
    /************************************************************************************* */
    // 这里已经实现了effect的
    // |const run = (effects) => {
    // |    if (effects) {
    // |        effects.forEach(effect => {
    // |            effect()
    // |        });
    // |    }
    // |}
    // |if (key !== null) {
    // |    run(depsMap.get(key))
    // |}
    // |if (type === 'add') { // 对数组新增属性，会触发length对应的依赖，在取值时，会对length属性依赖收集
    // |    fun(depsMap.get(Array.isArray(target) ? 'length' : ''))
    // |}
    /************************************************************************************* */

    // 区别于computed做的改造
    // 计算属性要优先于effect执行，因为我们要先计算一个值出来再在effect中拿这个值。所以这里设置两个队列
    const effects = new Set();
    const computedRunners = new Set();

    const add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                if (effect.options.computed) {
                    computedRunners.add(effect)
                } else {
                    effects.add(effect)
                }
            })
        }
    }
    if (key !== null) {
        add(depsMap.get(key))
    }
    if (type === 'add') { // 对数组新增属性，会触发length对应的依赖，在取值时，会对length属性依赖收集
        add(depsMap.get(Array.isArray(target) ? 'length' : ''))
    }
    const run = (effect) => {
        if (effect.options.scheduler) {
            console.log('执行schduler')
            effect.options.scheduler()
        } else {
            console.log('执行effect')
            effect()
        }
    }
    console.log(123)
    computedRunners.forEach(run)
    effects.forEach(run)
}








