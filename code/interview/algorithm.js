
/**
 * 需求二：求最大公约数 
 * 法一：辗转相除法： 两个正整数a,b(a>b)，a与b 的最大公约数 = (a%b) 与 b 的最大公约数
 * 法二：更相减损术 ：两个正整数a,b(a>b)，a与b 的最大公约数 = (a%b) 与 b 的最大公约数 
 * 法三：更相减损术 + 移位运算
 *     <1>: 当 a，b都是偶数时，gcd(a,b) = 2 * gcd(a/2,b/2) = 2 * gcd(a>>1,b>>1)  
 *     <2>: 当 a 为偶数，b 为奇数时，gcd(a,b) = gcd(a/2,b) = gcd(a>>1,b)
 *     <3>: 当 a 为奇数，b 为偶数时，gcd(a,b) = gcd(a,b/2) = gcd(a,b>>1)
 *     <4>: 当 a，b都是奇数时，gcd(a,b) = gcd(b, a-b)；此时，a-b必然是偶数，重复第<3>步  
 *      
 * a，b 都是较大整数时，%(取模)运算性能差，所以使用 更相减损术,但是a-b 使得 递归的运算次数 > 辗转相除法的运算次数
 * 
 * 时间负责度：
 * 法一：辗转相除法: 近似为 O(log(max(a,b)))
 * 法二：更相减损术: 性能不稳定，最坏时间负责度：O(max(a,b))
 * 法三：更相减损术 + 移位运算: O(log(max(a,b))) ,避免了%取模运算、而且算法性能稳定
 */
const getGreastestCommonDivisor = function(a,b){ //辗转相除法
    let big = a > b ? a :b
    let small = a < b ? a : b
    if(big%small == 0) return small
    return getGreastestCommonDivisor(big%small,small)
}
console.log(getGreastestCommonDivisor(25,15))

const getGreastestCommonDivisorV2 = function(a,b) { //更相减损术
    if(a == b) return a
    let big = a > b ? a :b
    let small = a < b ? a : b
    return getGreastestCommonDivisorV2(big-small,small)
}
console.log(getGreastestCommonDivisor(100,15))

const gcd = function(a,b) {  // 更相减损术 + 移位运算 
    if(a == b) return a
    if((a&1)==0 && (b&1) == 0){ // &:按位与； &&:与 
        // a，b都是偶数
        return gcd(a>>1,b>>1)<<1
    }else if((a&1) == 0 && (b&1) != 0) {
        return gcd(a>>1,b)
    }else if((a&1) != 0 && (b&1) == 0) {
        return gcd(a,b>>1)
    }else {
        let big = a > b ? a :b
        let small = a < b ? a : b
        return gcd(big-small,small)
    }
}

console.log(gcd(200,150))

/**
 * 需求：判断一个数，是否为 2 的整数次幂
 */
const isPowerOf2 = (num) => {
    return (num&(num-1)) == 0
}
console.log(isPowerOf2(19))

/**
 * 需求：
 * 计算无序数组排序后的最大相邻差，时间复杂度、空间复杂度尽可能低
 * 法一：计数排序（线性的）： 一般的数据可以，但是当array 最大值 - 最小值 = 很大值时，性能差
 * 法二：桶排序（线性当）：
 */

const getMaxSorteDistance = (array) => { //计数排序
    let max = array[0],min = array[0];
    for(let i=1;i<array.length-1;i++) {
        if(array[i] > max) max = array[i]
        if(array[i] < min) min = array[i]
    }
    let d = min
    let countArray = new Array(max-min + 1).fill(0)
    for(let i=0;i<array.length;i++) {
        countArray[array[i]-d]++
    }
    // 判断 0 值 最多连续出现的次数
    let count = 0, maxDistance=0;
    for(let i=0;i<countArray.length;i++) {
        if(countArray[i] == 0){
            count++
        }else {
            maxDistance = Math.max(maxDistance,count)
            count = 0
        }
    }
    return maxDistance+1
}
console.log(getMaxSorteDistance([2,6,3,4,5,10,9]))

/**
 * 需求：寻找全排序的下一个数 ----- 字典序算法
 * 题目：给出一个正整数，找出这个正整数所有数字全排列的下一个数
 * 例如：输入：12345，返回：12354
 *      输入：12354，返回：12435
 *      输入：12435，返回：12453
 *      输入：54321，返回：null
 * 步骤：
 *      <1>从后向前查看逆序区域，找到逆序区域的前一位，也就是数字置换的边界
 *      <2>让逆序区域的前一位和逆序区域中大于它的最小的数字交换位置
 *      <3>把原来的逆序区域转为 顺序状态
 */
const getMaxAndMin = (arr) => {
    let min = max = arr[0];
    for(let i=1;i<arr.length;i++) {
        if(arr[i]>arr[0]) max = arr[i]
        if(arr[i]<arr[0]) min = arr[i]
    }
    return {max,min}
}
const findNearestNumber = (numbers) => {
    let arr = (numbers+'').split('')
    let index = findTransferPoint(arr) //找到逆序区域的前一位，也就是数字置换的边界
    if(index == 0) return null
    let nearsetBigNumberIndex = getNearsetBigNumber(arr,index); //找到逆序区域中大于 逆序前一位 的最小的数字交换位置
    [arr[index-1], arr[nearsetBigNumberIndex]] = [arr[nearsetBigNumberIndex], arr[index-1]];
    return transfer(arr,index).join('')
    
    function findTransferPoint(arr) {
        for(let i=arr.length-1;i>=0;i--){
            if(arr[i] > arr[i-1]){
                return i
            }
        }
        return 0
    }
    function getNearsetBigNumber(arr,index) { // 在arr中获取 > temp 的最小的元素
        let temp = arr[index-1]
        let {max,min} = getMaxAndMin(arr.slice(index))
        let maxIndex = index + arr.slice(index).findIndex(item=>max)
        let distance = max - temp
        let  idx
        for(let i=index;i<arr.length;i++) {
            let d = arr[i] - temp
            if(d > 0 && d < distance) {
                idx = i
                distance = d
            }
        }
        return idx ? idx : maxIndex
    }
    function transfer(arr,index) { //将逆序区域转化为 顺序状态
        for(let i=index,j=arr.length-1; i<j;i++,j--){
            [arr[i],arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }
}
console.log(findNearestNumber(12354)) //12435
console.log(findNearestNumber(12435)) //12453
console.log(findNearestNumber(12453)) //12534
console.log(findNearestNumber(54321)) //null
console.log(findNearestNumber(12351)) // 12513
console.log(findNearestNumber(374321)) // 412337
console.log('======')

/**
 * 需求：删除 k 个数字后的最小值----贪心算法
 * 题目：给出一个整数，删除整数中  k 个数字，要求剩下的数字 形成的新整数尽可能的小
 * 例如：整数1593212， k=3 ，新整数：1212
 */
const removeDigits = (num,k) => {
    let arr = (num+'').split('')
    for(let i=0;i<k;i++) {
        let hasCut = false
        for(let j=0;j<arr.length-1;j++) {
            if(arr[j] > arr[j+1]){
                arr.splice(j,1)
                hasCut = true
                break;
            }
        }
        if(!hasCut) {
            arr.slice(arr.length-1,1)
        }
    }
    // 清楚整数左侧的0
    let start = 0
    for(let j=0;j<arr.length-1;j++) {
        if(arr[j] != 0) break
        start++
    }
    arr.splice(0,start)
    if(arr.length == 0) return 0
    return arr.join('')
}
console.log(removeDigits(1593212, 3))
console.log(removeDigits(30200, 1))
console.log(removeDigits(10, 2))
console.log(removeDigits(541270936, 3))
console.log('===========================')

var Stack = require('../stack/index.js')

const removeDigitsOptimization = function(num,k) {
    let arr = (num + '').split('')
    var stack = new Stack()
    for(let i=0;i<arr.length;i++) {
        if(stack.isEmpty()){
            stack.push(arr[i])
        }else {
            while(!stack.isEmpty() && k>0){
                let peek = stack.peek
                if(peek > arr[i]) {
                    stack.pop()
                    k = k-1
                }else {
                    break;
                }
            }
            stack.push(arr[i])
        }
    }
    let start = 0, items = stack.items;
    for(let j=0;j<items.length-1;j++) {
        if(items[j] != 0) break
        start++
    }
    items.splice(0,start)
    return items.join('')
}
console.log(removeDigitsOptimization(1593212, 3))
console.log(removeDigitsOptimization(30200, 1))
console.log(removeDigitsOptimization(10, 2))
console.log(removeDigitsOptimization(541270936, 3))
console.log('===========================')

/**
 * 如何实现最大整数相加
 * 法一：按位拆分
 * 法二：优化： 把长数组分成（len/9）组，每组 9位数，因为计算机可计算当长度时 10位，防止溢出，每组设置为9位数 。---当两个数字非常大时，位数很多，可进行优化
 */
const getSum = (_arr1, _arr2) => {
    _arr1 = _arr1.map(item=>Number(item))
    _arr2 = _arr2.map(item=>Number(item))
    let len = _arr1.length
    let result = new Array(len+1).fill(0)
    for(let i=0;i<len;i++) {
        let sum = _arr1[i] + _arr2[i] + (i == 0 ? 0 : result[i])
        let d = sum - 10
        if(d >= 0) {
            result[i] = sum - 10
            result[i+1] =  1
        }else{
            result[i] = sum
        }
    }
    return result
}
const bigNumberSum = (num1,num2) => {
    let arr1 = (num1+'').split('').map(item => Number(item))
    let arr2 = (num2+'').split('').map(item => Number(item))
    let len1 = arr1.length
    let len2 = arr2.length
    let len = len1 > len2 ? len1 : len2
    let _arr1 = [], _arr2 = [];
    for(let i=arr1.length-1; i>=0;i--) {
        _arr1.push(arr1[i])
    }
    for(let j=arr2.length-1; j>=0;j--) {
        _arr2.push(arr2[j])
    }
    _arr1 = _arr1.concat(new Array(len-arr1.length).fill(0))
    _arr2 = _arr2.concat(new Array(len-arr2.length).fill(0))

    let result = getSum(_arr1, _arr2)
    if(result[len] == 0) {
        result = result.slice(0, len)
    }
    return result.reverse().join('')
}
console.log(bigNumberSum(926709752318, 95481253129))
console.log('===========================')

const bigNumberSumOptimization = (num1, num2) => {
    let arr1 = (num1+'').split('').map(item => Number(item))
    let arr2 = (num2+'').split('').map(item => Number(item))
    let len1 = arr1.length
    let len2 = arr2.length
    let len = len1 > len2 ? len1 : len2
    let _arr1 = [], _arr2 = [];
    for(let i=arr1.length-1; i>=0;i--) {
        _arr1.push(arr1[i])
    }
    for(let j=arr2.length-1; j>=0;j--) {
        _arr2.push(arr2[j])
    }
    _arr1 = _arr1.concat(new Array(len-arr1.length).fill(0))
    _arr2 = _arr2.concat(new Array(len-arr2.length).fill(0))
    let _gar1 = []
    let _gar2 = []
    let groups = Math.ceil(len/9)
    for(let i=0,j=0;i<groups,j<groups;i++,j++) {
        _gar1.push(_arr1.slice(i*9, (i+1)*9))
        _gar2.push(_arr2.slice(i*9, (i+1)*9))
    }

    let lastItem = 0, result= [];
    for(let i=0;i<groups;i++) {
        _gar1[i][0] = Number(_gar1[i][0]) + Number(lastItem)
        let r = getSum(_gar1[i], _gar2[i])
        lastItem = r[r.length-1]
        result.push( i == groups-1 ? r :r.slice(0,r.length-1))
    }
    result = result.reduce((a,b) => a.concat(b) )
    return result.reverse().join('')
}
console.log(bigNumberSumOptimization(926709752318, 95481253129))
console.log('===========================')

/**
 * 求两个单链表的和
 * 题目：
 *      两个单链表（singly linked list），每一个节点里面一个0-9的数字， 输入就相当于两个大数了。然后返回这两个数的和（一个新list）。
 * 注意：
 *      1. 这两个输入的list 长度相等。 
 * 要求是：
 *      1. 不用递归。
 *      2. 要求算法在最好的情况下，只遍历两个list一次， 最差的情况下两遍。
 */

