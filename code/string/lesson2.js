/**
计数二进制子串
给定一个字符串s，计算具有相同数量0 和1的非空（连续）子字符串的数量，并且这些子字符串中的所有0 和所有1 都是组合在一起的
重复出现的子串 要计算他们出现的次数
例如： 输入： '00110011'
输出：6
解释： 有6个子串 具有相同 数量多连续 1和 0   ： “0011” ，“01”， “10”，“0011”， “01”
*/

/** 
寻找第一个和 arr[0]不一样的 Index
maxLength = index
index之后长度为 maxLength的数组，是否都和 arr[0]不一样 ？ 返回：arr.slice(index-maxLength, index+maxLength)

*/

function findStr(arr) {
	//时间复杂度为 O(n)
	let result = [],index,maxLength;
	maxLength = index = arr.findIndex((item,idx)=>item != arr[0])
	let sub = arr.slice(index, index + maxLength)
	if(index != -1 && sub.indexOf(arr[0]) == -1){
		result.push(arr.slice(index-maxLength,index+maxLength).join(''))
	}
	// for(let i=0;i<arr.length-1;i++){
	// 	if(arr[i+1] != arr[i]){
	// 		let sub = arr.slice(i+1, maxLength+i+1)
	// 		if(sub.indexOf(arr[i]) == -1){
	// 			let startIndex = i - (maxLength -1)
	// 			let stopIndex = i + maxLength + 1
	// 			result.push(arr.slice(i-(maxLength-1),i+maxLength+1).join(''))
	// 			break;
	// 		}else{
	// 			return 
	// 		}
	// 	}else{
	// 		maxLength = maxLength + 1
	// 	}
	// }
	return result
}


function getArrayOfSubString(str){
	let arr = str.split('')
	return arr.length <= 1 ? [] : findStr(arr).concat(getArrayOfSubString(str.slice(1)))
}

/**
顺序递归的时间复杂度为 O(2^n),

*/

export default (str) => {
	return getArrayOfSubString(str).length
}





