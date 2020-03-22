/**
 * 利用二叉堆（小顶堆、大顶堆）构建 优先队列
 */
const BinaryHeap = require('../heap/index')
console.log(BinaryHeap)

class PriorityQueue {
    constructor(arr) {
        this.bigTopBinaryHeap = new BinaryHeap(arr)
        this.priorityQueue = this.bigTopBinaryHeap.heap
    }
    enqueue(item) {
        this.bigTopBinaryHeap.bigTopInsert(item)
        this.priorityQueue = this.bigTopBinaryHeap.heap
    }
    dequeue() {
        this.bigTopBinaryHeap.remove()
        this.priorityQueue = this.bigTopBinaryHeap.heap
    }
    resize() {
        this.priorityQueue = this.priorityQueue.concat(new Array(this.priorityQueue.length).fill())
    }
}

var preQueue = new PriorityQueue([10,8,9,7,1,4,6,3,2])
console.log(preQueue.priorityQueue)
preQueue.enqueue(5)
console.log(preQueue.priorityQueue)
preQueue.dequeue()
console.log(preQueue.priorityQueue)