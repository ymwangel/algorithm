/**
 * 1. 需求一：最小栈的实现
 * 需求：实现一个栈，该栈有 出栈（pop）、入栈（push）、取得最小元素（getMin）3个方法。保证3个方法的时间复杂度为O(1)
 */

var Stack = require('./index.js')

class Stack1 extends Stack {
    constructor() {
        super()
        this.minStack = new Stack()
    }
    push(data) {
        this.items.push(data)
        if(this.minStack.isEmpty() || data <= this.minStack.peek){
            this.minStack.push(data)
        }
    }
    getMin() {
        if(!this.minStack.isEmpty()) {
            return this.minStack.peek
        }
    }
}
var stack1 = new Stack1()
stack1.push(4)
stack1.push(9)
stack1.push(7)
stack1.push(3)
console.log(stack1.getMin())

/**
 * 2. 需求：如何用栈实现队列
 */

class StackQueue {
    constructor() {
        this.stackA = new Stack()
        this.stackB = new Stack()
    }
    enqueue(item) {
        this.stackA.push(item)
    }
    dequeue() {
        if(this.stackB.isEmpty()) {
           if(this.stackA.isEmpty()) return null
           this.transfer()
        }
        return this.stackB.pop()
    }
    transfer() {
        while(!this.stackA.isEmpty()){
            this.stackB.push(this.stackA.pop())
        }
    }
}
// var stackQueue = new StackQueue()
// stackQueue.enqueue(10)
// stackQueue.enqueue(9)
// stackQueue.enqueue(3)
// stackQueue.enqueue(25)
// console.log(stackQueue.dequeue())
// console.log(stackQueue.dequeue())
// console.log(stackQueue.dequeue())
// console.log(stackQueue.dequeue())

/**
 * 3.
 */





