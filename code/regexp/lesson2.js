/**
 * 正则表达式匹配
 * 给定一个字符串（s） 和一个字符模式 （p）。实现支持 "." 和 "*" 的正则表达式匹配
 * 
 * '.' 匹配任意单个字符
 * '*' 匹配 零个 或多个 前面的元素
 * 
 * 匹配应该覆盖 整个字符串 （s），而不是部分字符串
 * 
 * 说明：
 * 1. s 可能为空，且 只包含 a-z 的小写字母
 * 2. p 可能为空，且只包含从 a-z 的小写字母，以及 字符 . 和 *
 * 
 * 示例：
 * 输入： s = "mississippi"
 *       p = "mis*is*p*."
 * 输出： false
 * 
 * TODO: 待完善
 */

// var isMatch = function(s, p) {
//     var reg = new RegExp('^' + p + '$')
//     return reg.test(s)
// };

export default (str, mode) => {
    if(str == '' || mode == ''){
        return false 
    }
    // 对模式变量进行正则筛选
    // let modeArr = mode.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*)))/g)
    // let modeArr = mode.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*|\.)))|\./g)
    let modeArr = mode.match(/([a-z.]\*)|([a-z]+(?=([a-z.]\*|\.)))|\.|([a-z]+)/g)
    if(modeArr == null ||modeArr.length == 0){
        return mode == str ? true :false
    }
    // [ 'mi', 's*', 'i', 's*', 'p*', '.' ]
    console.log(modeArr)
    let cur = 0
    let strLen = str.length
    for(let i=0,len=modeArr.length,m;i<len;i++){
        // 对于模式分为三类：.* , [a*], cdef
        m = modeArr[i].split('')
        // 如果第二位是 * ，表示是有模式的
        if(m[1] == '*'){
            if(m[0] === '.'){
                cur = cur + m.length
                break;
            }else{
                while(str[cur] == m[0]){
                    cur++
                }
            }
        }else if(m[0] == '.' && m.length == 1){
            cur++
        }else{
            for(let j=0,jl=m.length;j<jl;j++){
                if(m[j] != str[cur]){
                    return false
                }else{
                    cur++
                }
            }
        }
    }
    return cur == strLen
}