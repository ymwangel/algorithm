/**
 * 给定一副牌，每张牌上都写着一个整数
 * 此时，你需要选定一个数字 X，是我们可以将整副牌 按下述规则分成 1组 或 更多组，
 *  1. 每组都有X 张牌
 *  2. 组内所有的牌上都写着相同的整数 -------- 排序
 * 仅 当你可选的 X>=2 时，返回true
 * 示例1： 
 * 输入：[1,2,3,4,4,3,2,1]
 * 输出： 输出： true
 * 解释：可行的分组是：[1,1],[2,2],[3,3],[4,4]
 * 示例2： 
 * 输入：[1,1,1,2,2,2,3,3]
 * 输出： 输出： false
 * 解释：没有满足条件的分组
 * 示例3： 
 * 输入：[1,1]
 * 输出： 输出： true
 * 解释：可行的分组是：[1,1]
 * 示例4： 
 * 输入：[1,1,2,2,2,2]
 * 输出： 输出： true
 * 解释：可行的分组是：[1,1],[2,2],[2,2]
 * 示例4： 
 * 输入：[1]
 * 输出： 输出： false
 * 解释：没有满足条件的分组
 */

export default (arr)=>{
    arr.sort()
    let min = Number.MAX_SAFE_INTEGER
    let dst = []
    let result = true
    for(let i=0,len=arr.length,tmp=[];i<len; i++){
        tmp.push(arr[i])
        for(let j=i+1;j<len-1;j++){
            if(arr[i] === arr[j]){
                tmp.push(arr[j])
            }else{
                if(min>tmp.length){
                    min = tmp.length
                }
                dst.push([].concat(tmp))
                tmp.length = 0
                i = j
                break
            }
        }
    }
    dst.every(item=>{
        if(item.length % min != 0){
            result = false
            return false
        }
    })
    return result
}
