/**
 * 如何判断链表中是否有环？
 */
var { LinkNode, SingleLinkList } = require('./index.js')

const isCycle = function(head) {
    let i=head, j=head;
    while(j!=null && j.next!=null) {
        i=i.next
        j=j.next.next
        if(i == j) {
            return true
        }
    }
    return false
}

console.log('=======================================')

/**
 * 问题一： 如果一个链表有环，求环的长度
 */

const getCycleLen = function(head) {
    let count = 0 //表示相遇次数
    let step = 0 //表示环的长度
    let i=head, j=head;
    while(j!=null && j.next!=null) {
        i=i.next
        j=j.next.next
        if(count == 2) {
            return step // 代表第二次相遇
        }else if(count == 1){
            step++
        }
        if(i == j) {
            count++
        }
    }
}

/**
 * 问题二： 如果链表有环，如何求出入环节点
 */

const getEntryCycleNode = function(head) { 
    let i=head, j=head;
    let firstMetNode = null
    while(j!=null && j.next!=null) {
        i=i.next
        j=j.next.next
        if(i == j) {
            firstMetNode = j
            break;
        }
    }
    console.log('firstMetNode.element===',firstMetNode.element)
    i=head 
    while(j!=null && j.next!=null) {
        i=i.next
        j=j.next
        if(i == j) {
            return j.element
        }
    }
}


var node1 = new LinkNode(5)
var node2 = new LinkNode(3)
var node3 = new LinkNode(7)
var node4 = new LinkNode(2)
var node5 = new LinkNode(6)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5
node5.next = node2  

console.log(isCycle(node1))
console.log(getCycleLen(node1))
console.log(getEntryCycleNode(node1))
console.log('=======================================')


/**
 * 求两个单链表的和
 * 题目：
 *      两个单链表（singly linked list），每一个节点里面一个0-9的数字， 输入就相当于两个大数了。然后返回这两个数的和（一个新list）。
 * 注意：
 *      1. 这两个输入的list 长度相等。 
 * 要求是：
 *      1. 不用递归。
 *      2. 要求算法在最好的情况下，只遍历两个list一次， 最差的情况下两遍。
 */

var list1 = new SingleLinkList()
var list2 = new SingleLinkList()
list1.append(1)
list1.append(3)
list1.append(4)
list1.append(5)
list1.append(6)

list1.append(7)

list2.append(3)
list2.append(6)
list2.append(5)
list2.append(5)
list2.append(3)

list2.append(3)

const singleListSum = function(list1, list2) {
    let result = new SingleLinkList()
    let arr = []
    let p = null
    let head1 = list1.head, head2 = list2.head;
    let sum = head1.element + head2.element
    if(sum >=9) {
        sum >9 ? result.append(1) : result.append(0)
        result.append(sum > 9 ? (sum - 10) : sum )
        p = 1
    }else {
        result.append(sum)
        p = result.length // 方便利用findIndex函数
    }
    while(head1.next && head2.next) {
        let nextSum = head1.next.element + head2.next.element
        if(nextSum >=9) {
            if(nextSum > 9) {
                result.append(nextSum)
                dealRangeList( p, result.length) // 将p与这个nextSum的中间位置为 0，p位置+1，nextSum位置的值为 nextSum - 10
                p = result.length
            }else {
                result.append(nextSum)
            }
        }else {
            result.append(nextSum)
            p = result.length
        }
        head1.next = head1.next.next
        head2.next = head2.next.next
    }

    return consoleResult()

    function dealRangeList(startIndex, endIndex) {
        let startNode = result.findIndex(startIndex)
        let endNode = result.findIndex(endIndex)
        result.update(startIndex, startNode + 1)
        result.update(endIndex, endNode - 10)
        for(let i=startIndex+1;i<endIndex;i++) {
            result.update(i, 0)
        }
    }
     //result为 结果链表，为了方便查看，打印为数组输出
    function consoleResult() {
        let arr = [], head = result.head;
        while(head) {
            arr.push(head.element)
            head = head.next
        }
        return arr
    }
    
}
console.log(singleListSum(list1,list2))
console.log('============================================')

/**
 * 找到两个单链表相交的起始节点。
 * 注意：
 * 1. 如果没有相交点返回null
 * 2. 在返回结果后，两个链表仍保持原🈶️的结构
 * 3. 可假设整个链表结构没有循环
 * 4. 尽量满足时间复杂度：O(N), 空间复杂度：O(1)
 * 
 * 法一：双指针法
 * 思路：
 * 1. 创建两个指针 pA、pB，分别初始化为 A 和 B 的头节点，然后向后逐节点遍历
 * 2. 当 pA 达到链表当尾部时，将它重定位到 B的头节点； 当 pB 达到链表尾部时，将它重定位到A的头节点
 * 3. 若在某一时刻 pA 和 pB 相遇，则 pA 或者 pB 为相交节点
 * 4. 如果
 * 
 */
const getIntersectionNode = function(headA, headB) {
    let pA = headA, pB = headB;
    while(pA !== pB) {
        pA = pA ? pA.next : headB  // pA = pA.next ? pA.next : headB 是错误的，这样判断当没有交点的时候，是不能判断出来的
        pB = pB ? pB.next : headA
    }
    return pA
}
var headA = new LinkNode(4)
var secondA = new LinkNode(1)
var three = new LinkNode(8)
var four = new LinkNode(4)
var five = new LinkNode(5)

var headB = new LinkNode(5)
var secondB = new LinkNode(1)
var threeB = new LinkNode(1)

headA.next = secondA
secondA.next = three
three.next = four
four.next = five

headB.next = secondB
secondB.next = threeB
threeB.next = three

console.log(getIntersectionNode(headA, headB))

