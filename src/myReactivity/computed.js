import { isFunction } from '../../utils'
import { effect, trigger, track } from './effect'

export function computed(getterOrOptions) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
        getter = getterOrOptions
        setter = () => {
            console.warn('Write operation failed: computed value is readonly')
        } // setter设置为空对象
    } else {
        getter = getterOrOptions.get
        setter = getterOrOptions.set
    }
    // computed是有缓存机制的，多次取同一个值，只会计算一遍
    // 实现的方法：
    let dirty = true; // 默认第一次取值是执行getter的
    let computed;
    // 计算属性也是一个effect
    let runner = effect(getter, {
        lazy: true, // 懒加载
        computed: true, // 这里仅仅是一个标识，表明这是一个计算属性
        scheduler: () => {
            if (!dirty) {
                dirty = true;
                // schduler的作用是计算属性的依赖发生改变时，执行这个方法schduler
                // 在这里将dirty变成true，这样再取这个计算属性的值时，就会再次执行computed的get()方法，就会执行runner
                // 这个schduler是自定义的一个方法，那什么时候去调用这个方法呢？
                // 这里就需要对effect中的trigger做一点修改
                console.log('执行computed，去触发trigger333333')
                trigger(computed, 'set', 'value')
            }
        },
    })
    let value;
    computed = {
        /******************************************* */
        // 源码中加了这两个属性
        __v_isRef: true,
        computed: true,
        // expose effect so computed can be stopped
        effect: runner,
        /******************************************* */
        get value() {
            if (dirty) {
                value = runner(); // 这里的runner就是effect中的createReactiveEffect
                console.log('computed value===44444', value)
                dirty = false
            }
            // 对计算属性的取值是取值value, 如：newage = computed(() => { return newState.age * 2 })
            // 但是我们并没有对计算属性的value做依赖收集，在改变之后也没有触发依赖更新
            // 所以这里要对value做一次手动依赖收集
            track(computed, 'get', 'value')
            return value
        },
        set value(newvalue) {
            setter(newvalue)
            console.log('set computed value55555555', newvalue)
            // console.log('setter', setter)
        }
    }
    return computed
}