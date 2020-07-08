/**
 * 策略模式
 * 场景：
 *  一：表单校验
 *  二： 
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
    isMobile: function( value, errorMsg ){ // 手机号码格式
        if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ 
            return errorMsg;
        } 
    }
}
var Validator = function () {
    this.cache = []
}
Validator.prototype.add = function(rule){
    var ary = rule.split(':')
    
}