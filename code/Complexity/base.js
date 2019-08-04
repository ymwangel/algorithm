/** 
求方法的时间复杂度
*/


/**
 1. 外层循环次数为 n , 内层循环次数为n
 2. => 总的循环次数为 n^2
 3. 时间复杂度为 O(n^2)
*/

function aFunc (n) {
	for(let i=0;i<n;i++){
		for(let j=0;j<n; j++){
			console.log('Hello')
		}
	}
}


/**
 1. 假设循环次数为t, 则循环条件满足 2^t <= n
 2. => t = log(2)(n),
 3. 时间复杂度为 log(2)(n)
*/

function bFunc(n){
	for(let i=0;i<n;i++){
		i=i^2
		console.log(i)
	}
}


/**
顺序递归
1. 使用二叉树分析递归的斐波那契数列 ，时间复杂度为 o(2^n)
2. 空间复杂度为 O(1)
*/

function cFunc(n) {
	if(n<=1) {
		return 1
	}
	return cFunc(n-1) + cFunc(n-2)
}

/**
递归
1. 当 n = 1 或者 n = 2 时，result为1，
2. 使用while循环， n>2 ，当 n-- = 0 时循环结束
3. 循环内部， 将前一次的result 赋值给 pre_result,
	         将前一次的的 pre_result 赋值给 pre_pre_result
	         每次的result 通过 pre_result + pre_pre_result 计算
4. 返回result
5. 循环了 n-2 次，每次循环的执行次数 都是常数， 所以，时间复杂度为 O(n)
6. 创建了 3 个变量， 即创建了 3 个内存空间，空间复杂度 为 O(1)
*/

function dFunc(n) {
	let result = 0
	let pre_result = 1
	let pre_pre_result =1 
	result = pre_result
	while(n>2){
		n--
		pre_pre_result = pre_result
		pre_result = result
		result = pre_result + pre_pre_result
	}
	return result
}
console.log(dFunc(6))


/**
尾递归序列
1. 时间复杂度：O(n)
2. 空间复杂度 O(n)
*/

function eFunc(n, pre_pre_result, pre_result) {
	if(n < 3) {
		return pre_result
	}
	return eFunc(n-1, pre_result, pre_result + pre_pre_result)
}


console.log(eFunc(6,1,1))









