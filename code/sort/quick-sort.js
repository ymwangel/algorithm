/**
 * 快速排序
 * 递归模式：单边循环分治法、双边循环分治法
 * 非递归模式：栈：
 * 平均时间复杂度： O(nlogn)
 * 平均空间复杂度： O(nlogn)
 */

const quickSort = function(arr, startIndex=0, endIndex=arr.length-1) { 
    // let middleIndex = Math.floor((arr.length-1)/2);
    // [ arr[0], arr[middleIndex] ] = [ arr[middleIndex], arr[0] ];
    if(startIndex >= endIndex) {
        return startIndex == endIndex ? [arr[startIndex]] : []
    }
    let pivotIndex = partitionDouble(arr, startIndex,endIndex)  //双边循环法--递归
    // let pivotIndex = partitionSingle(arr, startIndex,endIndex) //单边循环法--递归
    return quickSort(arr, startIndex, pivotIndex-1).concat([arr[pivotIndex]]).concat(quickSort(arr, pivotIndex+1, endIndex))
    
    function partitionDouble(arr, startIndex, endIndex) {  //双边循环法--递归
        let privot = arr[startIndex]
        let left = startIndex
        let right = endIndex
        while(left != right) {
            while(left < right && arr[right] > privot) {
                right--
            }
            while(left<right && arr[left] <= privot) {
                left++
            }
            [arr[left], arr[right]] = [arr[right],arr[left]];
        }
        arr[startIndex] = arr[left]
        arr[left] = privot
        return left
    }
    function partitionSingle (arr ,startIndex, endIndex) { //单边循环法--递归
        let pivot = arr[startIndex]
        let mark = startIndex
        for(let i=startIndex;i<=endIndex;i++) {
            if(arr[i] < pivot){
                mark++;
                [arr[mark],arr[i]]=[arr[i],arr[mark]];
            }
        };
        [arr[startIndex], arr[mark]]=[arr[mark], arr[startIndex]];
        return mark
    }
}

function test(arr){
    return quickSort(arr)
}
// console.log(test([4,7,6,5,3,2,8,1]))

const quickSort1 = function(arr, startIndex=0, endIndex=arr.length-1) { // 非递归--栈
    return _quickSort(arr,startIndex,endIndex)

    function _quickSort(arr, startIndex,endIndex) {
        var list = [[startIndex, endIndex]]
        while(list.length >0){
            var tail = list.pop()
            if(tail[0] >= tail[1]){
                continue
            }
            var i=tail[0],j=tail[1],flag=tail[0];
            while(i<j){
                while(arr[j] >= arr[flag] && j>flag) j--
                if(i>=j){
                    break
                }
                while(arr[i] <= arr[flag] && i<j) i++
                let temp = arr[flag]
                arr[flag] = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
                flag = i
            }
            list.push([tail[0], flag-1])
            list.push([flag+1, tail[1]])
        }
        return arr
    }
}
console.log(quickSort1([4,7,6,5,3,2,8,1]))
