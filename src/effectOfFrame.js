import { reactive, effect, computed, ref } from '@vue/reactivity'


// reactive可以将一个对象变成响应式对象
// effect可以认为其中使用的对象发生变化之后，effect会默认执行

const stateInit = {
    name: 'xie',
    age: 28,
    // __v_reactive: 'hahah',
}

const city = {
    name: 'shanghai',
    chinenseName: '上海'
}

const state = reactive(stateInit) // 使用了proxy代理了

effect(() => {
    console.log('state.age', state.age)
    console.log('state.age', state)
})
// const newState = reactive(stateInit)
// console.log('state=======', state, state === newState, newState)
// effect(() => {
//     console.log('state.name=', state.name)
// })

// const computedAge = computed(() => {
//     console.log('age 的计算属性')
//     return state.age * 2
// })

// console.log('computedAge=', computedAge.value)
// computedAge =    
// effect: ƒ reactiveEffect(...args)
// value: "我今年28岁"
// __v_isRef: true
// 在computed中打印日志，可以发现，外部不调用计算属性的值，是不会执行computed的
// 只有外部使用了计算属性的value(computedAge.value)，才会执行
// 说明这是一个懒effect(lazy为true的effect)

setTimeout(() => {
    state.age = 30
    // console.log('computedAge in settimout', computedAge.value)
}, 2000)
// 默认会执行一次，在两秒之后，再次输出state.name的值

