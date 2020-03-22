/**
 * 堆排序：
 * 从小到大排序：构建大顶堆
 * 从大到小排序：构建小顶堆
 * 时间复杂度: O(nlogn)
 * 空间复杂度：O(1)
 */
var BinaryHeap = require('../heap/index.js')

console.log(BinaryHeap)

const heapSort = function(arr) {
    var heap = new BinaryHeap(arr)
    let len = arr.length
    for(let i=len-1;i>0;i--) {
        [arr[0],arr[i]] = [arr[i],arr[0]];
        heap.bigTopDownAdjust(arr,0,i)
    }
    return heap.heap
}

console.log(heapSort([10,8,9,7,5,4,6,3,2]))