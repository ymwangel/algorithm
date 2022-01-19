/**
 * 1. 给定一个数组，它的第 i 个元素是一支给定 股票 第 i 天 的价格
 * 如果你最多只允许完成 一笔交易（即买入 和 卖出 一支股票 一次），设计一个算法 来计算 你所能获取的最大利润
 * 注意：你不能在买入股票钱卖出股票
 * 示例1：输入：[7, 1, 5, 3, 6, 4] 
 * 输出：5
 * 
 * 解释：在第 2 天 （股票价格 = 1）的时候买入， 在第 5 天（股票价格 = 6）时候卖出，最大利润 = 6 - 1 = 5，
 * 注意：利润不能是 7 - 1 = 6，因为卖出价格需要大于买入价格； 同时，不能在买入前卖出股票
 * 
 * 示例2: 输入：[7, 6, 4, 3, 1]， 输出：0
 * 解释：在这种情况下，没有交易完成，所以最大利润为0
 * 
 * 考察点：
 *   1. 组合的一种应用，注意算法复杂度
 *   2. 求取利润最大值
 */

// 法一：复杂度：O(n*n)
function maxProfit (arr) {
    let max = 0
    for(let i = 0; i < arr.length - 1; i++) {
      for(let j = i + 1; j < arr.length; j++){
        let difference = arr[j] - arr[i]
        difference > max && (max = difference)
      }
    }
    return max
  }
  console.log(maxProfit([7, 1, 5, 3, 6, 4] ))
  console.log(maxProfit([7, 6, 4, 3, 1]))
  
  // 法一：复杂度：O(n)
  function maxProfit2 (arr) {
    let max = 0
    let currentMin = arr[0]
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] > currentMin && (arr[i] - currentMin) > max) {
        max = arr[i] - currentMin
      } else if (arr[i] < currentMin) {
        currentMin = arr[i]
      }
    }
    return max
  }
  console.log(maxProfit2([7, 1, 5, 3, 6, 4] ))
  console.log(maxProfit2([7, 6, 4, 3, 1]))

  /**
   * 2. 一个数据量很大的滚动效果
   * TODO
   */

/**
 * 3. 实现一个 useState
 * TODO
 */

/**
 * 4. 螺旋树
 */

const spiralOrder = function (matrix) {
  let m = matrix.length
  if (m === 0) return []
  if (m === 1) return matrix[0]
  let n = matrix[0].length
  if (n === 0) return []
  if (n === 1) return matrix[0].map(item => item[0])

  let min = 0
  let maxRowIndex = n - 1
  let maxColIndex = m - 1
  let i, j;
  const ans = []

  while(maxColIndex >= min && maxRowIndex >= min) { // 当前行最大索引 和 列最大索引 不得小于最小索引
    i = min // 从左上角开始
    j = min

    while(j < maxRowIndex) { // 从左向右
      ans.push(matrix[i][j++])
    }
    while(i < maxColIndex) { // 从上向下
      ans.push(matrix[i++][j])
    }

    ans.push(matrix[i][j]) //推入右下角元素

    while(j > min && maxRowIndex > min) { // 如果不止1行，那么需要从右向左遍历
      ans.push(matrix[i][--j])
    }
    while(i > min + 1 && maxRowIndex > min) { // 如果不止1列，那么需要从下向上遍历
      ans.push(matrix[--i][j])
    }
    min++
    maxRowIndex--
    maxColIndex--
  }
  return ans
}
let arr = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
  ]
console.log(spiralOrder(arr))
let arr1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12], 
  [13,14,15,16]
  ]
  console.log(spiralOrder(arr1))

/**
 * 5. 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。求有多少种方法
 */
// 法一：递归
const climbStairs = function(n) {
  if (n == 1) return 1
  if (n === 2) return 2
  return climbStairs(n - 1) + climbStairs(n - 2)
}
console.log(climbStairs(4))

// 法二：动态规划？
const climbStairs2 = function(n) {
  let result = []
  result[0] = 1
  result[1] = 2
  for (let i = 2; i < n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n-1]
}
console.log(climbStairs2(4))

/**
 * 6. 一共有100元, 买100支鸡，公鸡一只4元，母鸡一只3元，小鸡一只1/3元，求有多少种买法
 */

const getAnswer = function() {
  const sum = 100
  const money = 100
  let count = 0
  for (let i = 0; i <= Math.floor(money / 4); i++) {
    for (let j = 0; j <= Math.floor(money / 3); j++) {
      let z = sum - i - j
      if (4*i + j*3 + z/3 >= money && (z % 3 == 0)) {
        count++
      }
    }
  }
  return count
}
console.log(getAnswer())

/**
 * 7.输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。
 * 要求时间复杂度为O(n)。
 */

const maxSubArray = function(arr) {
  let pre = 0, maxAns = arr[0];
  arr.forEach(x => {
    pre = Math.max(pre + x, x)
    maxAns = Math.max(maxAns, pre)
  })
  return maxAns
}
arr = [-2,1,-3,4,-1,2,1,-5,4]
console.log(maxSubArray(arr))

/**
 * 8. 判断是否是二叉搜索树
 * 二叉查找树（Binary Search Tree）:（又：二叉搜索树，二叉排序树）它或者是一棵空树，或者是具有下列性质的二叉树： 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值； 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值； 它的左、右子树也分别为二叉排序树
 * 左子树 的值，所在区间：(lower, root.val)
 * 右子树的值，所在区间：(root.val, upper)
 */

const helper = (root, lower, upper) => {
  if (root == null) return true
  if (root.val <= lower || root.val >= upper) return false
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
}
var isValidBST = function(root) {
  return helper(root, -Infinity, Infinity);
}
/**
 * 9. 最长无重复字符串：给定一个字符串S，请找出其中不含有重复字符的 最长子串的 长度
 * 例如：s="abcabcbb" => 3 //"abc"
 * s="bbbb" => 1 // "b"
 * s="pwwkew" => 3 // "kew"
 * s="" => 0
 */

const lengthOfLongestSubstring = function(s) {
  const occ = new Set() // 哈希集合，记录每个字符是否出现
  const n = s.length
  // 右指针，初始值为-1， 相当于在字符串的左边界的左侧，还没有开始移动
  let rk = -1, ans = 0;
  for (let i = 0; i < n; ++i) {
    if (i != 0) {
      // 左指针向右移动一格，移出一个字符
      occ.delete(s.charAt(i-1))
    }
    while(rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
      // 不断地移动右指针
      occ.add(s.charAt(rk + 1))
      ++rk
    }
    // console.log(occ, rk)
    // 第i到rk个字符 是一个极长的无重复字符子串
    ans = Math.max(ans, rk - i + 1)
  }
  return ans
}

console.log(lengthOfLongestSubstring('abcabcbb'))
// console.log(lengthOfLongestSubstring('bbbb'))
// console.log(lengthOfLongestSubstring(''))
// console.log(lengthOfLongestSubstring("pwwkew"))

/**
 * 10. 两个超长的全是由数字组成的字符串
 * 例如：a="23423412323364562343.", b="34982988237987271653723."求和并输出。
 */
const getSumOfString = (a, b) => {
  a = a.split('').reverse()
  b = b.split('').reverse()
  let len = Math.max(a.length, b.length)
  let carry = 0, ans = []
  for (let i = 0; i < len; i++) {
    a[i] = a[i] || 0
    b[i] = b[i] || 0
    let sum = Number(a[i]) + Number(b[i])
    ans.push(sum % 10 + carry) 
    carry = Math.floor(sum / 10)
  }
  return ans.reverse().join('')
}
console.log(getSumOfString("23423412323364562343", "34982988237987271653723"))

/**
 * 11. 找出字符串中的全是字母构成的子串，并将该子串反转。例如∶ 3abdh34eer输出∶ 3hdba34ree
 */
const reverseStr = (str) => {
  let result = str.replace(/[a-zA-z]+/g, (match) => {
    console.log(match.split('').reverse().join(''))
    return match.split('').reverse().join('')
  })
  return result
}
console.log(reverseStr('3abdh34eer'))

/**
 * 12. 找出数组中各个元素的后面比他大的第一个数字，例如∶ 3，4，7，1，2，8输出为∶4，7，8，2，8
 */
const getFirstBiggerEle = (arr) => {
  let result = []
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        result.push(arr[j])
        break
      } else if (j == arr.length - 1) {
        result.push(null)
      }
    }
  }
  return result
}
// 借助 单调栈：维护index的栈，可以保证 result的顺序是正确的
const getFirstBiggerEle2 = arr => {
  let result = [], stack = [0];
  let length = arr.length
  let index = 1
  while(index < length) {
    // console.log('stack===', stack, index)
    if (stack.length && arr[index] > arr[stack[stack.length - 1]]) {
      // 找到之后，stack 顶部元素出栈
      result[stack.pop()] = arr[index]
    } else {
      // 如果当前index的值 不是比上一个元素大的值，就将当前index入栈
      stack.push(index)
      index++
    }
  }
  while(stack.length) {
    result[stack.pop()] = -1
  }
  return result
}
console.log(getFirstBiggerEle([3, 4, 7, 10, 1, 2, 8])) // [4,7,10,null,2,8]
console.log(getFirstBiggerEle2([3, 4, 7, 1, 2, 8])) 

/**
 * 13. 1.打印一个二叉树中，所有根节点到叶子节点的路径
 * TODO
 */

const printPath = (arr) => {

}

/**
 * 14.提供根节点到叶子节点的二维List数据，如何还原出对应的二叉树?
 * TODO
 */

/**
 * 15. 在递增数组中，找到第一个值为key的元素，返回其位置信息，如在[1，1，2，3，4，4，5.6，6] 找到第一个4，应返回4
 * // indexOf的实现
 */
const getKeyOfIndex = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return i
    }
  }
}
console.log(getKeyOfIndex([1, 1, 2, 3, 4, 4, 5.6, 6], 4))

/**
 * 16. 实现深拷贝
 */

const getType = obj => Object.prototype.toString.call(obj)

const canTraverse = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
}

const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

// 可遍历对象
const mapTag = "[object Map]"
const setTag = "[object Set]"
const arrayTag = "[object Array]"
const objectTag = "[object Object]"
const argumentsTag = "[object Arguments]"

// 不可遍历对象
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const handleRegExp = (target) => {
  const {source, flags} = target
  return new target.constructor(source, flags)
}

const handleFunc = (func) => {
  // 拷贝函数
  // 箭头函数直接返回自身
  if (!func.prototype) return func
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString)
  const body = bodyReg.exec(funcString)
  if (!body) return null
  if (param) {
    const paramArr = param[0].split(',')
    return new Function(...paramArr, body[0])
  } else {
    return new Function(body[0])
  }
}

const handleNotTraverse = (target, tag) => {
  const Ctor = target__proto__.constructor
  switch(tag) {
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case errorTag: 
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
}

const deepClone = (target, map = new Map()) => {
  if (!isObject(target)) return target
  let type = getType(target)
  let cloneTarget
  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type)
  } else {
    let ctorProto = target.__proto__
    cloneTarget = new (ctorProto.constructor)()
  }
  if (map.get(target)) return target
  map.set(target, true)
  if (type === mapTag) {
    // 处理Map
    target.forEach((item, key) => {
      cloneTarget.set(deepClone(key), deepClone(item))
    })
  } 
  if (type === setTag) {
    // 处理Set
    target.forEach((item) => {
      cloneTarget.add(deepClone(item))
    })
  }
  // 处理数组和对象
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target(prop))
    }
  }
  return cloneTarget
 }

/**
 * 17. vdom的算法实现∶
 * 给你一个字符串"<div><div><p></p><div><span></span></div>"，写一个函数得出一个object的结果即ftag∶ diy. children∶ T】
 */

const getVD = (string) => {
  
}

/**
 * 18. 实现快排算法，时间复杂度
 */

/**
 * 19.链表去重;
 */

/**
 * 20. 打印二叉树层数
 */