/**
 * 插入排序
 */
let list = [3,45,23,45,12,49,367,98,20,34,6]
const insertSort = (arr) =>{
    let len = arr.length
    let preIndex,current;
    for(let i=1;i<len;i++){
        preIndex = i - 1
        current = arr[i]
        while(preIndex >= 0 && arr[preIndex] > current){
            arr[preIndex + 1] = arr[preIndex]
            preIndex -- 
        }
        arr[preIndex+1] = current
    }
    return arr
}
console.log(insertSort(list))