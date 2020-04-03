var Stack = require('../stack/index.js')
var Queue = require('../queue/index')

/**
 * 二叉查找树(二叉排序树)
 * TODO: 深度优先、广度优先
 */
class BinNode { //节点
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null
        this.preOrderTraversalArr = []
        this.inOrderTraversalArr = []
        this.posOrderTraversalArr = []
    }
    insert(data) {
        let newNode = new BinNode(data)
        const insertNode = (node, newNode) => {
            if(newNode.data < node.data) {
                if(node.left == null) {
                    node.left = newNode
                }else {
                    insertNode(node.left, newNode)
                }
            }else {
                if(node.right == null) {
                    node.right = newNode
                }else {
                    insertNode(node.right, newNode)
                }
            }
        }
        if(!this.root) {
            this.root = newNode
        }else {
            insertNode(this.root, newNode)
        }

    }
    preOrderTraversal(node) { //递归-前序遍历
        if(node == null) return
        this.preOrderTraversalArr.push(node.data)
        this.preOrderTraversal(node.left)
        this.preOrderTraversal(node.right)
    }
    inOrderTraversal(node){ //递归-中序遍历
        if(node == null) return
        this.inOrderTraversal(node.left)
        this.inOrderTraversalArr.push(node.data)
        this.inOrderTraversal(node.right)
    }
    posOrderTraversal(node) { //递归-后序遍历
        if(node == null) return
        this.posOrderTraversal(node.left)
        this.posOrderTraversal(node.right)
        this.posOrderTraversalArr.push(node.data)
    }
    preOrderStackTraversal(node) { // 栈-前序遍历
        var stack = new Stack()
        var result = []
        stack.push(node)
        while(!stack.isEmpty()) {
            node = stack.pop()
            result.push(node.data)
            if(node.right) stack.push(node.right)
            if(node.left) stack.push(node.left)
        }
        return result
    }
    inOrderStackTraversal(node) { //栈-中序遍历 ： 先把树的左节点推入栈，然后取出，再推右节点
        var stack = new Stack()
        var result = []
        let root = node
        while(root != null || !stack.isEmpty()) {
            while(root != null) {
                stack.push(root)
                root = root.left
            }
            if(!stack.isEmpty()) {
                let peek = stack.pop() //弹出栈顶元素
                result.push(peek.data) 
                root = peek.right
            }
        }
        return result
    }
    posOrderStackTraversal(node) { //栈-后序遍历 ： 先把根结点和左树推入栈，然后取出左树；再推入右树，然后取出右树；最后取出根结点
        var stack = new Stack()
        var result = []
        stack.push(node)
        var tmp = null
        while(!stack.isEmpty()) {
            tmp = stack.peek
            if(tmp.left && node!== tmp.left && node !== tmp.right) {
                stack.push(tmp.left)
            }else if(tmp.right && node !== tmp.right) {
                stack.push(tmp.right)
            }else {
                let peek = stack.pop()
                result.push(peek.data)
                node = tmp
            }
        }
        return result
    }
    levelOrderTraversal(root) { //层序遍历 -- 队列
        var result = []
        var queue = new Queue()
        queue.enqueue(root)
        while(!queue.isEmpty()) {
            let item = queue.dequeue()
            result.push(item.data)
            if(item.left) queue.enqueue(item.left)
            if(item.right) queue.enqueue(item.right)
        }
        return result
    }
}
var tree = new BinarySearchTree()
tree.insert(6)
tree.insert(4)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(5)
// // console.log(tree)
tree.preOrderTraversal(tree.root)
console.log(tree.preOrderTraversalArr)
tree.inOrderTraversal(tree.root)
console.log(tree.inOrderTraversalArr)
tree.posOrderTraversal(tree.root)
console.log(tree.posOrderTraversalArr)

console.log(tree.preOrderStackTraversal(tree.root))
console.log(tree.inOrderStackTraversal(tree.root))
console.log(tree.posOrderStackTraversal(tree.root))

console.log(tree.levelOrderTraversal(tree.root))


