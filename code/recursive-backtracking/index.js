/**
 * 递归回溯:
 */
/**
 * 参考：https://juejin.cn/post/6844904191379374087
 */
/**
 * 1. 给定数组进行排列组合
 */

let names = ["iPhone X", "iPhone XS"]
let colors = ["黑色", "白色"]
let storages = ["64g", "256g"]
const combine = (...chunks) => {
  let res = []
  const helper = (index, prev) => {
    let chunk = chunks[index]
    let isLast = index === chunks.length - 1
    for (let val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        res.push(cur)
      } else {
        helper(index+1, cur)
      }
    } 
  }
  helper(0, [])
  return res
}

// console.log(combine(names, colors, storages))

/**
 * 2. 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 输入: n = 4, k = 2
  输出:
  [
    [2,4],
    [3,4],
    [2,3],
    [1,2],
    [1,3],
    [1,4],
  ]
 */

const combine1 = (n, k) => {
  let ret = []
  const helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }
    for (let i = start; i <= n; i++) {
      helper(i + 1, prev.concat(i))
    }
  }
  helper(1, [])
  return JSON.stringify(ret)
}
// console.log(combine1(4, 2))

/**
 * 3. 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 输入: n = 4, k = 3
 * 输出：
 * 剪枝：我们以 prev = [1]，再去以 n = 4 为 start 作为递归的起点，那么显然是不可能得到结果的，因为 n = 4 的话就只剩下 4这一项可以拼接了，最多也就拼接成 [1, 4]，不可能满足 k = 3 的条件。
 * 所以在进入递归之前，就果断的把这些“废枝”给减掉。这就叫做「剪枝」
 */

let combine2 = (n, k) => { // 长度为k的组合
  let ret = []
  let helper = (start, prev) => {
    let len = prev.length
    if (len === k) {
      ret.push(prev)
      return
    }
    //还有 rest个位置待填补
    let rest = k - prev.length
    for (let i = start; i <= n; i++) {
      if (n - i + 1 < rest) continue
      helper(i + 1, prev.concat(i))
    }
  }
  helper(1, [])
  return JSON.stringify(ret)
}
// console.log(combine2(4, 3)) 

/**
 * 4. 给定一个可能包含重复元素 的整数数组 nums， 返回该数组所有可能的子集（幂集）
 * 幂集：解集不能包含重复的子集
 * 输入：[1, 2, 2]
 * 输出：[
 *  [2],
 *  [1],
 *  [1, 2, 2],
 *  [2, 2],
 *  [1, 2],
 *  []
 * ]
 */
const genKey = arr => arr.join('~')
const subsetsWithDup = nums => {
  let n = nums.length
  let ret = []
  if (!n) {
    return ret
  }
  nums.sort() //排序有助于去重操作
  let used = {}

  const helper = (start, prev, k) => { // start ：起始位置，prev:{], k:长度为k的子集
    if (prev.length === k) {
      let key = genKey(prev) //去重逻辑
      if (!used[key]) {
        used[key] = true
        ret.push(prev)
      }
      return
    }
    for (let j = start; j < n; j++) {
      // 剪枝操作
      let rest = n - j // 未遍历的个数
      let need = k - prev.length // 长度为k的子集，还差多少个元素
      if (rest < need) {  // 长度为k的子集，还差多少个元素 < 未遍历的个数, 肯定不会成为符合要求的子集，所以放弃遍历，剪枝操作
        continue
      }
      // 递归回溯
      helper(j + 1, prev.concat(nums[j]), k)
    }
  }

  for (let i = 1; i <= n; i++) {
    helper(0, [], i)
  }
  return JSON.stringify([[], ...ret])
}
let nums = [1, 2, 2]
// console.log(subsetsWithDup(nums))

/**
 * 5. 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
 * 注意：candidates 中的每个数字在每个组合中只能使用一次。
 * 说明：所有数字（包括目标数）都是正整数。
 * 解集不能包含重复的组合。 
 * 
 * 输入：candidates = [10,1,2,7,6,1,5], target = 8,
 * 输出：[
 *  [1, 7],
 *  [1, 2, 5],
 *  [2, 6],
 *  [1, 1, 6]
 * ]
 * 输入：candidates = [2,5,2,1,2], target = 5,
 * 输出：[
 *  [5],
 *  [1, 2, 2]
 * ]
 */

const combinationSum = (candidates, target) => {
  candidates.sort((a, b) => a - b)
  console.log(candidates)
  let len = candidates.length
  let res = []
  let map = {}
  const helper = (start, prev) => {
    let sum = prev.length > 0 ? prev.reduce((a, b) => a + b) : 0
    let isLast = start === len - 1
    if (sum > target) {
      return
    }
    if (sum === target) {
      let key = genKey(prev)
      if (!map[key]) {
        map[key] = true
        res.push(prev)
        return
      }
      // helper(start + 1, prev.concat(candidates[start]))
    }
  }
  for (let i = 0; i < len; i++) {
    helper(i, [])
  }
  return JSON.stringify(res)
}

let candidates = [10,1,2,7,6,1,5] 
let target = 8
console.log(combinationSum(candidates, target))
