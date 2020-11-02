import { isObject, hasChanged } from '../../utils'
import { track, trigger } from './effect'
import { reactive } from './reactive'

function isRef(r) {
    return r ? r.__v_isRef === true : false;
}
const convert = (val) => isObject(val) ? reactive(val) : val;

let time = 0;
function createRef(rawValue) {
    if (isRef(rawValue)) {
        return rawValue
    }
    let value = convert(rawValue);
    const r = {
        __v_isRef: true,
        get value() {
            time += 1
            track(r, "get" /* GET */, 'value');
            console.log('time=======', time)
            return value
        },
        set value(newVal) {
            if (hasChanged(newVal, rawValue)) {
                rawValue = newVal;
                value = convert(newVal);
                trigger(r, 'set', 'value')
            }
        },
    }
    return r
}


export function ref(value) {
    return createRef(value);
}
