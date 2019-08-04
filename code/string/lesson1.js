/**
反转字符串中的单词, 
输入：Let's take LeetCode contest, 每个单词之间都是以单个空格相隔，
输出：s'teL ekat edoCteeL tsetnoc
*/

/**
split() 两种方式
*/
// export default (str)=>{
// 	return str.split(' ').map(item=>item.split('').reverse().join('')).join(' ')
// }


// export default (str)=>{
// 	return str.split(/\s/g).map(item=>item.split('').reverse().join('')).join(' ')
// }

/**
 正则表达式的match
 \w 查找单词
*/

export default (str)=>{
	return str.match(/[\w']+/g).map(item=>item.split('').reverse().join('')).join(' ')
}