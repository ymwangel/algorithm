/**
 * 
 * 矩形以列表 [x1, y1, x2, y2] 的形式表示，其中 (x1, y1) 为左下角的坐标，(x2, y2) 是右上角的坐标。
 * 如果相交的面积为正，则称两矩形重叠。需要明确的是，只在角或边接触的两个矩形不构成重叠。
 * 给出两个矩形，判断它们是否重叠并返回结果。
 * 提示：
 * 1. 两个矩形 rec1 和 rec2 都以含有四个整数的列表的形式给出。
 * 2. 矩形中的所有坐标都处于 -10^9 和 10^9 之间。
 * 3. x 轴默认指向右，y 轴默认指向上。
 * 4. 你可以仅考虑矩形是正放（x1 < x2, y1 < y2）的情况。
 */
var isRectangleOverlap = function(rec1, rec2) { //逆向思维：考虑不相交的情况
    let x1 = rec1[0]
    let y1 = rec1[1]
    let x2 = rec1[2]
    let y2 = rec1[3]
    let x3 = rec2[0]
    let y3 = rec2[1]
    let x4 = rec2[2]
    let y4 = rec2[3]
    if(x3 >= x2 || x4 <= x1 || y3 >= y2 || y4 <= y1) {
        return false
    }
    return true
};
console.log(isRectangleOverlap([0,0,2,2],[1,1,3,3])) //true 
console.log(isRectangleOverlap([0,0,1,1],[1,0,2,1])) // false
console.log(isRectangleOverlap([0,0,2,2],[0,0,1,1])) // true
console.log(isRectangleOverlap([2,17,6,20],[3,8,6,20])) //true
console.log(isRectangleOverlap([-4,-9,-2,3],[1,-5,9,-1])) //false
console.log(isRectangleOverlap([206110757,199595273,851054072,983256382],[-898677230,-47320317,-858614307,736177810])) // false

console.log('===================')

/**
 * 国王与金矿题目
 * @param {*} g // 金矿
 * @param {*} p // 每座金矿对应的需要的工人数量
 * @param {*} w //工人数量
 * 问题：
 * 有一个国家发现了5座金矿，每座金矿的黄金储量不同，需要参与挖掘的工人数也不同。
 * 参与挖矿工人的总数是10人。每座金矿要么全挖，要么不挖，不能派出一半人挖取一半金矿。
 * 要求用程序求解出，要想得到尽可能多的黄金，应该选择挖取哪几座金矿？
 * 
 * 法一：动态规划 ,
 *      时间复杂度： O(N * W), 空间复杂度：O(W)
 *      缺点：如果 N 和 M 都很大时， 时间复杂度 和 空间复杂度 太大
 * 
 * 法二：简单递归
 *      时间复杂度为 O(2^N) ,N 为递归深度
 */

 //g:金矿信息，p:每座金矿人数 ,w：工人总量
const getMostGold = function(g,p,w) {  // 动态规划方式 
    let n = g.length; //金矿数量
    var result = [] // N * W 维数组
    for(let i=0;i<n;i++) {
        // F(1~N,w)
        var f = []
        let po = p[i] //第i座金矿需要第工人数量
        for(let j=0;j<=w;j++) { //第i座金矿 j个工人
            if(i==0) { // F(1, 0~w)
                f.push(j >= po ? g[i] : 0)
            }else {
                let lastF = result[result.length-1] //F(N-1, 0~w)
                let last = lastF[j] // 
                if(j < po) {
                    f.push(last)
                }else {
                    let lastIndex = j - po
                    let gLast = lastF[lastIndex] + g[i]
                    f.push(Math.max(last,gLast))
                }
            }
        }
        result.push(f)
    }
    console.log(result[n-1][w])
    return result
} 
var g = [400, 500, 200, 300, 350] //每座金矿含金量
var p = [5, 5, 3, 4, 3] //每座金矿对应的需要的工人数量
// var g = [500, 200, 300, 400] //每座金矿含金量
// var p = [5, 3, 4, 5] //每座金矿对应的需要的工人数量
console.log(getMostGold(g,p,10))
console.log('===================')


const getMostGold1 = function(g, p , w) {
    console.log('w====' , w)
    if(g.length == 1){
        return w >= p[p.length - 1] ? g[g.length -1] : 0
    }
    let last = getMostGold1(g.slice(0, g.length-1), p.slice(0,p.length-1), w)
    console.log('last====', last)
    console.log('w < p[p.length - 1]===',w < p[p.length - 1])
    if(w < p[p.length - 1]) {
        return last
    }else {
        let current = getMostGold1(g.slice(0, g.length-1),p.slice(0,p.length-1),w-p[p.length-1]) + g[g.length-1]
        return Math.max(last, current)
    }
}
var g = [400, 500] //每座金矿含金量
var p = [5,5] //每座金矿对应的需要的工人数量
console.log(getMostGold1(g,p,10))

console.log('===================')

/**
 * 最长回文串
 * 题目：给定一个包含大写字母和小写字母的字符串，找到通过这些字母构造成的最长的回文串。
 * 1. 在构造过程中，请注意区分大小写。比如 "Aa" 不能当做一个回文字符串。
 * 2. 假设字符串的长度不会超过 1010
 */

const longestPalindrome = (str) => {
    let charTimeAry = new Array(58).fill(0);
    let maxSize = 0;
    for(let i=0; i<str.length; i++) {
        charTimeAry[str[i].charCodeAt() - 65] += 1
    }
    for(let i=0;i<charTimeAry.length;i++) {
        maxSize += parseInt((charTimeAry[i] / 2), 10) * 2;
    }
    return maxSize < str.length ? maxSize + 1 : maxSize
}
console.log(longestPalindrome('abccccdd'))  //7
console.log(longestPalindrome('bb')) //2
console.log(longestPalindrome('Aa')) //1

console.log('===================')

/**
 * 分割数组的最大值 --- 
 * 题目：给定一个非负整数数组和一个整数 m，你需要将这个数组分成 m 个非空的连续子数组。
 * 设计一个算法使得这 m 个子数组各自和的最大值最小。
 * 
 * 注意:数组长度 n 满足以下条件:
 * 1. 1 ≤ n ≤ 1000
 * 2. 1 ≤ m ≤ min(50, n)
 * 
 * 法一：动态规划法：超出时间限制
 * 法二：二分查找法：
 *      <1> 子数组的最大值是有范围的，即在区间[max(nums),sum(nums)]之中
 *      <2> 令low=max(nums)，high=sum(nums)，mid=(l+h)/2，计算数组和最大值不大于mid对应的子数组个数cnt(这个是关键！)
 *      <3> 如果cnt>m，说明划分的子数组多了，即我们找到的mid偏小，故l=mid+1；
 *      <4> 如果cnt<=m，说明划分的子数组少了，即mid偏大(或者正好就是目标值)，故h=mid。
 */

const splitArray = function(nums, m) { //动态规划法 --超出时间限制

    return dfs(nums, m) 
    
    function dfs(nums, m) {
        if(m == 1) {
            return nums.reduce((a,b)=>a+b)
        }
        let max = nums.reduce((a,b)=>a+b)
        for(let i =0;i<nums.length-1;i++) {
            let left = nums.slice(0,i+1)
            let rightSum = dfs(nums.slice(i+1), m-1)
            let leftSum = left.reduce((a,b)=>a+b)
            if(Math.max(leftSum, rightSum) < max) {
                max = Math.max(leftSum, rightSum)
            }
        }
        return max
    }
}

function getArrayMax(arr) {
    let max = 0
    for(let i=0;i<arr.length;i++) {
        if(arr[i] > max) max = arr[i]
    }
    return max
}
const splitArray1 = function(nums, m) { // 二分查找法
    let low = getArrayMax(nums) //1 <= m <= min(50,n) 最小的数组和，即nums数组的最大值，最大值即为 子数组最大和
    let high = nums.reduce((a,b) => a + b)
    /**计算数组和最大值不大于mid对应的子数组个数cnt*/
    while(Math.abs(low - high) > 0.2) {
        let mid = (low + high) / 2
        let temp = 0, cnt = 1;
        for(let i=0;i<nums.length;i++) {
            temp += nums[i]
            if(temp > mid) {
                temp = nums[i]
                cnt++
            }
        }
        if(cnt > m) { //分的组太多了，大于m个，即我们找到的mid偏小，故l=mid+1
            low = mid
        }else {
            high = mid
        }
    }
    return Math.round(low)
}
console.log(splitArray([7,2,5,10,8],2))
console.log(splitArray1([7,2,5,10,8],2))
console.log('============================')

/**
 * 题目：给出输入，编程生成输出
 */
const input = ['a/b', 'a/b', 'a/c', 'a/d', 'a/d/e', 'h/b', 'h/c']
const output = [{
    name: 'a',
    children: [
        { name: 'b' },
        { name: 'c' },
        {
            name: 'd',
            children: [
                { name: 'e' }
            ]
        }
    ]
},{
    name: 'h',
    children: [
        { name: 'b' },
        { name: 'c' }
    ]
}]

const createProvinceData = function(arr) {
    let obj = removeDuplicate(arr)
    return createTree(obj)

    function createTree (obj) {
        let result = []
        for(let key in obj) {
            let tree = {}
            let value = obj[key]
            if(Object.prototype.toString.call(value) == '[object Object]') {
                tree.name = key
                tree.children = createTree(obj[key])
            }else {
                tree.name = key
            }
            result.push(tree)
        }
        return result
    }
    
    function removeDuplicate (arr) {
        let obj = {}
        for(let i=0;i<arr.length;i++) {
            let item = arr[i]
            let index = item.indexOf('/') 
            let key = index == -1 ? item : item.slice(0,index)
            let value = index == -1 ? '' : item.slice(index+1) 
            if(obj[key] && obj[key].length > 0) {
                if(obj[key][0] != value) {
                    console.log(obj[key],value)
                    obj[key] = value.indexOf('/') == -1 ? obj[key].concat([value]) : obj[key].concat([value])
                }
            }else {
                obj[key] = value ? [value] : []
            }
        }
        for(let key in obj) {
            if(obj[key].length > 0) {
                obj[key] = removeDuplicate(obj[key])
            }
        }
        return obj
    }
   
}   

console.log(createProvinceData(input))
console.log(JSON.stringify(output) == JSON.stringify(createProvinceData(input)))


const createProvinceData1 = (arr) => {
    var obj = {}
    let result = arr.reduce((accumulator,item)=>{
        console.log('accumulator===' ,accumulator)
        let index = item.indexOf('/')
        let key = item[0]
        let value = index == -1 ? [item.slice(1)] : [item.slice(2)]
        if(accumulator[key]){
            if(accumulator[key][0] != value) {
                accumulator[key] = accumulator[key].concat(value)
            }
        }else {
            accumulator[key] = value
        }
        return accumulator
    },obj)
    console.log(result)
}

createProvinceData1(input)
console.log('=============================')

/**
 * 17. 电话号码的字母组合
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */
const letterCombinations = (digits) => {
    let map = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    }
    if(digits.length == 1){
        return (map[digits]).split('')
    }
    let temp = map[digits[0]].split('')
    for(let i=1;i<digits.length;i++) {
        let item = map[digits[i]]
        let result = []
        for(let j=0;j<temp.length;j++) {
            for(let k=0;k<item.length;k++) {
                result.push(temp[j] + item[k])
            }
        }
        temp = result
    }
    return temp
}
console.log(letterCombinations('2'))
console.log('=============================')

/**
 * 题目：
 * 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。
 * 返回这三个数的和。假定每组输入只存在唯一答案。
 * 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
 * 与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
 */
const threeSumClosest = function(nums, target) {
    if(nums.length <= 3) {
        return nums.reduce((a,b) => a+b)
    }
    nums = nums.sort((a,b)=>a-b) //升序
    let difference = nums[0] + nums[1] + nums[2]
    for(let i=0;i<nums.length-2;i++){
        let left = i+1, right = nums.length-1;
        while(left<right) {
            sum = nums[i] + nums[left] + nums[right] 
            if(sum == target) {
                return sum
            }else if(Math.abs(sum - target) < Math.abs(difference - target)) {
                difference = sum
            }else if(sum > target) {
                right--
            }else if(sum < target) {
                left++
            }
        }
    }
    return difference
}
console.log(threeSumClosest([-1,2,1,-4], 1))
console.log(threeSumClosest([1,1,1,1],3))
console.log('=============================')

/**
 * 题目：
 * 给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，
 * 使得 a + b + c + d 的值与 target 相等？ 找出所有满足条件且不重复的四元组。
 * 注意：
 * 答案中不可以包含重复的四元组。
 */
const fourSum = function(nums, target) {
    nums = nums.sort((a,b)=>a-b)
    let len = nums.length
    let result = []
    if(len<4) return result
    for(let i=0; i<len-3; i++) {
        if(i==0 || nums[i] > nums[i-1]) {
            let left = i + 1
            let mid = left + 1
            while(left < len-2) {
                let right = len -1
                if(left === i+1 || nums[left] > nums[left-1]) {
                    while(mid < right){
                        let sum = nums[i] + nums[left] + nums[mid] + nums[right]
                        if(sum == target) {
                            result.push([nums[i],nums[left],nums[mid],nums[right]])
                            mid++
                            right--
                            while(nums[mid] == nums[mid-1]){
                                mid++
                            }
                            while(nums[right] == nums[right+1]){
                                right--
                            }
                        }else if(sum > target) {
                            right--
                        }else if(sum < target) {
                            mid++
                        }
                    }
                }
                left++
                mid = left + 1
            }
        }
    }
    return result
}
console.log(fourSum([1,0,-1,0,-2,2],0))
console.log(fourSum([-3,-2,-1,0,0,1,2,3],0))
console.log(fourSum([0,0,0,0],0))
console.log('%c=============================', 'color:red')

/**
 * 题目：四数相加
 * 给定四个包含整数的数组列表 A , B , C , D ,计算有多少个元组 (i, j, k, l) ，使得 A[i] + B[j] + C[k] + D[l] = 0。
 * 为了使问题简单化，所有的 A, B, C, D 具有相同的长度 N，且 0 ≤ N ≤ 500 。所有整数的范围在 -228 到 228 - 1 之间，最终结果不会超过 231 - 1
 */

const fourSumCount = function(A, B, C, D) { //暴力枚举，时间复杂度：O(n^4)
    A = A.sort((a,b) => a-b)
    B = B.sort((a,b) => a-b)
    C = C.sort((a,b) => a-b)
    D = D.sort((a,b) => a-b)
    let count = 0
    for(let i=0;i<A.length;i++){
        if(i==0 || A[i] != A[i-1]) {
            for(let j=0;j<B.length;j++) {
                if(j == 0 || B[i] != B[i-1]) {
                    for(let k = 0;k<C.length;k++) {
                        if(k == 0 || C[i] != C[i-1]) {
                            D.forEach(item=>{
                                let sum = A[i] + B[j] + C[k] + item
                                if(sum == 0) {
                                    count++
                                }
                                if(sum > 0) {
                                    return
                                }
                            })
                        }
                    }
                }
            }
        }
    }
    return count
}
const fourSumCount1 = function(A, B, C, D) {  //时间复杂度：O(n^2)
    let count = 0
    let map1 = new Map()
    for(let i=0;i<A.length;i++){
        for(let j=0;j<B.length;j++) {
            let sum = A[i] + B[j]
            if(map1.has(sum)){
                map1.set(sum, map1.get(sum)+1)
            }else {
                map1.set(sum, 1)
            }
        }
    }
    for(let k=0;k<C.length;k++) {
        for(let l=0;l<D.length;l++) {
            let sum = -(C[k] + D[l])
            if(map1.has(sum)){
                count += map1.get(sum)
            }
        }   
    }
    return count
}
console.log(fourSumCount1([1,2],[-2,-1],[-1,2],[0,2]))

/**
 * 最长字串
 * 题目：
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 输入: "abcabcbb"
 * 输出: 3  , abc
 * 输入: "bbbbb"
 * 输出: 1  , b
 */
const 