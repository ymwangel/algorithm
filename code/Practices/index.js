/**
 * 地址选择级联结构
 */
var inData = [{
  "province": "浙江",
  "city": "杭州",
  "name": "西湖"
}, {
  "province": "四川",
  "city": "成都",
  "name": "锦里"
}, {
  "province": "四川",
  "city": "成都",
  "name": "方所"
}, {
  "province": "四川",
  "city": "阿坝",
  "name": "九寨沟"
}]
var inKeys = ['province', 'city', 'name']

var outData = [{
  "value": "浙江",
  "children": [{
    "value": "杭州",
    "children": [{
      "value": "西湖"
    }]
  }]
}, {
  "value": "四川",
  "children": [{
    "value": "成都",
    "children": [{
      "value": "锦里"
    }, {
      "value": "方所"
    }]
  }, {
    "value": "阿坝",
    "children": [{
      "value": "九寨沟"
    }]
  }]
}]

var transObject = function(tableData, keys) {
  let hashTable = {}, res = []
  for( let i = 0; i < tableData.length; i++ ) {
    console.log(tableData[i][keys[0]])
    if(!hashTable[tableData[i][keys[0]]]) {
      let len = res.push({
        value: tableData[i][keys[0]],
        children: []
      })
      // 在这里要保存key对应的数组序号,不然还要涉及到查找
      hashTable[tableData[i][keys[0]]] = { $$pos: len - 1 }
    }
    if(!hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]]) {
      let len = res[hashTable[tableData[i][keys[0]]].$$pos].children.push({
        value: tableData[i][keys[1]],
        children: []
      })
      hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]] = { $$pos: len - 1 }
    }
    res[hashTable[tableData[i][keys[0]]].$$pos].children[hashTable[tableData[i][keys[0]]][tableData[i][keys[1]]].$$pos].children.push({
      value: tableData[i][keys[2]]
    })
  }
  console.log(hashTable)
  return res
}

transObject(inData,inKeys)

