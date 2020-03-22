class LinkNode {
    constructor(ele) {
        this.element = ele
        this.next = null
        this.prev = null
    }
}
class SingleLinkList {
    constructor() {
        this.head = null
        this.length = 0
    }
    append(ele) {
        let node = new LinkNode(ele)
        let current = null
        if(!this.head) {
            this.head = node
        }else { 
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }
    insert(pos,ele){
        if(pos <= 0 && pos > this.length) {
            throw new Error('The pos param is not correct')
        }
        let node = new LinkNode(ele)
        if(pos == 1) {
            node.next = this.head
            this.head = node
        }else {
            let current = this.head
            let previous = null
            let index = 1
            while (index < pos) {
                index++
                previous = current
                current = current.next
            }
            previous.next = node
            node.next = current
        }
        this.length++
    }
    update(pos, ele) {
        if(pos <=0 || pos > this.length) {
            throw new Error('pos is not correct')
        }else {
            let index = 1
            let current = this.head
            while(index < pos) {
                index++
                current = current.next
            }
            current.element = ele
        }
    }
    findIndex(pos) {
        if(pos == 1){
            return this.head.element
        }else if(pos > this.length){
            throw new Error('pos is not correct')
        }else {
            let index = 1
            let current = this.head
            while(index < pos) {
                index++
                current = current.next
            }
            return current.element
        }
    }
    delete(pos) {
        if(pos <= 1 || pos == undefined){
            let head = this.head
            this.head = head.next
            this.length--
            return head.element
        }else {
            let index = 1
            let current = this.head
            let previous = null
            while(index < pos) {
                index++
                previous = current
                current = current.next
            }
            if(pos == this.length) {
                previous.next = null
            }else {
                previous.next = current.next
            }
            this.length--
            return current.element
        }
    }
}
class DoubleLinkList {
    constructor() {
        this.head = null
        this.length = 0
    }
    append(ele) {
        const node = new LinkNode(ele)
        let current = null
        if(!this.head) {
            this.head = node
        }else { 
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
            node.prev = current
        }
        this.length++
    }
    insert(pos, ele) {
        if(pos <= 0 && pos > this.length) {
            throw new Error('The pos param is not correct')
        }
        const node = new LinkNode(ele)
        if(pos == 1) {
            let head = this.head
            node.next = head
            head.prev = node
            this.head = node
        }else {
            let current = this.head
            let previous = null
            let index = 1
            while (index < pos) {
                index++
                previous = current
                current = current.next
            }
            previous.next = node
            node.next = current
            node.prev = previous
        }
        this.length++
    }
    delete(pos) {
        if(pos <= 1 || pos == undefined){
            let head = this.head
            this.head = head.next
            this.head.prev = null
            this.length--
            return head.element
        }else {
            let index = 1
            let current = this.head
            let previous = null
            while(index < pos) {
                index++
                previous = current
                current = current.next
            }
            if(pos == this.length) {
                previous.next = null
            }else {
                previous.next = current.next
                current.next.prev = previous
            }
            this.length--
            return current.element
        }
    }
}
// var list = new SingleLinkList()
// list.append(3)
// list.append(89)
// list.insert(1,105)
// list.insert(2,22)
// list.update(4,66) //105->22->3->66
// var ele = list.findIndex(4) 
// // console.log(list.head)
// // console.log(list.length)
// // console.log(ele)
// var deleteEle = list.delete(2)
// console.log(deleteEle)
// console.log(list.length)
// console.log(list)
// var deleteEle2 = list.delete(3)
// console.log(deleteEle2)
// console.log(list.length)
// console.log(list)

// var doubleList = new DoubleLinkList()
// doubleList.append(3)
// doubleList.append(89)
// doubleList.insert(2,40)  
// console.log(doubleList)
exports.SingleLinkList = SingleLinkList
exports.DoubleLinkList = DoubleLinkList
exports.LinkNode = LinkNode

