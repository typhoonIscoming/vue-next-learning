import { reactive, effect, computed, ref } from '@vue/reactivity'


// reactive可以将一个对象变成响应式对象
// effect可以认为其中使用的对象发生变化之后，effect会默认执行

const stateInit = {
    name: 'xie',
    age: 28
}
const state = reactive(stateInit) // 使用了proxy代理了

effect(() => {
    console.log('state.name=', state.name)
})

setTimeout(() => {
    state.name = 'hang'
}, 2000)
// 默认会执行一次，在两秒之后，再次输出state.name的值

