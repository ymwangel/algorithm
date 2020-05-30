/**
 * 1. 写出判断数组的方法
 */
var arr = [1,3,4, [56,93]]
console.log(Object.prototype.toString.call(arr) === "[object Array]")
console.log(Array.isArray(arr))
console.log(arr instanceof Array)

/**
 * 2. AOP
 */
function A() {
    console.log('调用了A')
}

Function.prototype.before = function(beforeFn) {
    const _self = this
    return function() {
      beforeFn.apply(this,arguments)
      return _self.apply(this,arguments)
    }
}
A.before(_=>{
    console.log('HelloWorld')
})()

/**
 * 深度复制extend()
 */

function extend(source) {
    if(typeof source != Object) {
        return source
    }
    const result = Array.isArray(source) ? [] : {}
    for(let item in source) {
        if(source.hasOwnProperty(item)) {
            result[item] = extend(source[prop])
        }
    }
    return result
}
console.log(extend(3))
var cloneArr = extend(arr)
cloneArr[3] = 567
console.log(cloneArr)
console.log(arr)
var obj = {name: 'lisi'}
var cloneObj = extend(obj)
cloneObj.name = 'wangcai'
console.log(cloneObj, obj)

/**
 * 4 
 * 结果：
 * start 
 * children4
 * children2
 * children3
 * children5
 * children7
 * children6
 */

 /**
  * 5.输入一个整数，输出该数二进制表示中1的个数
  */

function count(number) {
    let binaryNumber = parseInt(number).toString(2); 
    var arr = new Array(2).fill(0)
    for(let i=0;i<binaryNumber.length;i++) {
        arr[binaryNumber[i]]++
    }
    return arr[1]
}
console.log(count(18))

/**
 * 6. 
 */

function isValid (str) {
    var arr = []
    for(let i=0;i<str.length;i++) {
        if(['({['].indexOf(str[i]) >= 0){
            arr.push(str[i])
        }else{
            let tail = arr[arr.length-1]
            let joinStr = tail ? tail + str[i] : str[i]
            if(joinStr == '[]' || joinStr == '{}' || joinStr == '()'){
                arr.pop()
            }else {
                arr.push(str[i])
            }
        }
    }
    return arr.length == 0
}


console.log(isValid("()"))
console.log(isValid("()[]{}"))
console.log(isValid("(]"))
console.log(isValid("([)]"))
console.log(isValid("{[]}"))
console.log(isValid("[()]"))
console.log(isValid("}{[]}"))