/**
 * 单例 设计模式
 */

 /**
  * 基础一：不透明的 单例模式
  * 缺点：“不透明性”， 使用者必须知道 是单例模式
  */
var Singleton = function(name) {
    this.name = name
    this.instance = null
}
Singleton.prototype.getName = function() {
    return this.name
}

Singleton.getInstance = function(name) {
    if(!this.instance){
        this.instance = new Singleton(name)
    }
    return this.instance
}

var a = Singleton.getInstance('seven1')
var b = Singleton.getInstance('seven2')
console.log(a == b)

 /**
  * 基础二：透明的 单例模式
  * 缺点：程序复杂度高、不利于阅读
  */
var CreateDiv = (function() {
    var instance
    var CreateDiv = function(html){
        if(instance) return instance
        this.html = html
        this.init()
        return instance = this
    }
    CreateDiv.prototype.init = function() {
        var div = document.createElement('div')
        div.innerHTML = this.html
        document.body.appendChild(div)
    }
    return CreateDiv
})()
var a = new CreateDiv('seven1')
var b = new CreateDiv('seven1')
console.log(a == b) //true

/**
 * 基础三：代理实现单例模式
 * 优点：1. 透明性：CreateDiv 类 可以为单例模式 ，也可以是多例模式
 */
var CreateDiv = function(html) {
    this.html = html
    this.init()
}
CreateDiv.prototype.init = function () {
    var div = document.createElement('div')
    div.innerHTML = this.html
    document.body.appendChild(div)
}
// 引入代理类，来实现 单例模式
var ProxySingletonCreateDiv = (function() {
    var instance
    return function(html) {
        if(!instance) {
            instance = new CreateDiv(html)
        }
        return instance
    }
})()

var a = new ProxySingletonCreateDiv('seven1')
var b = new ProxySingletonCreateDiv('seven1')