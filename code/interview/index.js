/**
 * Q: 解析 URL Params 为对象
 * 例如：
 * let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
 * parseParam(url)
 * { user: 'anonymous',
 *  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 *  city: '北京', // 中文需解码
 *  enabled: true, // 未指定值得 key 约定为 true
 * }
*/
function parseParam(url) {
  const paramsStr = /.+?(.+)$/.exec(url)[1]
  const paramsArr = paramsStr.split('&')
  console.log(paramsArr)
  
}

/**
 * =======================================================================================================================
 */

/**
 * Symbol: 唯一性
 * Symbol 与 Symbol.for()却别
 * Symbol.for() 属性是全局的；Symbol()属性是局部的
 * Symbol属性只能用 Symbol.getOwnPropertySymbols(obj)来获取symbol属性
 * Reflect.ownKeys(obj)获取所有的共有属性，包括symbol属性
 */

/**
 * ======================================================================================================================================================
 */

 /**
  * Reflect
  */

/**
 * ======================================================================================================================================================
 */

/**
 * new 的过程
 * 1. 创建一个新对象：newObj
 * 2. 构造函数的 prototype 被 赋值 给 newObj 的 __proto__
 * 3. 将 newObj 赋值给 当前的 this
 * 4. 执行构造函数
 * 5. 如果构造函数没有返回其他对象，那么 new  表达式中的函数调用 会 自动返回这个新对象 newObj，如果返回的不是对象，将被忽略
 */

function newOperator(ctor) {
  if(typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function'
  }
  newOperator.target = ctor
  var newObj = Object.create(ctor.prototype)  
  console.log(newObj.__proto__ == ctor.prototype)  // newObj.__proto__ = ctor.prototype
  var argsArr = [].slice.call(arguments,1)
  var ctorReturnResult = ctor.apply(newObj, argsArr)  // 将 当前的 this 指向 newObj, 查看ctor()返回值类型
  var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  var isFunction = typeof ctorReturnResult === 'function'
  if(isObject || isFunction) {
    return ctorReturnResult
  }
  return newObj
}
function Student(name,age) {
  this.name = name
  this.age = age
}
Student.prototype.doSth = function() {
  console.log(this.name)
}
var student1 = newOperator(Student, '若' ,18)
var student2 = newOperator(Student, '川' ,18)
console.log(student1,student2)
student1.doSth()
student2.doSth()
console.log(student1.__proto__ === Student.prototype) //true
console.log(student2.__proto__ === Student.prototype) //true
console.log('student1 instanceof Student', student1 instanceof Student) //true
console.log(Object.getPrototypeOf(student1) === Student.prototype)  //true


/**
 * ======================================================================================================================================================
 */

/**
 * apply和call的模拟实现
 * apply原理：
 * 1.将函数设为对象的属性(改变this)
 * 2.执行该函数
 * 3.删除该函数
*/
Function.prototype.apply = Function.prototype.apply || function(context,arr) {
  var context = new Object(context) || window
  context.fn = this

  var result
  if(!arr) {
    result = context.fn()
  }else {
    var args = []
    for(let i=0;i<arr.length;i++){
      args.push('arr[' + i + ']')
    }
    result = eval('context.fn(' + args + ')')
  }
  delete context.fn
  return result
}

Function.prototype.call = Function.prototype.call || function(context) {
  var context = new Object(context) || window
  context.fn = this
  var args = []
  for(let i=0;i<arguments.length-1;i++){
    args[i] = arguments[i+1]
  }
  return this.apply(context,args)
}

/**
 * 用 apply 实现 bind
 * bind MDN 原理
 * 1. 改变原函数的this指向，即绑定this
 * 2. 返回原函数的拷贝（称为绑定函数）
 * 3. 正常调用绑定函数时，将给定的参数列表 作为原函数 的参数序列的 前若干项；若new调用绑定函数，thisArg参数无效，也就是new操作符修改this指向的优先级更高
*/

Function.prototype.bind = function(thisArg) {
  if(typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
  }
  var args = [].slice.call(arguments,1)
  var self = this
  var Empty = function () {}
  var fBound = function() {
    return self.apply(
      this instanceof Empty ? this : thisArg,
      args.concat([].slice.call(arguments))
    )
  }
  // 维护原型关系
  if(this.prototype) { //如果this是箭头函数 ，是没有原型的
    Empty.prototype = self.prototype
  }
  fBound.prototype = new Empty()
  return fBound
}

/**
 * ======================================================================================================================================================
 */

/**
 * 柯里化 与 反柯里化
 * 柯里化：
 * 1. 参数复用
 * 2. 提前返回
 * 3. 延迟计算 / 运行
 * 4. 对高阶函数降阶处理，缩小适用范围
 */

function currying (fn,...rest1) {
  let args = [].concat(rest1)
  return function next(...rest2) {
    if(rest2.length>0){
      args = args.concat(rest2)
      return next
    }else{
      return fn.apply(null, args.concat(rest2))
    }
  }
}

// 实现 add(1)(2,3)(4)() = 10 的效果

var add = currying(function(...args){
  return args.length == 0 ? 0 : args.reduce((a,b)=>a+b)
})
// console.log((add(1,2,3)(4)).toString())
console.log(add(1,2)())

/**
 * 改进：输入任意 个 参数都可以 求值
*/

function curryingAnyParam (fn,...rest1) {
  let args = [].concat(rest1)
  
  function next(...rest2) {
    args = args.concat(rest2)
    return next
  }

  next.toString = function() {
    return fn.apply(null,args)
  }
  next.valueOf = () => {
    return fn.apply(null,args)
  }
  return next
}

var add1 = curryingAnyParam(function(...args){
  return args.length == 0 ? 0 : args.reduce((a,b)=>a+b)
})
let result = add1(89,10)

console.log(result) 
console.log(result.valueOf(), result+ 10) //99 109

/**
 * 反柯里化
 * 1. 延迟传参数
 * 2. 扩大适用范围，扩展
 */
function unCurrying (fn){
  return function(tar,...args){
    return fn.apply(tar, args)
  }
}
// 给 arguments 这样的 类数组 push 一个元素
var push = unCurrying(Array.prototype.push)
function execPush() {
  push(arguments,4)
  console.log(arguments) // [1,2,3,4]
}
// console.log(execPush(1,2,3))
execPush(1,2,3)

/**
 * ======================================================================================================================================================
 */

/**
 * 创建型模式
 * 1. 工厂方法模式、
 * 2. 抽象工厂模式、
 * 3. 单例模式、
 * 4. 建造者模式、
 * 5. 原型模式
 * 
 * 结构型模式：
 * 1. 适配器模式
 * 2. 装饰器模式
 * 3. 代理模式
 * 4. 外观模式
 * 5. 桥接模式
 * 6. 组合模式
 * 7. 享元模式
 * 
 * 行为模式：
 * 1. 策略模式
 * 2. 模版方法模式
 * 3. 观察者模式
 * 4. 迭代子模式
 * 5. 责任链模式
 * 6. 任务模式
 * 7. 备忘录模式
 * 8. 状态模式
 * 9. 访问者模式
 * 10. 中介者模式
 * 11. 解释器模式
 * 
 * 并发型模式
 * 
 * 线程池模式
*/

/**
 *  工厂模式： 提供创建一个对象的接口
 * 应用： Vue.component 异步组建、React.createElement
 * */ 
class Product {
  constructor(name) {
    this.name = name
  }
  init() {}
}

class Creator { //工厂对象
  create(name){
    return new Product(name)
  }
}

const creator = new Creator()
const p =creator.create('lisi')

/**
 * 单例模式
 * 应用：Vuex 中的 Store 、Redux中 Store
 */
class SingleObject {
  login() {}
}
SingleObject.getInstance = (function() {
  let instance 
  return function () {
    if(!instance){
      instance = new SingleObject()
    }
    return instance
  }
})()
const obj1 = SingleObject.getInstance()
const obj2 = SingleObject.getInstance()
console.log('obj1 === obj2: ',obj1 === obj2)

/**
 * 适配器模式： 用来解决 两个接口 不兼容问题， 由一个对象来包装 不兼容的对象，比如：参数转化，允许直接访问
 * 应用场景：Vue 的 computed 、
 */
class Adapter {
  specificRequest(){
    return 'Made in Germany'
  }
}
class Target {
  constructor() {
    this.adapter = new Adapter()
  }
  request() {
    const info = this.adapter.specificRequest()
    console.log(`${info} - 转换 - Made In China`)
  }
}
const target = new Target()
console.log(target.request())

/**
 * ======================================================================================================================================================
 */

/** 装饰器模式(AOP)：在不改变对象自身的基础上， 动态的给某个对象 添加新的功能，同时又不改变其他接口 
 * 应用场景：ES7装饰器、
 * 
*/
class Plane {
  fire() {
    console.log('Fire an ordinary missile')
  }
}
class Missile {
  constructor(plane) {
    this.plane = plane
  }
  fire(){
    this.plane.fire()
    console.log('Fire an missile')
  }
}
let plane = new Plane()
plane = new Missile(plane)
console.log(plane.fire())

/**利用 AOP 给函数 动态添加功能，即Function的 after 或者 before */
Function.prototype.before = function(beforeFn) {
  const _self = this
  return function() {
    beforeFn.apply(this,arguments)
    return _self.apply(this,arguments)
  }
}
Function.prototype.after = function(afterFn){
  const _self = this
  return function(){
    // afterFn.apply(this, arguments)
    const ret = _self.apply(this,arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}
let func = function(){
  console.log('2')
}
func = func.before(function(){
  console.log(1)
}).after(function(){
  console.log('3')
})
func()

/**
 * ======================================================================================================================================================
 */

/**
 * 代理模式： 为其他对象 提供一种代理，以便控制对这个对象对访问，不能直接访问目标对象
 * 应用：ES6 的proxy 、Vuex 中对于getters 访问、图片预加载
 */

class Flower{
  constructor(name){
    this.name = name
  }
}
class Jack {
  constructor(target){
    this.target = target
  }
  sendFlower(target){
    const flower = new Flower('rose')
    this.target.receiveFlower(flower)
  }
}

class Rose{
  receiveFlower(flower){
    console.log('received : ' + flower)
  }
}

class ProxyObj {
  constructor () {
    this.target = new Rose()
  }
  receiveFlower(flower){
    this.target.receiveFlower(flower.name)
  }
  sendFlower(flower){
    this.target.receiveFlower(flower)
  }
}

const proxyObj = new ProxyObj()
const jack = new Jack(proxyObj)
jack.sendFlower(proxyObj)

/**
 * ======================================================================================================================================================
 */


/**
 * ======================================================================================================================================================
 */

/**
 * 有两种特殊字符。第一种字符可以用一比特0来表示。第二种字符可以用两比特(10 或 11)来表示。
 * 
 * 现给一个由若干比特组成的字符串。问最后一个字符是否必定为一个一比特字符。给定的字符串总是由0结束。
 * 
 * 示例 1:
 * 输入: 
 * bits = [1, 0, 0]
 * 输出: True
 * 解释: 
 * 唯一的编码方式是一个两比特字符和一个一比特字符。所以最后一个字符是一比特字符。
 * 
 * 示例 2:
 * 输入: 
 * bits = [1, 1, 1, 0]
 * 输出: False
 * 解释: 
 * 唯一的编码方式是两比特字符和两比特字符。所以最后一个字符不是一比特字符。
 * 
 * 注意:
 * 1 <= len(bits) <= 1000.
 * bits[i] 总是0 或 1.
 */
var isOneBitCharacter = function(bits) {
  let i=0;
  while(i<bits.length-1){
    i = bits[i] == 1 ? i + 2 : i + 1
  }
  return i === bits.length - 1 
};
console.log(isOneBitCharacter([1,1,1,0])) // false
console.log(isOneBitCharacter([1,1,0])) // true
console.log(isOneBitCharacter([1,1,0,0,1,0,0])) // true
console.log(isOneBitCharacter([1,1,0,0,1,0,0,1,0])) // false

/**
 * 二进制求和
 * 给定两个二进制字符串，返回他们的和（用二进制表示）。
 * 输入为非空字符串且只包含数字 1 和 0。
 * 示例 1:
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 
 * 示例 2:
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 */
var addBinary = function(a, b) {
  let len = a.length > b.length ? a.length : b.length
  let _a = a.length == len ? a : new Array(len-a.length).fill(0).join('') + a
  let _b = b.length == len ? b : new Array(len-b.length).fill(0).join('') + b
  let result = ''
  let temp = 0
  let i = len-1
  while(i>=0){
    let s = Number(_a[i]) + Number(_b[i]) + temp
    temp = s >= 2  ? 1 : 0
    result = ((s == 0 || s == 2) ? 0 : 1) + result
    i--
  }
  temp == 1 ? result = temp + result : void null
  return result
};
console.log(addBinary('1010','1011'))
console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
"110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"))
console.log(addBinary('1100','1101'))
console.log(addBinary('11','1'))
console.log('==============================')

/**
 * 实现promise
 * https://juejin.im/post/5b16800fe51d4506ae719bae
 */

const isFunction = variable => typeof variable === 'function'
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
 class MyPromise {
  constructor(handle) {
    if(!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as parameter')
    }
    // 添加状态
    this._status = PENDING
    // 添加值
    this._value = undefined

    this._fulfilledQueues = []
    this._rejectedQueues = []

    //执行 handle
    try {
      handle(this._resolve.bind(this),this._reject.bind(this))
    }catch(e) {
      this._reject(e)
    }
  }

  _resolve(val) {
    if(this._status !== PENDING) return
    // 依次执行成功队列中的函数，并清空队列
    const run = () => {
      this._status = FULFILLED
      this._value = val
      let cb 
      while(cb = this._fulfilledQueues.shift()) {
        cb(val)
      }
    }
    setTimeout(run,0)
  }

  _reject(err) {
    if(this._status !== PENDING) return
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb 
      while(cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    setTimeout(run, 0)
  }

  then(onFulfilled, onRejected) {
    const {_status, _value} = this
    return new MyPromise((onFulfilledNext,onRejectedNext)=>{
      let fulfilled = value => {
        debugger
        try {
          if(!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          }else {
            let res = onFulfilled(value)
            if(res instanceof MyPromise) {
              res.then(onFulfilledNext,onRejectedNext)
            }else {
              onFulfilledNext(res)
            }
          }
        }catch(err) {
          onRejectedNext(err)
        }
      }
      let rejected = error => {
        try {
          if(!isFunction(onRejected)) {
            onRejectedNext(error)
          }else {
            let res = onRejected(error)
            if(res instanceof MyPromise) {
              res.then(onFulfilledNext,onRejectedNext)
            }else {
              onRejectedNext(error)
            }
          }
        }catch(err) {
          onRejectedNext(err)
        }
      }
      switch(_status) {
        case PENDING: 
          debugger
          this._fulfilledQueues.push(onFulfilled)
          this._rejectedQueues.push(onRejected)
          break;
        case FULFILLED: 
          debugger
          fulfilled(_value)
          break;
        case REJECTED:
          rejected(_value)
          break;
      } 

    })
  }
}
console.log('==========')

/**
 * 发布订阅模式
 */

let eventEmitter = {
  list: {},
  on(key,fn) {
    if(!this.list[key]){
      this.list[key] = []
    }
    this.list[key].push(fn)
    return this
  },
  emit() {
    let key = [].shift.call(arguments)
    let fns = this.list[key]
    if(!fns || fns.length == 0) return false
    fns.shift().apply(this,arguments)
    return this
  },
  once(event,fn) {
    let _this = this
    function on() {
      _this.remove(event,fn)
      fn.apply(_this,arguments)
    }
    _this.on(event, on)
    return _this
  },
  remove(key,fn) {
    let fns = this.list[key]
    if(!fns) return false
    if(!fn) {
      fns && (fns.length = 0)
    }else {
      fns.forEach((cb,i)=>{
        if (cb === fn) {
          fns.splice(i, 1);
        }
      })
    }
  }
}
function user1(content) {
  console.log('用户1订阅了', content)
}
function user2(content) {
  console.log('用户2订阅了', content)
}
function user3(content) {
  console.log('用户3订阅了', content)
}
function user4(content) {
  console.log('用户4订阅了', content)
}

eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

eventEmitter.remove('article1', user2);

eventEmitter.once('article2', user4)

eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

console.log('==============================')

/**
 * 实现instanceof 功能
 * 核心：原型链的向上查找
 */
function myInstanceof(left,right) {
  if(typeof left != 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while(true) {
    if(proto == null) return false
    if(proto == right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

/**
 * 原生map实现
 * 原生reduce实现
 *  1. 初始值不传怎么处理
 *  2. 回调函数的参数有哪些？返回值如何处理？
 */
Array.prototype.mapSelf = function(callbackFn, thisArg) {
  if(this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined")
  }
  if(Object.prototype.toString.call(callbackFn) !== "[object Function]"){
    throw new TypeError(callbackFn + ' is not a function')
  }
  let obj = Object(this)
  let T = thisArg
  let len = obj.length >>> 0
  let A = new Array(len)
  for(let i=0;i<len;i++) {
    if(i in obj) {
      let iValue = obj[i]
      let mappedValue = callbackFn.call(T,iValue,i,obj)
      A[i] = mappedValue
    }
  }
  return A
}
Array.prototype.reduceSelf = function(callbackFn, initialValue) {
  if(this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined")
  }
  if(Object.prototype.toString.call(callbackFn) !== "[object Function]"){
    throw new TypeError(callbackFn + ' is not a function')
  }
  let obj = Object(this)
  let len = obj.length >>> 0
  let k = 0;
  let accumulator = initialValue
  if(accumulator == undefined) {
    if(len == 0) {
      throw new Error('Each element of the array is empty');
    }
    for(;k<len;k++) {
      if(k in obj) {
        console.log(k)
        accumulator = obj[k]
        k++
        console.log('k=====',k)
        break;
      }
    }
  }
  for(;k<len;k++) {
    if(k in obj) {
      accumulator = callbackFn.call(undefined, accumulator, obj[k], obj)
    }
  }
  return accumulator
}
var testArr = [1,2,3]
console.log(testArr.mapSelf(item => item + 2))
console.log(testArr.reduceSelf((a,b) => a+b))


var shape = {
  radius: 10,
  diameter() {
      return this.radius * 2
  },
  perimeter: () => {
      console.log(this)
      return 2 * Math.PI * this.radius
  },
  deep: {
      radius: 20,
      diameter() {
          return this.radius * 2
      },
      perimeter: () => {
          console.log(this)
          return 2 * Math.PI * this.radius
      },
  }
}

console.log(shape.diameter())  //20
console.log(shape.perimeter()) //NaN
console.log(shape.deep.diameter()) // 40
console.log(shape.deep.perimeter()) //NaN

function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}

console.log(Foo.a())
let obj = new Foo()
console.log(obj.a())
console.log(Foo.a())