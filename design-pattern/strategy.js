/**
 * 策略模式: 定义一系列的算法，一个个封装起来，并且使他们可以相互替换
 * 场景：
 *  一：表单校验
 *  二：奖金计算
 * 
 * 例如：element-ui 中的表单验证
 */

/**
 * 表单校验：
 */
// 未使用策略模式
var registerForm = document.getElementById('registerForm')
registerForm.onSubmit = function() {
    if(registerForm.userName.value === '') {
        console.log('用户名不能为空')
        return false
    }
    if(registerForm.password.value.length < 6){
        console.log('密码长度不能少于 6 位')
        return false
    }
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( registerForm.phoneNumber.value ) ){
        console.log ( '手机号码格式不正确' ); 
        return false;
    }
}

//使用策略模式
var strategies = {
    isNonEmpty: function(value,errorMsg) {
        if(value === ''){
            return errorMsg
        }
    },
    minLength:  function( value, length, errorMsg ){ 
        if ( value.length < length ){
            return errorMsg;
        }
    },
    maxLength:function(value, length, errorMsg) {
        if ( value.length > length ){
            return errorMsg;
        }
    },
    isMobile: function( value, errorMsg ){ // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ 
            return errorMsg;
        } 
    }
}
var Validator = function () {
    this.cache = []
}
Validator.prototype.add = function(dom, rule, errorMsg){
    var ary = rule.split(':')
    this.cache.push(function() {
        var strategy = ary.shift()
        ary.unshift(dom.value)
        ary.push(errorMsg)
        return strategies[strategy].apply(dom, ary)
    })
}
Validator.prototype.start = function( ) {
    for(let i=0, validatorFunc; validatorFunc=this.cache[i++]; ){
        var mst = validatorFunc()
        if(msg) {
            return msg
        }
    }
}
var validatorFunc = function() {
    var validator = new Validator()
    validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
    validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
    validator.add(registerForm.password, 'maxLength:18', '密码长度最多为18位')
    validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')
    var errorMsg = validator.start()
    return errorMsg
}

registerForm.onSubmit = function() {
    var errorMsg = validatorFunc()
    if(errorMsg){
        console.log(errorMsg)
        return false //阻止表单提交
    }
}

/**
 * 奖金计算
 */

// 未使用策略模式
var calculateBonus = function(performanceLevel, salary) {
    if(performanceLevel === 'S') return salary * 4
    if(performanceLevel === 'A') return salary * 3
    if(performanceLevel === 'B') return salary * 2
}
cancelAnimationFrame('B',20000)

//使用策略模式
var strategies = {
    'S': function(salary) {
        return salary*4
    },
    'A': function(salary){
        return salary*3
    },
    'B': function(salary){
        return salary*2
    }
}
var calculateBonus = function(level, salary) {
    return strategies[level](salary)
}