/**
 * 判断给定的链表中是否有环
 * @param {pHead} 给定链表的 head 节点 
 */
let { singleCycleLink } = require('./link.js')
function ListNode(x) {
    this.val = x
    this.next = null
}
// method one：
function hasCycle(head) {
    let i = 0, j=0;
    while(head) {
        i += 1
        j += 2
        if(i )
        head = head.next
    }
}

