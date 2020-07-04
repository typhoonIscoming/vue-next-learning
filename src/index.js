// import { reactive, effect, computed, ref } from '@vue/reactivity'

// reactive可以将一个对象变成响应式对象
// effect可以认为其中使用的对象发生变化之后，effect会默认执行

// const stateInit = {
//     name: 'xie',
//     age: 28
// }
// const state = reactive(stateInit) // 使用了proxy代理了

// effect(() => {
//     console.log('state.name=', state.name)
// })

// setTimeout(() => {
//     state.name = 'hang'
// }, 2000)
// 默认会执行一次，在两秒之后，再次输出state.name的值

// 导入自己的方法
import { reactive, effect, computed, ref } from './myReactivity'

const stateInitTwo = {
    address: '上海',
    detail: '浦东新区',
    arr: [1, 2, 3],
}

const newState = reactive(stateInitTwo)

// console.log(newState); // 在页面上可以看到打印出：Proxy {address: "上海", detail: "浦东新区"},说明已经代理成功

// 代理复杂数据类型 arr: []
// console.log(newState.arr);
// 对arr的取值判断如果是复杂数据类型，再次进行代理之后
// 打印的值为：Proxy {0: 1, 1: 2, 2: 3}

setTimeout(() => {
    newState.arr[2] = 4
    // console.log(newState.arr);
}, 1000)




