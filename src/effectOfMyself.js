// 导入自己的方法
import { reactive, effect, computed, ref } from './myReactivity'

const stateInitTwo = {
    address: '上海',
    detail: '浦东新区',
    arr: [1, 2, 3],
    age: 18,
    virtual: 20,
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
        return newState.age + newState.virtual * 5
    },
    set(val) {
        console.log('set reactive data newSate')
        newState.age = val
    },
})

const anEffect = effect(() => {
    console.log('newvalue---------', newAge.value)
    // console.log('pureObj', pureObj.name)
    // console.log('newState.age=======', newState.age)
    // console.log('newvalue.value========', newvalue.value)
})
console.log('anEffect', anEffect)
effect(() => {
    console.log('newvalue+++++++', newAge.value)
    // console.log('pureObj', pureObj.name)
    // console.log('newState.age=======', newState.age)
    // console.log('newvalue.value========', newvalue.value)
})

setTimeout(() => {
    newAge.value = 100
    console.log('newAge222222 ========', newAge.value)
    // pureObj.age = 30
}, 1000)




