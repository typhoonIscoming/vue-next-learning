const targetMap = new WeakMap();
let activeEffect;

export function effect(fn, options = {}) {

}


export function track(target, type, key) {
    let depsMap = targetMap.get(target);
    console.log('depsMap', depsMap)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
    }
}

export function trigger(target, type, key, value, oldvalue) {

}