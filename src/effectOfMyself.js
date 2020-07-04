// 导入自己的方法
import { reactive, effect, computed, ref } from './myReactivity'

const stateInitTwo = {
    address: '上海',
    detail: '浦东新区',
    arr: [1, 2, 3],
    age: 18,
}

const newState = reactive(stateInitTwo)

// console.log(newState); // 在页面上可以看到打印出：Proxy {address: "上海", detail: "浦东新区"},说明已经代理成功

// 代理复杂数据类型 arr: []
// console.log(newState.arr);
// 对arr的取值判断如果是复杂数据类型，再次进行代理之后
// 打印的值为：Proxy {0: 1, 1: 2, 2: 3}

// setTimeout(() => {
//     newState.arr[2] = 4
// }, 1000)

// effect(() => {
//     console.log(newState.address)
// })

const newAge = computed(() => {
    console.log('重复取值，只会执行一次effect')
    return newState.age * 2
})
effect(() => {
    console.log(newAge.value)
})

console.log('我今年', newAge.value)
console.log('她今年', newAge.value)
console.log('他今年', newAge.value)

newState.age = 200



