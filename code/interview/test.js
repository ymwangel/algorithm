Function.prototype.apply = function(context, arr){
    let self = context || window
    self.fn = this
    let result
    if(!arr || arr.length == 0){
        result = self.fn()
    }else {
        var args = []
        for(let i=0;i<arr.length;i++){
            args.push('arr[' + i + ']')
        }
        result = eval('self.fn(' + args + ')')
    }
    delete self.fn
    return result
}
// let foo = {
//     value: 1
// }
// function bar () {
//     console.log(arguments)
//     console.log(this.value)
//     // return (arr&&arr.length > 0) ? (this.value + arr.reduce((a,b) => a+b)) : this.value+arr
// }

// Function.prototype.call = function(context) {
//     let self = context || window
//     self.fn = this
//     let result 
//     var args = []
//     for(let i=1;i<arguments.length;i++){
//         args.push('arguments[' + i + ']')
//     }
//     result = eval('self.fn(' + args + ')')
//     delete self.fn
//     return result
// }
Function.prototype.call = Function.prototype.call || function(context) {
    var args = []
    for(let i=0;i<arguments.length-1;i++){
      args[i] = arguments[i+1]
    }
    return this.apply(context,args)
  }

// bar()
// var result = bar.apply(foo)
// var result2 = bar.apply(foo,[3,4])
// var result3 = bar.call(foo, 5)

// Function.prototype.bind = Function.prototype.bind || function() {
//     var _args = arguments
//     var self = this
//     const context = [].shift.apply(_args)
//     return function(...rest2) {
//         self.apply(context,[..._args, ...rest2])
//     }
// }

// Function.prototype.bindFn = function bind(thisArg) {
//     if(typeof this != "function") {
//       throw new TypeError(this + 'must be a function')
//     }
//     var self = this
//     var args = [].slice.call(arguments,1)
//     var bound = function() {
//       var boundArgs = [].slice.call(arguments)
//       var finalArgs = args.concat(boundArgs)
//     //   console.log(this)
//       if(this instanceof bound) {   // new.target == 'bound'   使用new 调用bind()返回的 函数
//         if(self.prototype) { //self 有可能是es6 的箭头函数，没有prototype，所以没有prototype的时候就没必要再指向做prototype操作
//           function Empty() {}  //这三行代码目的：boud.prototype 继承self
//           Empty.prototype = self.prototype
//           bound.prototype = new Empty()
//         }
//         var result = self.apply(this, finalArgs)
//         var isObject = typeof result === 'object' && result !== null
//         var isFunction = typeof result === 'function'
//         if(isObject || isFunction) {
//           return result
//         }
//         return this
//       }else {
//         //  正常调用bind()返回后的函数
//         return self.apply(thisArg,finalArgs)
//       }
//     }
//     return bound
//   }

// var obj = {
//     name: '若川',
// };
// function original(a, b){
//     console.log('this', this); // original {}
//     console.log('typeof this', typeof this); // object
//     this.name = b;
//     console.log('name', this.name); // 2
//     console.log('this', this);  // original {name: 2}
//     console.log([a, b]); // 1, 2
// }
// var boundFn = original.bindFn(obj, 1);
// console.log(boundFn)
// var newBoundResult = new boundFn(2);

function Test(name) {
    this.name = name
    console.log(this)
    console.log(this instanceof Test) //true
}
var test = new Test('lisi')

Function.prototype.bindFn = function(thisArg) {
    if(typeof this !== 'function') {
        return
    }
    var self = this
    var args = [].prototype.slice.call(arguments,1)
    var fBound = function() {
        return self.apply(
            // 检测下是否是new 创建
            (this instanceof self ? this : thisArg),
            args.concat([].prototype.slice.call(arguments))
        )
    }
    if(this.prototype) {
        fBound.prototype = this.prototype
    }
    return fBound
}