/**
 * 1. 柯里化：
 * 实现 
 * add(2)(3)(4) => 9
 * add(2,3)(4) => 9
 * add(2,3,4) => 9
 */

function add(a, b, c) {
  return a + b + c
}
function curry(fn) {
  let judge = (...args) => {
    return args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)
  }
  return judge
}
var addCurry = curry(add)

console.log(addCurry(2)(3)(4))
console.log(addCurry(2, 3)(4))
console.log(addCurry(2, 3, 4))

