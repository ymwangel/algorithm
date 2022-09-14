/**
 * 树、二叉树相关
 */
var Stack = require('../stack/index.js')
var Queue = require('../queue/index')

/**
 * 1. 二叉查找树(二叉排序树)
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
    preOrderTraversal(node) { //递归-前序遍历 （根节点->左节点->右节点）
        if(node == null) return
        this.preOrderTraversalArr.push(node.data)
        this.preOrderTraversal(node.left)
        this.preOrderTraversal(node.right)
    }
    inOrderTraversal(node){ //递归-中序遍历  （左节点->根节点->右节点）
        if(node == null) return
        this.inOrderTraversal(node.left)
        this.inOrderTraversalArr.push(node.data)
        this.inOrderTraversal(node.right)
    } 
    posOrderTraversal(node) { //递归-后序遍历   （左节点->右节点->根节点）
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
// tree.preOrderTraversal(tree.root)
// console.log(tree.preOrderTraversalArr)
// tree.inOrderTraversal(tree.root)
// console.log(tree.inOrderTraversalArr)
// tree.posOrderTraversal(tree.root)
// console.log(tree.posOrderTraversalArr)

// console.log(tree.preOrderStackTraversal(tree.root))
// console.log(tree.inOrderStackTraversal(tree.root))
// console.log(tree.posOrderStackTraversal(tree.root))

// console.log(tree.levelOrderTraversal(tree.root))

/**
 * 2. 打印一个二叉树中，所有根节点到叶子节点的路径
 *   1
 *  / \
 * 2   3
 *  \
 *   5
 * 打印：['1->2->5', '1->3']
 * 输入：root = [1, 2, 3, null, 5] ,输出：['1->2->5', '1->3']
 * 输入：root = [1], 输出：["1"]
 */

/**
 * 方法一：深度优先搜索
    思路与算法：
    最直观的方法是使用深度优先搜索。在深度优先搜索遍历二叉树时，我们需要考虑当前的节点以及它的孩子节点。
    如果当前节点不是叶子节点，则在当前的路径末尾添加该节点，并继续递归遍历该节点的每一个孩子节点。
    如果当前节点是叶子节点，则在当前路径末尾添加该节点后我们就得到了一条从根节点到叶子节点的路径，将该路径加入到答案即可。
    如此，当遍历完整棵二叉树以后我们就得到了所有从根节点到叶子节点的路径。当然，深度优先搜索也可以使用非递归的方式实现，这里不再赘述
 */

const binaryTreePaths = (root) => {
  let res = []
  if (!root) return res
  if (!root.left && !root.right) {
    return [`${root.val}`]
  }
  let leftPaths = binaryTreePaths(root.left)
  let rightPaths = binaryTreePaths(root.right)
  leftPaths.forEach(leftPath => {
    res.push(`${root.val}->${leftPath}`)
  })
  rightPaths.forEach(rightPath => {
    res.push(`${root.val}->${rightPath}`)
  })
  return res
}
/**
 * 方法二：广度优先搜索
 * 思路与算法:
 *    1. 用广度优先搜索来实现。维护一个队列，存储节点以及根到该节点的路径。
 *    2. 一开始这个队列里只有根节点。
 *    3. 在每一步迭代中，我们取出队列中的首节点，如果它是叶子节点，则将它对应的路径加入到答案中。如果它不是叶子节点，则将它的所有孩子节点加入到队列的末尾。
 *    4. 当队列为空时广度优先搜索结束，我们即能得到答案。
 */

const binaryTreePaths2 = root => {
  const paths = []
  if (root == null) return paths
  const node_queue = [root]
  const path_queue = [root.val]
  while(node_queue.length) {
    const node = node_queue.shift()
    const path = path_queue.shift()
    if (node.left == null && node.right === null) {
      paths.push(path)
    } else {
      if (node.left !== null) {
        node_queue.push(node.left)
        path_queue.push(path + '->' + node.left.val)
      }
      if (node.right !== null) {
        node_queue.push(node.right)
        path_queue.push(path + '->' + node.right.val)
      }
    }
  }
  return paths
}
let binaryTree = {
  val: '1',
  left: {
    val: '2',
    left: {
      val: '4', 
      left: {
        val: '8',
        left: null,
        right: null
      },
      right: {
        val: '9',
        left: null,
        right: null
      }
    },
    right: {
      val: '5',
      left: {
        val: '10',
        left: null,
        right: null
      },
      right: {
        val: '11',
        left: null,
        right: null
      }
    }
  },
  right: {
    val: '3',
    left: {
      val: '6',
      left: {
        val: '12',
        left: null,
        right: null
      },
      right: {
        val: '13',
        left: null,
        right: null
      }
    },
    right: {
      val: 7,
      left: {
        val: 14,
        left: null,
        right: null
      },
      right: {
        val: 15,
        left: null,
        right: null
      }
    }
  }
}
// console.log(binaryTreePaths(binaryTree))
// console.log(binaryTreePaths2(binaryTree))

/**
 * 3. 在每个树行中找最大值（广度优先遍历（BFS）问题）
 *   BFS 的套路其实就是维护一个 queue 队列，在读取子节点的时候同时把发现的孙子节点 push 到队列中，但是先不处理，等到这一轮队列中的子节点处理完成以后，下一轮再继续处理的就是孙子节点了，这就实现了层序遍历，也就是一层层的去处理。
 * 输入:

          1
         / \
        3   2
       / \   \
      5   3   9

  *输出: [1, 3, 9]
 */

const largestValues = root => {
  if (!root) return []
  let queue = [root]
  let maxnums = []
  while(queue.length) {
    let max = Number.MIN_SAFE_INTEGER
    // 这里需要先缓存length 这个length代表当前层级的所有节点
    // 在循环开始后 会push新的节点 length就不稳定了
    let len = queue.length
    for(let i = 0; i < len; i++) {
      let node = queue[i]
      max = Math.max(node.val, max)
      node.left&&queue.push(node.left)
      node.right&&queue.push(node.right)
    }
    // 本「层级」处理完毕，截取掉。
    for (let i = 0; i < len; i++) {
      queue.shift()
    }
    maxnums.push(max)
  }
  return maxnums
}
let largestValuesRoot = {
  val: 1,
  left: {
    val: 3,
    left: {
      val: 5,
      left: null,
      right: null
    },
    right: {
      val: 3,
      left: null,
      right: null
    }
  },
  right: {
    val: 2,
    left: null,
    right: {
      val: 9,
      left: null,
      right: null
    }
  }
}
console.log(largestValues(largestValuesRoot))

/**
 * 4. 螺旋树
 */

const spiralOrder = function (matrix) {
  let m = matrix.length
  if (m === 0) return []
  if (m === 1) return matrix[0]
  let n = matrix[0].length
  if (n === 0) return []
  if (n === 1) return matrix[0].map(item => item[0])

  let min = 0
  let maxRowIndex = n - 1
  let maxColIndex = m - 1
  let i, j;
  const ans = []

  while(maxColIndex >= min && maxRowIndex >= min) { // 当前行最大索引 和 列最大索引 不得小于最小索引
    i = min // 从左上角开始
    j = min

    while(j < maxRowIndex) { // 从左向右
      ans.push(matrix[i][j++])
    }
    while(i < maxColIndex) { // 从上向下
      ans.push(matrix[i++][j])
    }

    ans.push(matrix[i][j]) //推入右下角元素

    while(j > min && maxRowIndex > min) { // 如果不止1行，那么需要从右向左遍历
      ans.push(matrix[i][--j])
    }
    while(i > min + 1 && maxRowIndex > min) { // 如果不止1列，那么需要从下向上遍历
      ans.push(matrix[--i][j])
    }
    min++
    maxRowIndex--
    maxColIndex--
  }
  return ans
}
let arr = [
  [ 1, 2, 3 ],
  [ 4, 5, 6 ],
  [ 7, 8, 9 ]
  ]
console.log(spiralOrder(arr))
let arr1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12], 
  [13,14,15,16]
  ]
console.log(spiralOrder(arr1))

