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
   */

/**
 * 3. 实现一个 useState
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
 */

/**
 * 9. 最长无重复字符串
 */