/**
 * 冒泡排序
 */

export default (arr) => {
    let len = arr.length
    for(let i=0; i<len-1; i++){
        for(let j=0; j<len-1-i; j++){
            if(arr[j] > arr[j+1]){
                // var temp = arr[j]
                // arr[j] = arr[j+1]
                // arr[j+1] = temp
                //或者
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr
}