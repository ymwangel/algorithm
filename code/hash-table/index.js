var s = require('../link-list/index.js')
let SingleLinkList = s.SingleLinkList

class HashTable {
    constructor() {
        this.table = new Array(100)
    }
    // 简单的散列函数，除留余数法
    loseHashCode(key) { //散列函数，根据key，用来求取在数组中的下标值
        let hash = 0
        for(let codePoint of key){
            hash += codePoint.charCodeAt()
        }
        return hash % this.table.length
    }
    put(key,value) {
        let pos = this.loseHashCode(key)
        let currentList = this.table[pos]
        if(currentList) {
            // 冲突处理-链表法
            currentList.append({key,value})
        }else {
            let linkList = new SingleLinkList()
            linkList.append({key,value})
            this.table[pos] = linkList
        }
    }
    get(key) {
        let pos = this.loseHashCode(key)
        if(!this.table[pos]) {
            throw new Error('查找的key值不存在')
        }
        let currentItem = this.table[pos].head
        if(currentItem && currentItem.element.key == key){
            return currentItem.element.value
        }
        while(currentItem.next !== null){
            currentItem = currentItem.next
        }
        if(currentItem.element.key !== key) {
            throw new Error('查找的key值不存在')
        }
        return currentItem.element.value
    }
}
var hashTable = new HashTable()
hashTable.put('this', 'this-value-1')
hashTable.put('sith', 'this-value-2')
hashTable.put('that', 'that-value')
hashTable.put('shit', 'shit-alue')
console.log(hashTable.get('that'))
console.log(hashTable.get('shit'))
console.log(hashTable.get('sfjlsdf'))