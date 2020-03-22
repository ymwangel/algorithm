/**
 * 计数排序
 * 适用范围：适用于一定范围(最大与最小数值之差较小)内的整数排序，取值范围不大的情况，性能 为 O(n)
 * 
 * 优化的 计数排序：假设原始数组长度为n，最大和最小数值之差为m
 * 则，平均时间复杂度：O(n+m)
 * 平均空间复杂度：O(m)
 */

const countSort = function (arr) {
    let max = arr[0]
    for(let i=0;i<arr.length;i++) {
        if(arr[i] > max) max = arr[i]
    }
    // console.log(max)
    let countArray = new Array(max+1).fill(0)
    for(let i=0;i<arr.length;i++) {
        countArray[arr[i]]++
    }
    // console.log(countArray)
    let result = []
    for(let i=0;i<countArray.length;i++) {
        result = result.concat(new Array(countArray[i]).fill(i))
    }
    return result
}
console.log(countSort([4,4,6,5,3,2,8,1,7,5,6,0,10]))

const countSortOptimization = function(arr) { //属于稳定排序 ,可保证两个相等的数值的原始位置
    let max = arr[0],min=arr[0];
    let result = new Array(arr.length)
    for(let i=0;i<arr.length;i++) {
        if(arr[i] > max) max = arr[i]
        if(arr[i] < min) min = arr[i]
    }
    let difference = max-min, offset = min;
    let countArray = new Array(difference+1).fill(0)
    for(let i=0;i<arr.length;i++) {
        countArray[arr[i]-offset]++
    }
    for(let i=1;i<countArray.length;i++) {
        countArray[i] = countArray[i] + countArray[i-1]
    }
    for(let i=arr.length-1;i>=0;i--){ //必须是从后向前遍历
        let sortedIndex = countArray[arr[i]-offset]
        result[sortedIndex-1] = arr[i]
        countArray[arr[i]-offset]--
    }
    return result

}
console.log(countSortOptimization([90,99,95,94,95]))