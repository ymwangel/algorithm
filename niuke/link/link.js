let fifth = {
    val: 'fifth',
    next: null
}
let fourth = {
    val: 'fourth',
    next: fifth
}
let third = {
    val: 'third',
    next: fourth
}
let second = {
    val: 'second',
    next: third
}
let pHead = {
    val: 'head',
    next: second
}
// 无环单链表
const singleNoCycleLink = (() => {
    third.next = null
    return pHead
})()
// 有环单链表
const singleCycleLink = (() => {
    fifth.next = second    
    return pHead
})()

exports.singleNoCycleLink = singleNoCycleLink
exports.singleCycleLink = singleCycleLink