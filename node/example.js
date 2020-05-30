var path = require('path')
console.log(__filename) // '/Users/wangyanmin/workspace/algorithm/node/example.js'

console.log(__dirname) // '/Users/wangyanmin/workspace/algorithm/node'

console.log(path.resolve(__dirname, './text.js')) // '/Users/wangyanmin/workspace/algorithm/node/text.js'

console.log(path.resolve(__dirname, '../code/hash-table/index.js')) // '/Users/wangyanmin/workspace/algorithm/code/hash-table/index.js'

console.log(path.resolve(__dirname, '../')) // '/Users/wangyanmin/workspace/algorithm'