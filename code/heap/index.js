/**
 * 二叉堆: 存储方式：顺序存储
 */

class BinaryHeap {
    constructor(array) {
        this.h = 0 //二叉树的深度
        this.heap = [] //小顶堆
        this.buildHeap(array) //构建 二叉顶堆
    }
    buildHeap(array){
        if(!array || array.length == 0 ) return
        this.h = Math.ceil((Math.log(array.length))/(Math.log(2)))
        for(let i=Math.floor((array.length-2)/2);i>=0;i--){
            // 小顶堆
            // this.downAdjust(array,i,array.length)
            // 大顶堆
            this.bigTopDownAdjust(array, i ,array.length)
        }
        this.heap = array
    }
    insert(item) { // 小顶堆 - 插入节点 (上浮法)
        if(this.heap.length == 0){
            this.heap = [item]
            return
        }
        let array = this.heap
        array.push(item)
        let childIndex = array.length - 1
        let parentIndex = Math.floor((childIndex-1)/2)
        let temp = array[childIndex]
        while(childIndex > 0 && temp < array[parentIndex]){
            array[childIndex] = array[parentIndex]
            childIndex = parentIndex
            parentIndex = Math.floor((parentIndex - 1)/2)
        }
        array[childIndex] = temp
        this.heap = array
    }
    bigTopInsert(item) { // 大顶堆 - 插入节点 (上浮法)
        if(this.heap.length == 0){
            this.heap = [item]
            return
        }
        let array = this.heap
        array.push(item)
        let childIndex = array.length - 1
        let parentIndex = Math.floor((childIndex-1)/2)
        let temp = array[childIndex]
        while(childIndex > 0 && temp > array[parentIndex]){
            array[childIndex] = array[parentIndex]
            childIndex = parentIndex
            parentIndex = Math.floor((parentIndex - 1)/2)
        }
        array[childIndex] = temp
        this.heap = array
    }
    remove() { //小顶堆-删除节点 ：删除堆顶节点，然后让最后一个节点暂时充当堆顶节点，然后 下沉法 重新构建小顶堆
        let array = this.heap
        array.shift()
        array = [array[array.length-1]].concat(array.slice(0, array.length-1))
        // TODO 优化：只需堆array的第一个元素做 下沉 即可，因为其他元素已经是有序
        // this.buildHeap(array) //是整个数组重新开始做 下沉 
        this.bigTopDownAdjust(array, 0, array.length)
        this.heap = array
    }
    downAdjust(array,parentIndex,length) { // 构建小顶堆-- 下沉法
        var temp = array[parentIndex]
        var childIndex = 2 * parentIndex + 1
        while(childIndex<length) { //如果有右节点
            if(childIndex + 1 < length && array[childIndex + 1] < array[childIndex]){
                childIndex++
            }
            if(temp <= array[childIndex]) break
            array[parentIndex] = array[childIndex]
            parentIndex = childIndex
            childIndex = 2 * childIndex + 1
        }
        array[parentIndex] = temp
    }
    bigTopDownAdjust(array, parentIndex, length) { //构建大顶堆 - 下沉法
        var temp = array[parentIndex]
        var childIndex = 2 * parentIndex + 1
        while(childIndex<length) { //如果有右节点
            if(childIndex + 1 < length && array[childIndex + 1] > array[childIndex]){
                childIndex++
            }
            if(temp >= array[childIndex]) break
            array[parentIndex] = array[childIndex]
            parentIndex = childIndex
            childIndex = 2 * childIndex + 1
        }
        array[parentIndex] = temp
    }
}
//小顶堆
// var binaryHeap = new BinaryHeap([1,3,2,6,5,7,8,9,10]) 
// binaryHeap.insert(0)
// binaryHeap.remove()
// var binaryHeap1 = new BinaryHeap([6,4,8,10,9,3,7])
// binaryHeap1.insert(5)
// binaryHeap1.remove()

//大顶堆
// var binaryHeap2 = new BinaryHeap([10,8,9,7,1,4,6,3,2])
// console.log(binaryHeap2.heap)
// binaryHeap2.bigTopInsert(5)
// console.log(binaryHeap2.heap)
// binaryHeap2.remove()
// console.log(binaryHeap2.heap)

module.exports = BinaryHeap
