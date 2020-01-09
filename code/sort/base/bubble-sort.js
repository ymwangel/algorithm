/**
 * 冒泡排序
 * 时间复杂度：o(n^2)
 */
let list = [3,45,23,45,12,49,367,98,20,34,6]
const bubbleSor = (list) => {
    for(let i=0;i<list.length-1;i++){
        for(let j=i+1;j<list.length;j++){
            let iItem = list[i]
            if(iItem>list[j]){
                list[i] = list[j]
                list[j] = iItem
            }
        }
    }
    return list
}
console.log(bubbleSor(list))