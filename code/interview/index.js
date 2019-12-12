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

/**
 * ======================================================================================================================================================
 */

/**
 * apply和call的模拟实现
 * apply原理：
 * 1.将函数设为对象的属性
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

/**
 * 用 apply 实现 bind
 * bind 原理
 * 1. 设置 this 为给定的值，返回一个函数
 * 2. 调用新函数时，将给定的参数列表 作为原函数 的参数序列的 前若干项
*/

Function.prototype.bind = Function.prototype.bind || function (...rest1) {
  var self = this
  const context = rest1.shift()
  return function(...rest2){
    self.apply(context,[...rest1,...rest2] )
  }
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
 * 1. 延迟传餐
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

// 工厂模式： 提供创建一个对象的接口
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

// 单例模式
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

// 适配器模式： 用来解决 两个接口 不兼容问题， 由一个对象来包装 不兼容的对象，比如：参数转化，允许直接访问
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


/**
 * ======================================================================================================================================================
 */

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