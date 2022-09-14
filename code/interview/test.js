/**
 * 1. 两数之和：
 *  给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 *  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 *  你可以按任意顺序返回答案。

    示例 1：

    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
    示例 2：

    输入：nums = [3,2,4], target = 6
    输出：[1,2]
    示例 3：

    输入：nums = [3,3], target = 6
    输出：[0,1]
     

    提示：

    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    只会存在一个有效答案

    进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？
 */

const twoSum = (nums, target) => { // O(n2)
  for (let i = 0; i < nums.length - 1; i++) {
    let left = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      if (left + nums[j] === target) {
        return [i, j]
      }
    }
  }
}
const twoSum1 = (nums, target) => {
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i)
  }
  for (let i = 0; i < nums.length - 1; i++) {
    let left = nums[i]
    let right = target - left
    if (map.has(target - left) && (map.get(right) !== i)) return [i, map.get(right)]
  }
}
// console.log(twoSum1([2,7,11,15], 9))
// console.log(twoSum1([3,2,4], 6))
// console.log(twoSum1([3,3], 6))

const addTwoNumbers = (l1, l2) => {
  let head = null, tail = null;
  let carry = 0
  while(l1 || l2) {
    const n1 = l1 ? l1.val : 0
    const n2 = l2 ? l2.val: 0
    const sum = n1 + n2 + carry
    if (!head) {
      head = tail = new ListNode(sum % 10)
    } else {
      tail.next = new ListNode(sum % 10)
      tail = tail.next
    }
    carry = Math.floor(sum / 10)
    l1 && (l1 = l1.next)
    l2 && (l2 = l2.next)
  }
  if (carry > 0) {
    tail.next = new ListNode(carry)
  }
  return head
}

/**
 * 3. 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */

const lengthOfLongestSubstring = s => {
  let max = 0
  let result = []
  for (let i = 0; i < s.length; i++) {
    let index = result.indexOf(s[i])
    if (index > -1) {
      max = Math.max(max, result.length)
      result = result.slice(index + 1)
    }
    result.push(s[i])
  }
  return Math.max(max, result.length)
}

// console.log(lengthOfLongestSubstring('abcabcbb'))
// console.log(lengthOfLongestSubstring('bbbbb'))
// console.log(lengthOfLongestSubstring('abcbd'))
// console.log(lengthOfLongestSubstring('pwwkew'))
// console.log(lengthOfLongestSubstring(' '))
// console.log(lengthOfLongestSubstring('abcdefg'))

/** 4. 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。
 *  算法的时间复杂度应该为 O(log (m+n)) 。
    示例 1：

    输入：nums1 = [1,3], nums2 = [2]
    输出：2.00000
    解释：合并数组 = [1,2,3] ，中位数 2
    示例 2：

    输入：nums1 = [1,2], nums2 = [3,4]
    输出：2.50000
    解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

    m = nums1.length
    n = nums2.length
    0 <= m <= 1000
    0 <= n <= 1000
    1 <= m + n <= 2000
    -106 <= nums1[i], nums2[i] <= 106

    中位数： 合并两个有序数组，得到一个 大的有序数组，中间位置的元素即为 中位数


    如果对时间复杂度的要求有 log，通常都需要用到二分查找，这道题也可以通过二分查找实现
 */

const findMedianSortedArrays = (nums1, nums2) => {
  let _nums = nums1.concat(nums2)
  _nums = _nums.sort((a, b) => a - b) // 归并排序 时间复杂度是：Olog(m + n)
  let middle = _nums.length / 2
  if (_nums.length % 2 === 0) {
    return (_nums[middle - 1] + _nums[middle]) / 2
  } else {
    return _nums[Math.floor(middle)]
  }
}

const findMedianSortedArrays1 = (nums1, nums2) => { // 二分查找法
  let m = nums1.length, n = nums2.length;
  let k = (m + n) >> 1 // 第 k 个 小 的 数，找到 第 k 个 小 的 数, 二分查找法
  let result = []
  let i = 0, j = 0;
  while(i < m && j < n && k >= 0) {
    if (nums1[i] < nums2[j]) {
      result.push(nums1[i])
      i++
    } else {
      result.push(nums2[j])
      j++
    }
  }
  if (i === m) {
    result = result.concat(nums2.slice(j))
  } else if(j === n) {
    result = result.concat(nums1.slice(i))
  }
  if ((m + n) % 2 !== 0) return result[k]
  return (result[k] + result[k - 1]) / 2
} 

/* 
  例子1. 合并后为奇数长度
  A = [1,3,4,9], length = 4
  B = [1,2,3,5,6,7,8,9,10], length = 9
  K ： 为寻找第 K 个 最小的数
  总长度 length = 13, 为奇数, length >> 1 = 6,
  寻找合并的有序数组中第 7个最小的数，下标为6, 即为中位数
  i = 0, j = 0, K=7
  K  K/2    A下标i       B下标j         A[i] >= B[j]
  7   3     i=i+K/2-1=2  j=j+K/2-1=2    A[i] >= B[j],抛弃B[0]~B[2],i=0,j=j+1=3,剩下 的 K 为：K - 抛弃序列的长度
  4   2     i=i+K/2-1=1  j=j+K/2-1=4    A[i] < B[j],抛弃A[0]~A[1],i=i+1=2,j=3,剩下 的 K 为：K - 抛弃序列的长度
  2   1     i=i+K/2-1=2  j=j+K/2-1=3    A[i] < A[j],抛弃A[2],i=i+1=3,j=3,剩下 的 K 为：K - 抛弃序列的长度
  1   此时直接比较A[i]和B[j], 此时A[3]>B[3], return B[3], 即中位数为B[3] = 5


  例子2. 合并后为偶数长度
  A = [2,3,4,6,8], length = 5
  B = [1,2,3,4,5,6,7,8,9], length = 9
  总长度 length = 14, 为偶数, length >> 1 = 7,
  寻找合并的有序数组中第 7个和第 8个最小的数，下标分别为6和 7，二者之和/2，即为中位数
  i = 0, j = 0, K=7
  K  K/2    A下标i       B下标j         A[i] >= B[j]
  7   3     i=i+K/2-1=2  j=j+K/2-1=2    A[2] >= B[2],抛弃B[0]~B[2],i=0,j=j+1=3,剩下 的 K 为：K - 抛弃序列的长度
  4   2     i=i+K/2-1=1  j=j+K/2-1=4    A[1] < B[4],抛弃A[0]~A[1],i=i+1=2,j=3,剩下 的 K 为：K - 抛弃序列的长度
  2   1     i=i+K/2-1=2  j=j+K/2-1=3    A[2] >= B[3]],抛弃B[3]],i=2,j=j+1=4,剩下 的 K 为：K - 抛弃序列的长度
  1   此时直接比较A[i]和B[j], 此时A[2]<B[4], return A[2], 即第7个最小的数为A[2] = 4

  寻找第8个最小的数基于前面步骤：相当于，此时, K = 1, i=i+1=3, j=4 此时A[3]>B[4], return B[4],
  即，第8个最小的数为B[4] = 5

  最终中位数为(4+5)/2 = 4.5

 */

const findMedianSortedArrays3 = (nums1, nums2) => {
  function findKthElement(nums1, nums2, k) {
    const len1 = nums1.length;
    const len2 = nums2.length;
    let index1 = 0;
    let index2 = 0;
    while (true) {
      if (index1 === len1) {
        // * nums1 到头了
        return nums2[index2 + k - 1];
      } else if (index2 === len2) {
        // * nums2 到头了
        return nums1[index1 + k - 1];
      } else if (k === 1) {
        // * 最后一次比较
        return Math.min(nums1[index1], nums2[index2]);
      }

      const half = k >> 1; // JS 中 k/2 不是整除，可以用parseInt(k/2)代替
      let newIndex1 = Math.min(index1 + half - 1, len1 - 1); // * 要注意index1+half-1可能会越界溢出, 所以下标最大为len1-1
      let newIndex2 = Math.min(index2 + half - 1, len2 - 1); // 同上

      if (nums1[newIndex1] <= nums2[newIndex2]) {
      // * 开始抛弃部分序列，更新K值，抛弃的长度为newIndex1 - index1 + 1，对应end-start+1
        k -= newIndex1 - index1 + 1;
        index1 = newIndex1 + 1; // * 更新抛弃过的序列的下标
      } else {
        // 同上
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  }
  const totalLength = nums1.length + nums2.length;
  const medianLeft = (totalLength - 1) >> 1;
  const medianRight = totalLength >> 1;
  // * 核心思路为, 用二分找到从小到大第K个数
  if (medianLeft === medianRight) { // nums1.concat(nums2)后长度为 奇数
    return findKthElement(nums1, nums2, medianLeft + 1);
  } else {  // nums1.concat(nums2)后长度为 偶数
    return (
      (findKthElement(nums1, nums2, medianLeft + 1) +
        findKthElement(nums1, nums2, medianRight + 1)) /
      2
    );
  }
}

// console.log(findMedianSortedArrays3([1,3], [2, 4]))
// console.log(findMedianSortedArrays3([1,3], [2]))
// console.log(findMedianSortedArrays3([1,2], [3,4, 5, 6, 7,8]))

/**
 * 5. 二分查找法: 
 */

const binary_search = (arr, key) => {
  let low = 0, high = arr.length - 1;
  while(low <= high) {
    var mid = parseInt(low + (high - low) / 2)
    if (key === arr[mid]) {
      return mid
    } else if (key > arr[mid]) {
      low = mid + 1
    } else if (key < arr[mid]) {
      high = mid - 1
    } else {
      return -1
    }
  }
  return -1 
}
// console.log(binary_search([5,13,19,21,37,56,64,75,80,88,92], 1))
// console.log(binary_search([5,13,19,21,37,56,64,75,80,88,922], 100))

const binary_search1 = (arr, low, high, key) => {
  if (low > high) {
    return -1
  }
  var mid = low + ((high - low) >> 1)
  if (arr[mid] === key) return mid
  if (arr[mid] > key) {
    high = mid - 1
    return binary_search1(arr, low, high, key)
  } else {
    low = mid + 1
    return binary_search1(arr, low, high, key)
  }
}
// console.log(binary_search1([5,13,19,21,37,56,64,75,80,88,92], 0, 10, 21))
// console.log(binary_search1([5,13,19,21,37,56,64,75,80,88,922], 0, 10, 922))

/**
 * 6. 给你一个字符串 s，找到 s 中最长的回文子串。
  示例 1：

  输入：s = "babad"
  输出："bab"
  解释："aba" 同样是符合题意的答案。
  示例 2：

  输入：s = "cbbd"
  输出："bb"

 */

const longestPalindrome = s => {
  let len = s.length
  let res = ''
  let dp = Array.from(new Array(len), ()=>new Array(len).fill(0))
  for(let i=len-1;i>=0;i--) {
    for(let j=i;j<len;j++) {
      dp[i][j] = s[i] === s[j] && (j-i<3 || dp[i+1][j-1])
      if(dp[i][j] && j-i+1>res.length) {
        res = s.substring(i,j+1)
      }
    }
  }
  return res
}
// 中心扩展法
const longestPalindrome2 = s => { 
  let res = ''
  function expand(s, l, r) {
    while(l >= 0 && r < s.length && s[l] === s[r]) {
      l--
      r++
    }
    return s.substring(l + 1, r)
  }
  for(let i = 0; i < s.length; i++){
    let r1 = expand(s, i, i)
    let r2 = expand(s, i, i+1)
    res = res.length > r1.length ? res : r1
    res = res.length > r2.length ? res : r2
  }
  return res
}
// 中心扩散法优化
const longestPalindrome3 = s => {
  let ResLeft = 0
  let ResRight = 0
  let maxLen = 0
  let i = 0
  while(i < s.length) {
    let left = i - 1
    while(left >= 0 && s[i] == s[left]) {
      left--
    }
    let right = i + 1
    while(right < s.length && s[i] === s[right]) {
      right++
    }
    const end = right
    while(left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    if (maxLen < right-left - 1) {
      maxLen = right - left - 1
      ResLeft = left + 1
      ResRight = right - 1
    }
    i = end
  }
  return s.substring(ResLeft, ResRight + 1)
}
// console.log(longestPalindrome('babad'))
// console.log(longestPalindrome('cbbd'))

/**
 * 7.给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 * 
    '.' 匹配任意单个字符
    '*' 匹配零个或多个前面的那一个元素
    所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

     
    示例 1：

    输入：s = "aa", p = "a"
    输出：false
    解释："a" 无法匹配 "aa" 整个字符串。
    示例 2:

    输入：s = "aa", p = "a*"
    输出：true
    解释：因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
    示例 3：

    输入：s = "ab", p = ".*"
    输出：true
    解释：".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。

    提示：
      1. 1 <= s.length <= 20
      2. 1 <= p.length <= 30
      3. s 只包含从 a-z 的小写字母。
      4. p 只包含从 a-z 的小写字母，以及字符 . 和 *。
      5; 保证每次出现字符 * 时，前面都匹配到有效的字符
 */

const isMatch = (s, p) => {
  if (s == null || p == null) return false;

  const sLen = s.length, pLen = p.length;

  const dp = new Array(sLen + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(pLen + 1).fill(false); // 将项默认为false
  }
  // base case
  dp[0][0] = true;
  for (let j = 1; j < pLen + 1; j++) {
    if (p[j - 1] == "*") dp[0][j] = dp[0][j - 2];
  }
  // 迭代
  for (let i = 1; i < sLen + 1; i++) {
    for (let j = 1; j < pLen + 1; j++) {
      if (s[i - 1] == p[j - 1] || p[j - 1] == ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") { // 判断 p[j-2]
        if (s[i - 1] == p[j - 2] || p[j - 2] == ".") {
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j]; // 分别对应 *前面字母出现 1次、零次、>=2次
        } else { // p[j-2] 也是 *， 此时 dp[i][j] = dp[i][j-2]
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }
  return dp[sLen][pLen]; // 长sLen的s串 是否匹配 长pLen的p串
}
// console.log(isMatch('aa', 'a*'))
// console.log(isMatch('ab', '.*'))
// console.log(isMatch('aa', 'a'))

/**
 * 8. 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

    找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

    返回容器可以储存的最大水量。

    输入：[1,8,6,2,5,4,8,3,7]
    输出：49 
    解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
    示例 2：

    输入：height = [1,1]
    输出：1
 */
const maxArea = (height) => { // 超时
  let maxArea = 0
  for (let i = 0; i < height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      let area = Math.min(height[i], height[j]) * (j - i)
      maxArea = Math.max(area, maxArea)
    }
  }
  return maxArea
}
const maxArea1 = (height) => { // 超时
  let i = 0, j = height.length - 1;
  let maxArea = 0
  while(i < j) {
    let area = Math.min(height[i], height[j]) * (j - i)
    maxArea = Math.max(area, maxArea)
    if (height[i] <= height[j]) {
      i++
    } else {
      j--
    }
  }
  return maxArea
}
// console.log(maxArea1([1,8,6,2,5,4,8,3,7]))
// console.log(maxArea1([1,1]))

/**
 * 9. 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

    注意：答案中不可以包含重复的三元组。

     

    示例 1：

    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]
    示例 2：

    输入：nums = []
    输出：[]
    示例 3：

    输入：nums = [0]
    输出：[]
     

    提示：

    0 <= nums.length <= 3000
    -105 <= nums[i] <= 105

 */


const threeSum = nums => {
  if (nums.length < 3) return []
  let result = []
  // [-1, -1, -4, 0, 1, 2]
  nums.sort((a,b) => a-b)
  console.log(nums)
  for(let i = 0; i < nums.length; i++) {
    let left = nums[i]
    if(left > 0) break
    if((i > 0) && (left === nums[i - 1])) continue
    let k = i + 1, j = nums.length - 1;
    while(k < j) {
      let middle = nums[k], right = nums[j];
      let sum = left + middle + right
      if(sum === 0) {
        result.push([left, middle, right])
        while(k < j && middle === nums[k + 1]) k++ // 去重
        while(k < j && right === nums[j - 1]) j-- // 去重
        k++
        j--
      } 
      else if(sum < 0) k++
      else if (sum > 0) j--
    }
  }
  return result
}

// console.log(threeSum([-1, -1, -4, 0, 1, 2]))
// console.log(threeSum([]))
// console.log(threeSum([0]))

/**
 * 10. 电话号码的字母组合
 *  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
    给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
    示例 1：

    输入：digits = "23"
    输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
    示例 2：

    输入：digits = ""
    输出：[]
    示例 3：

    输入：digits = "2"
    输出：["a","b","c"]
     

    提示：

    0 <= digits.length <= 4
    digits[i] 是范围 ['2', '9'] 的一个数字
 */

const letterCombinations = digits => {
  if (digits === '') return []
  let obj = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  }
  let len = digits.length
  if (len === 1) return obj[digits]
  let result = []
  let map = []
  for (let i = 0; i < len; i++) {
    map[i] = obj[digits[i]]
  }
  result = map.slice(1).reduce((a, b) => {
    let res = []
    for(let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        res.push(a[i] + b[j])
      }
    }
    return res
  }, map[0])
  return result
}
// console.log(letterCombinations('234'))
// console.log(letterCombinations(''))
// console.log(letterCombinations('2'))

/**
 * 11. 删除链表的倒数第N个节点
 * 输入：head = [1,2,3,4,5], n = 2
  输出：[1,2,3,5]
  示例 2：

  输入：head = [1], n = 1
  输出：[]
  示例 3：

  输入：head = [1,2], n = 1
  输出：[1]

  提示：

  链表中结点的数目为 sz
  1 <= sz <= 30
  0 <= Node.val <= 100
  1 <= n <= sz
   

  进阶：你能尝试使用一趟扫描实现吗？

    1、双指针法通常都可以使用在有关有序数组或者链表中的问题中。
    2、这里使用的是和快慢指针、对撞指针有些差别的前后指针。
    3、与快慢指针略微不同，前后指针两个指针每次前进的步数是一致的，只是出发的先后顺序不同。这样就可以实现当前指针先出发n步的时候，当前指针到达末尾（倒数第一个结点）则后指针到达倒数第N+1个结点（相差距离n步）。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
const removeNthFromEnd = (head, n) => {
  let stack = new Array()
  let newListNode = new ListNode(0, head)
  let tempNode = newListNode
  while(tempNode) {
    stack.push(tempNode)
    tempNode = tempNode.next
  }
  let temNum = n
  while(temNum) {
    stack.pop()
    temNum--
  }
  tempNode = stack.pop()
  tempNode.next = tempNode.next.next
  return newListNode.next
}

const removeNthFromEnd1 = (head, n) => {
  let newListNode = new ListNode(0, head)
  let frontward = newListNode
  let backward = newListNode
  let tempNum = 0
  while(tempNum != n) {
    frontward = frontward.next
    tempNum++
  }
  while(frontward.next) {
    frontward = frontward.next
    backward = backward.next
  }
  backward.next = backward.next.next
  return newListNode.next
}

/**
 * 12. 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

    有效字符串需满足：

    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。
     

    示例 1：

    输入：s = "()"
    输出：true
    示例 2：

    输入：s = "()[]{}"
    输出：true
    示例 3：

    输入：s = "(]"
    输出：false
    示例 4：

    输入：s = "([)]"
    输出：false
    示例 5：

    输入：s = "{[]}"
    输出：true
     

    提示：

    1 <= s.length <= 104
    s 仅由括号 '()[]{}' 组成

 */

var brackets = ['()', '{}', '[]']
const isValid = s => {
  let stack = []
  for (let i = 0; i < s.length; i++) {
    if(i === 0) stack.push(s[i])
    else {
      let lastEle = stack[stack.length - 1]
      if (brackets.indexOf(lastEle + s[i]) != -1) {
        stack.pop()
      } else {
        stack.push(s[i])
      }
    }
  }
  return stack.length === 0 ? true : false
}
// console.log(isValid('()'))
// console.log(isValid('()[]{}'))
// console.log(isValid('(]'))
// console.log(isValid('([)]'))
// console.log(isValid('{[]}'))

/**
 * 13. 搜索旋转排序数组
 * 整数数组 nums 按升序排列，数组中的值 互不相同 。

  在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。

  给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

  示例 1：

  输入：nums = [4,5,6,7,0,1,2], target = 0
  输出：4
  示例 2：

  输入：nums = [4,5,6,7,0,1,2], target = 3
  输出：-1
  示例 3：

  输入：nums = [1], target = 0
  输出：-1
   

  提示：

  1 <= nums.length <= 5000
  -10^4 <= nums[i] <= 10^4
  nums 中的每个值都 独一无二
  题目数据保证 nums 在预先未知的某个下标上进行了旋转
  -10^4 <= target <= 10^4
   

  进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？  二分查找法： o(logN)
 */

const search = function(nums, target) {
  if (!nums.length) return -1
  let left = 0, right = nums.length - 1, mid;
  while(left <= right) {
    mid = left + ((right - left) >> 1)
    if (nums[mid] === target) return mid
    if (nums[mid] >= nums[left]){
      if (target >= nums[left] && target < nums[mid]){
        right = mid - 1
      } else {
        left = mid + 1
      }
    } else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
}

/**
 * 14. 合并K个生序链表 TODO
 * 给你一个链表数组，每个链表都已经按升序排列。

  请你将所有链表合并到一个升序链表中，返回合并后的链表。

   

  示例 1：

  输入：lists = [[1,4,5],[1,3,4],[2,6]]
  输出：[1,1,2,3,4,4,5,6]
  解释：链表数组如下：
  [
    1->4->5,
    1->3->4,
    2->6
  ]
  将它们合并到一个有序链表中得到。
  1->1->2->3->4->4->5->6
  示例 2：

  输入：lists = []
  输出：[]
  示例 3：

  输入：lists = [[]]
  输出：[]
   

  提示：

  k == lists.length
  0 <= k <= 10^4
  0 <= lists[i].length <= 500
  -10^4 <= lists[i][j] <= 10^4
  lists[i] 按 升序 排列
  lists[i].length 的总和不超过 10^4

 */

function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
const mergeKLists = (list1, list2) => {
  
}
console.log(mergeKLists([1,4,5],[1,3,4]))


/**
 * 15. 二叉树的中序遍历
 *  给定一个二叉树的根节点 root，返回它的中序遍历
 * 
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
const inorderTraversal = function(root) { // 递归
  if (!root) return []
  let result = []
  if (root.left) {
    let res = inorderTraversal(root.left)
    result = result.concat(res)
  }
  result.push(root.val)
  if (root.right) {
    let res = inorderTraversal(root.right)
    result = result.concat(res)
  }
  return result
}
const inorderTraversal2 = root => { // 迭代思想：
  let result = []
  let stack = [] //维护一个栈
  while(root || stack.length) {
    while(root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    result.push(root.val)
    root = root.right
  }
  return result
}

let root = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      right: null,
      left: null
    },
    right: null
  }
}
root = null
root = {
  val: 1,
  left: null,
  right: null
}
root = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null
    },
    right: {
      val: 4,
      left: null,
      right: null
    }
  },
  right: {
    val: 5,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: null
    }
  }
}
console.log(inorderTraversal2(root))

/**
 * 16. 对称二叉树： 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 *  
 * 示例1:
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 示例2:
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
 */

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

const isSymmetric = function(root) { // 递归
  const dfs = (left, right) => {
    if (!left && !right) return true
    if (!left || !right) return false
    return left.val === right.val && dfs(left.left, right.right) && dfs(left.right, right.left)
  }
  return dfs(root, root)
};

/**
 * 递归 改为 迭代，常用方法：引入一个队列 或  栈
 * @param {递归} root 
 */
const isSymmetric2 = root => { // 迭代,用队列
  if (!root) return true
  let queue = []
  queue.push(root.left, root.right)
  while(queue.length) {
    let left = queue.shift()
    let right = queue.shift()
    if (!left && !right) continue
    if (left.val != right.val) return false
    queue.push(left.left)
    queue.push(right.right)
    queue.push(left.right)
    queue.push(right.left)
  }
  return true
}
const isSymmetric3 = root => {
  if (!root) return true
  let stack = []
  stack.push(root.left)
  stack.push(root.right)
  while(stack.length) {
    let right = stack.pop()
    let left = stack.pop()
    if (!left && !right) continue
    if (left === null || right === null || left.val != right.val) return false
    stack.push(left.left)
    stack.push(right.right)
    stack.push(left.right)
    stack.push(right.left)
  }
  return true
}

let root1 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 2,
    left: null,
    right: {
      val: 3,
      left: null,
      right: null
    }
  }
}
// root1 = {
//   val: 1,
//   left: {
//     val: 2,
//     left: {
//       val: 3,
//       left: null,
//       right: null
//     },
//     right: {
//       val: 4,
//       left: null,
//       right: null
//     }
//   },
//   right: {
//     val: 2,
//     left: {
//       val: 4,
//       left: null,
//       right: null
//     },
//     right: {
//       val:3,
//       left: null,
//       right: null
//     }
//   }
// }
console.log(isSymmetric(root1))
