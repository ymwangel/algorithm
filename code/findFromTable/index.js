/**
 * 查找表问题
 */

/**
 * 1. 给定两个数组，编写一个函数来计算两数组的交集
 * 示例 1:
 *  输入: nums1 = [1,2,2,1], nums2 = [2,2]
 *  输出: [2,2]
 * 示例 2:
 *  输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 *  输出: [4,9]
 */

const intersect = (nums1, nums2) => {
  nums1.sort()
  nums2.sort()
  let result = []
  let lastIndex = -1
  for (let i = 0; i < nums1.length; i++) {
    let index = nums2.slice(lastIndex + 1).findIndex(item => item === nums1[i]) + (lastIndex + 1)
    if (index > -1 && index > lastIndex) {
      result.push(nums1[i])
      lastIndex = index
    }
  }
  return result
}
let nums1 = [1,2,2,1]
let nums2 = [2,2]
console.log(intersect(nums1, nums2))
nums1 = [4,9,5]
nums2 = [9,4,9,8,4]
console.log(intersect(nums1, nums2))
