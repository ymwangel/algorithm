
// vue3 实现vue3 的 reactive
const bucket = new WeakMap()
var activeEffect
function effect (fn) {
  activeEffect = fn
  fn()
}
function track (target, key) {
  if (!activeEffect) return
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}
function trigger (target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  effects && effects.forEach(fn => fn())
}
function reactive (state) {
  return new Proxy(state, {
    get (target, key) {
      const value = target[key]
      track(target, key)
      console.log(`get ${key}: ${value}`)
      return value
    },
    set (target, key, newValue) {
      console.log(`set ${key}: ${newValue}`)
      target[key] = newValue
      trigger(target, key)
    }
  })
}
const $app = document.querySelector('#app')
const nameObj = reactive({
  name: 'fatfish'
})
const ageObj = reactive({
  age: 100
})

effect(() => {
  console.log('执行了effect')
  $app.innerText = `hello ${nameObj.name}, are you ${ageObj.age} years`
})

setTimeout(() => {
  nameObj.name = 'Vue3'
}, 1000)

setTimeout(() => {
  ageObj.age = 18
}, 2000)
