// 导入自己的方法
import { reactive, effect, computed, ref } from './myReactivity'

const stateInitTwo = {
    address: '上海',
    detail: '浦东新区',
    arr: [1, 2, 3],
    age: 18,
}

const pureObj = {
    name: '北京',
    detail: '大兴',
    age: 20,
}

const newState = reactive(stateInitTwo)

let newvalue = ref(0)


const newAge = computed({
    get() {
        return newState.age * 5
    },
    set(val) {
        console.log('set reactive data newSate')
        newState.age = val
    },
})

effect(() => {
    console.log('newvalue---------', newvalue.value)
    // console.log('pureObj', pureObj.name)
    // console.log('newState.age=======', newState.age)
    // console.log('newvalue.value========', newvalue.value)
})
effect(() => {
    console.log('newvalue+++++++', newvalue.value)
    // console.log('pureObj', pureObj.name)
    // console.log('newState.age=======', newState.age)
    // console.log('newvalue.value========', newvalue.value)
})

setTimeout(() => {
    newvalue.value = 2
    console.log('newAge222222 ========', newvalue.value)
    // pureObj.age = 30
}, 1000)




