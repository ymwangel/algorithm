/**
 * 给定一个非负整数数组 A， A中一半整数是奇数，一半整数是偶数
 * 对数组进行陪许， 以便当 A[i] 为奇数是，i也是奇数
 * 当 A[i]为偶数时，i也是偶数
 * 
 * 你可以返回任何满足上述条件的数组作为答案
 * 示例：
 * 输入：[4,2,5,7]
 * 输出：[4,5,2,7]
 * 解释：[4,7,2,5] , [2,5,4,7], [2,7,4,5] 也是正确的
 */

 export default (arr) => {
    arr.sort((a,b)=>a-b)
    let r = []
    // 记录奇数、偶数位下标
    let odd = 1
    let even = 0
    arr.forEach(item => {
        if(item%2==1){
            r[odd] = item
            odd += 2
        }else{
            r[even] = item
            even += 2
        }
    });
    return r
 }