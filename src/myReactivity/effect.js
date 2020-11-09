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
            console.log(666666, options)
            try{ // 因为执行fn时可能会报错
                effectStack.push(effect)
                activeEffect = effect
                return fn(...args)
            }finally{
                console.log('effectStack22222222', effectStack)
                effectStack.pop()
                activeEffect = effectStack[effectStack.length - 1]
            }
        }
    }
    effect.options = options;
    effect.id = uid++;
    effect.active = true;
    effect.depss = []; // 依赖了哪些属性
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
let timer = 0;
export function track(target, type, key) {
    console.log('77777777', +new Date(), key, target)
    if (activeEffect === undefined) { // 说明取值不依赖于effect
        // 我们只让在effect方法中被依赖的属性去创建weakmap
        console.log('effect中的变量没有被依赖')
        return
    }
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    timer += 1
    // console.log('target = ', target)
    // console.log('depsMap1', depsMap)
    // console.log('targetMap', targetMap)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
        // console.log('depsMap2', depsMap)
    }
    // console.log('activeEffect1111', activeEffect.deps)
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
        // console.log('activeEffect222', activeEffect.deps)
    }
}

export function trigger(target, type, key, value, oldvalue) {
    const depsMap = targetMap.get(target)
    if(!depsMap) {
        return
    }
    console.log(555555555)
    /************************************************************************************* */
    // 这里已经实现了effect的
    // const run = (effects) => {
    //     // console.log('effect =========', effects)
    //     if (effects) {
    //         effects.forEach(effect => {
    //             effect()
    //         });
    //     }
    // }
    // if (key !== null) {
    //     run(depsMap.get(key))
    //     // console.log('trigger depsMap', depsMap)
    // }
    // if (type === 'add') { // 对数组新增属性，会触发length对应的依赖，在取值时，会对length属性依赖收集
    //     run(depsMap.get(Array.isArray(target) ? 'length' : ''))
    // }
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
            console.log('执行schduler', effect)
            effect.options.scheduler()
        } else {
            console.log('执行effect')
            effect()
        }
    }
    computedRunners.forEach(run)
    effects.forEach(run)
}








