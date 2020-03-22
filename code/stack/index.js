/**
 * 栈
 */

class Stack {
    constructor() {
        this.items= []
    }
    push(data) {
        this.items.push(data)
    }
    pop() {
        return this.items.pop()
    }
    clear() {
        this.items = []
    }
    get size() {
        return this.items.length
    }
    get peek() {
        return this.items[this.items.length - 1]
    }
    isEmpty() {
        return this.items.length == 0
    }
}
var stack = new Stack()
stack.push(10)
module.exports = Stack