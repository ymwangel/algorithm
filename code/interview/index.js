/**
 * Q: 解析 URL Params 为对象
 * 例如：
 * let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
 * parseParam(url)
 * { user: 'anonymous',
 *  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
 *  city: '北京', // 中文需解码
 *  enabled: true, // 未指定值得 key 约定为 true
 * }
*/
function parseParam(url) {
  const paramsStr = /.+?(.+)$/.exec(url)[1]
  const paramsArr = paramsStr.split('&')
  console.log(paramsArr)
  
}

/**
 * 有两种特殊字符。第一种字符可以用一比特0来表示。第二种字符可以用两比特(10 或 11)来表示。
 * 
 * 现给一个由若干比特组成的字符串。问最后一个字符是否必定为一个一比特字符。给定的字符串总是由0结束。
 * 
 * 示例 1:
 * 输入: 
 * bits = [1, 0, 0]
 * 输出: True
 * 解释: 
 * 唯一的编码方式是一个两比特字符和一个一比特字符。所以最后一个字符是一比特字符。
 * 
 * 示例 2:
 * 输入: 
 * bits = [1, 1, 1, 0]
 * 输出: False
 * 解释: 
 * 唯一的编码方式是两比特字符和两比特字符。所以最后一个字符不是一比特字符。
 * 
 * 注意:
 * 1 <= len(bits) <= 1000.
 * bits[i] 总是0 或 1.
 */
var isOneBitCharacter = function(bits) {
  let i=0;
  while(i<bits.length-1){
    i = bits[i] == 1 ? i + 2 : i + 1
  }
  return i === bits.length - 1 
};
console.log(isOneBitCharacter([1,1,1,0])) // false
console.log(isOneBitCharacter([1,1,0])) // true
console.log(isOneBitCharacter([1,1,0,0,1,0,0])) // true
console.log(isOneBitCharacter([1,1,0,0,1,0,0,1,0])) // false

/**
 * 二进制求和
 * 给定两个二进制字符串，返回他们的和（用二进制表示）。
 * 输入为非空字符串且只包含数字 1 和 0。
 * 示例 1:
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 
 * 示例 2:
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 */
var addBinary = function(a, b) {
  let len = a.length > b.length ? a.length : b.length
  let _a = a.length == len ? a : new Array(len-a.length).fill(0).join('') + a
  let _b = b.length == len ? b : new Array(len-b.length).fill(0).join('') + b
  let result = ''
  let temp = 0
  let i = len-1
  while(i>=0){
    let s = Number(_a[i]) + Number(_b[i]) + temp
    temp = s >= 2  ? 1 : 0
    result = ((s == 0 || s == 2) ? 0 : 1) + result
    i--
  }
  temp == 1 ? result = temp + result : void null
  return result
};
console.log(addBinary('1010','1011'))
console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
"110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"))
console.log(addBinary('1100','1101'))
console.log(addBinary('11','1'))