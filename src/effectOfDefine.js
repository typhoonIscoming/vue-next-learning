import { reactive } from './selfReavtivity'


const person = {
    name: 'xiaoxie',
    age: 18,
    data: {
        gender: 'M',
        height: 180,
    },
}

const obseredPerson = reactive(person)

console.log('obseredPerson', obseredPerson.name)
console.log('data', obseredPerson.data)
