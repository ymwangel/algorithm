// import Watcher from "./Watcher/.js";
import Dep from "./Dep.js";

function observe(value, cb) {
    Object.keys(value).forEach(key=>defineReactive(value, key, value[key], cb))
}
function defineReactive (obj, key, val, cb) {
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        enumberable: true,
        configurable: true,
        get: () => { 
            if(Dep.target) {
                dep.addSub(Dep.target)
            }
        },
        set: newVal => {
            dep.notify()
        }
    })
}
function _proxy(data) {
    const that = this
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter() {
                return that._data[key]
            },
            set: function proxySetter(val) {
                that._data[key] = val
            }
        })
    })
}
class Vue {
    constructor(options) {
        this._data = options.data
        observe(this._data, options.render)
        _proxy.call(this, options.data) // 将data中数据直接代理到vm实例上
        // this.text = 'text-text'
        // let watcher = new Watcher(this)
    }
}
let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render() {
        console.log('render')
    }
})
Dep.target = null

const test = () =>{
    return true
}

