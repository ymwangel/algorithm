/**
 * 选择排序
 */

export default (arr) => {
    let len = arr.length
    for(let i=0;i<len; i++){
        let min = arr[i]
        for(let j=i+1; j<len; j++){
            if(arr[j] < min){
                var temp = min
                min = arr[j]
                arr[j] = temp
            }
        }
        arr[i] = min
    }
    return arr
}