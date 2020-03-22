/**
 * 桶排序
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */

var mergeSort = require('./merge-sort.js')

const bucketSort = function(arr) {
    let result = []
    var buckets = new Array(arr.length)
    let max = arr[0],min = arr[0];
    for(let i=0;i<arr.length;i++) {
        if(arr[i]>max) max = arr[i]
        if(arr[i]<min) min = arr[i]
    }
    let offset = (max-min)/(arr.length-1)
    for(let i=0;i<arr.length;i++) {
        let start = min+i*offset, end = ((i==arr.length-1) ? max  : (min+(i+1)*offset));
        let item
        if(i==arr.length-1){
            item = max
        }else{
            item = arr.filter(value=>(value>=start && value < end))
        }
        if(buckets[i]){
            buckets[i] = item.concat([buckets[i]])
        }else {
            buckets[i] = item
        }
    }
    for(let i=0;i<buckets.length;i++) {
        let item = []
        if(buckets[i].length>1){
            item = mergeSort(buckets[i])//对桶内元素进行排序
        }else {
            item = buckets[i]
        }
        result = result.concat(item)
    }
    console.log(result)
}
console.log(bucketSort([4.5, 0.85, 3.25, 2.18, 0.5]))