/**
 * 队列
 * 优先队列：最小优化队列、最大优先队列
 */

class Queue {
    constructor(items) {
        this.items = items || []
    }
    enqueue(data) { //普通队列
        this.items.push(data)
    }
    enpriorityqueue (data, priority) { //最小优先队列 
        const queueElement = {data,priority}
        if(this.isEmpty()) {
            this.items.push({data, priority})
        }else {
            const preIndex = this.items.findIndex(item=>queueElement.priority > item.priority)
            if(preIndex > -1) {
                this.items.splice(preIndex,0,queueElement)
            }else {
                this.items.push(queueElement)
            }
        }
    }
    dequeue() {
        return this.items.shift()
    }
    depriorityqueue() { //最大优先队列
        var priority = this.items[0].priority
        var result = -1
        this.items.forEach((item,index)=>{
            if(item.priority > priority) {
                priority = item.priority
                result = index
            }
        })
        return this.items[result].data
    }
    clear() {
        this.items = []
    }
    get size() {
        return this.items.length
    }
    isEmpty() {
        return !this.items.length
    }
}
var s = new Queue()
s.enqueue(4)
// console.log(s.items)
module.exports = Queue