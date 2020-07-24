/**
 * 代理模式：为一个对象提供一个代用品或占位符，以便控制访问
 * 
 */

var Flower = function() {}
var xiaoming = {
    sendFlower: function(target) {
        var flower = new Flower()
        target.receiveFlower(flower)
    }
}
var B = {
    receiveFlower(flower) {
        A.listenGoodMood(function() {
            var flower = new Flower()
            A.receiveFlower(flower)
        })
    }
}

var A = {
    receiveFlower:function(flower) {
        console.log('收到花 ' + flower)
    },
    listenGoodMood: function(fn) {
        setTimeout(function() {
            fn()
        },10000)
    }
}
xiaoming.sendFlower(B)