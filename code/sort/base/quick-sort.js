/**
 * 快速排序
 * 时间复杂度：
 */
let list = [3,45,23,45,12,49,367,98,20,34,6]
const quickSort = (arr) => {
    if(arr.length <= 1)return arr
    let  pivotIndex = Math.floor(arr.length/2)
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [],right=[];
    for(let i=0;i<arr.length;i++){
       arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
    }
    return quickSort(left).concat(pivot,quickSort(right))
}
console.log(quickSort(list))