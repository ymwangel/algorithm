/**
 * 种花问题
 * 假设你有一个很长的花坛，一部分地种植了花，另一个部分却没有。可是，花卉不能种植在相邻地土地上，它们会争夺水源，两者都会死去
 * 给定一个花坛（表示为一个数组包含0 和1， 其中0表示没种植花，1表示种植了花），和一个数n。能否在不打破种植规则的情况下 种入 n 朵花？ 能返回True，不能返回False
 * 
 * 示例1：
 * 输入： flowerbed= [1,0,0,0,1] n =1
 * 输出： True
 * 示例2：
 * 输入： flowerbed= [1,0,0,0,1] n =2
 * 输出： False
 */

// export default (arr,n)=>{
//     let maxSpace = Number.MIN_SAFE_INTEGER
//     let pre_index = 0
//     for(let i=0;i<arr.length;i++){
//         if(arr[i] == 1){
//             if(i - pre_index > maxSpace){
//                 maxSpace = i - pre_index
//                 pre_index = i
//             }
//         }
//     }
//     if(maxSpace-1 >= (2*n + 1)){
//         return 'True'
//     }else{
//         return 'False'
//     }

// }
/**
 * 思路二： 数 x || (x-1) || (x+1) == 0 ，就可以种一朵花 
 */
export default (arr,n)=>{
    let max = 0
    for(let i=0,len=arr.length;i<len;i++){
        if(arr[i] == 0){
            if(i==0 && arr[1] == 0){
                max++
                i++
            }else if(i==len-1 && arr[len-1] == 0) {
                max++
            }else if(arr[i-1] == 0 && arr[i+1] == 0) {
                max++
                i++
            }
        }

    }
    return max >= n
}

function filterIdx(fn,arr){
    let res = [] 
    for(let i=0;i<arr.length;i++){
        if(fn(arr[i],i)){
            res.push(i)
        }
    }
    return res
}

// function findUnFloweredSpace(arr){
//     let flowerbedIndex = filterIdx((item,index)=>item == 1,arr)
//     let len = arr.length
//     let res = []
//     for(let i=0;i<flowerbedIndex.length-1;i++){
//         if(flowerbedIndex[i] == 0 || flowerbedIndex[i] == len){
//             return
//         }
//         res.push(arr.slice(flowerbedIndex[i]+1, flowerbedIndex[i+1]))
//     }
//     return res
// }
// console.log(findUnFloweredSpace([0,1,0,0,0,1]))
// console.log(findUnFloweredSpace([0,1,0,0,0,1,0]))
 
 
