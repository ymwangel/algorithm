/**
 * 如何判断链表中是否有环？
 */
var { LinkNode } = require('./index.js')

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