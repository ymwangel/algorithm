/**
 * 给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值
 * 如果数组元素个数 < 2，返回0
 * 例如：
 * 输入：[3,6,9,1]
 * 输出：3
 * 
 * 输入：[10]
 * 返回：[0]
*/
// export default (arr)=>{
//     if(arr.length < 2){
//         return 0
//     }
//     arr.sort()
//     let max = 0
//     for(let i=0; i<arr.length-1;i++){
//         if(arr[i+1] - arr[i] > max){
//             max = arr[i+1] - arr[i]
//         }
//     }
//     return max
// }

// export default (arr) => {
//     if(arr.length < 2){
//         return 0
//     }
//     let max = 0
//     let len = arr.length - 1
//     let space
//     for(let i=len,temp; i>0;i--){
//         for(let j=0;j<i;j++){
//             temp = arr[j]
//             if(temp>arr[j+1]){
//                 arr[j] = arr[j+1]
//                 arr[j+1] = temp
//             }
//         }
//         if(i < len){
//             space = arr[i+1] - arr[i]
//             if(space > max){
//                 max = space
//             }
//         }
//     }
//     return Math.max(max, arr[1]-arr[0])
// }

export default (arr) => {
    if(arr.length < 2){
        return 0
    }
    let max = 0,len = arr.length,space;
    for(let i=0; i<len-1; i++){
        for(let j=0; j<len-1-i; j++){
            if(arr[j] > arr[j+1]){
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
        if(i>1){
            // 冒泡排序，至少冒泡了2次
            space = arr[i+1] - arr[i]
            if(space > max){
                max = space
            }
        }
    }
    return Math.max(max, arr[1] - arr[0])
}