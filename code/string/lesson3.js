export default(str) =>{
    var obj = {}
    var arr = str.split('')
    arr.forEach(item => {
        if(obj.hasOwnProperty(item)){
            obj[item] = obj[item] + 1
        }else{
            obj[item] = 1
        }
    });
    var count = 0
    var w = ''
    for(var j in obj){
        if(obj[j] > count){
            count = obj[j]
            w = j
        }
    }
    return count
}