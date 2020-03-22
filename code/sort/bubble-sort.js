/**
 * 基本冒泡排序
 */
const bubbleSort = function(array) {
    let len = array.length
    for(let i=0;i<len-1;i++){
        for(let j=0;j<len-1-i;j++) {
            if(array[j] > array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
            }
        }
    }
    return array
}
console.log(bubbleSort([5,8,6,3,9,2,1]))

/**
 * 冒泡排序优化--- 如果进行到中途，已经有序了，就无须 继续最外层for循环了
 */

const bubbleSortOptimiztion = function(array) {
    let len = array.length
    for(let i=0;i<len-1;i++){
        let isSorted = true
        for(let j=0;j<len-1-i;j++) {
            if(array[j] > array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
                isSorted = false
            }
        }
        if(isSorted) {
            break;
        }
    }
    return array
}
console.log(bubbleSortOptimiztion([5,8,6,3,9,2,1]))

/**
 * 针对部分序列 已经有序的情况：冒泡排序优化
 */
const bubbleSortOptimiztion2 = function(array) {
    let len = array.length
    let lastExchangeIndex = 0 //记录最后一次交换的位置
    let sortBorder = len - 1  //无序数列边界、每次比较只需要比到这里为止
    for(let i=0;i<len-1;i++){
        let isSorted = true
        for(let j=0;j<sortBorder;j++) {
            if(array[j] > array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
                isSorted = false
                lastExchangeIndex = j
            }
        }
        sortBorder = lastExchangeIndex
        if(isSorted) {
            break;
        }
    }
    return array
}

console.log(bubbleSortOptimiztion2([3,4,2,1,5,6,7,8]))

/**
 * 鸡尾酒排序-- 冒泡排序优化：[2,3,4,5,6,7,8,1]
 * 应用：大部分元素已经有序
 * 思路：双向比较、交换： 第一次从左到右；第二次从右到左；第三次从左到右、第四次从右到左。。。
 */

const bubbleSortOptimiztion3 = function(array) {
    let len = array.length
    for(let i=0; i<len/2;i++) {
        let isSorted = true
        for(let j=i;j<array.length-i-1;j++) {
            if(array[j] > array[j+1]){
                [array[j],array[j+1]] = [array[j+1],array[j]]
                isSorted = false
            }
        }
        if(isSorted) {
            break;
        }
        isSorted = true
        for(let j=array.length-i-1; j>i;j--) {
            if(array[j] < array[j-1]){
                [array[j],array[j-1]] = [array[j-1],array[j]]
                isSorted = false
            }
        }
        if(isSorted){
            break
        }
    }
    return array
}
console.log(bubbleSortOptimiztion3([2,3,4,5,6,7,8,1]))