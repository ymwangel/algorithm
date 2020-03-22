function remove (arr, item) {
    if(arr.length) {
        const index = arr.index(item)
        if(index > -1) {
            return arr.splice(index,1)
        }
    }
}
class Dep {
    constructor () {
        this.subs = []
    }
    addSub (sub) { //增加一个监听函数，是 Watcher的实例
        this.subs.push(sub)
    }
    removeSub(sub) {
        this.removeSub(this.subs, sub)
    }
    notify() {
        const subs = this.subs.slice()
        for(let i=0;i<subs.length;i++) {
            subs[i].update()
        }
    }
}

export default Dep