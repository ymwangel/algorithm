/**
 * 输入一个链表，反转链表后，输出新链表的表头。
 * @param {pHead} 给定链表的 head 节点 
 */

let { singleNoCycleLink }= require('./link.js')

function ListNode(x) {
    this.val = x
    this.next = null
}
function ReverseList(pHead) {
    let _pre = null
    while(pHead) {
        let _next = pHead.next
        pHead.next = _pre
        _pre = pHead
        pHead = _next
    }
    return _pre
}

let result = ReverseList(singleNoCycleLink)

console.log(result)