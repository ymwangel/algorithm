function _new() {
  var Func = [].shift.call(arguments)
  var obj = Object.create(Func.prototype)
  var ret = Func.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}


function Animal(name) {
  this.name = name
}
let animal = new Animal('gorilla')
let animal1 = new Animal('giraffe')
let animal2 = new Animal('hyena')

let _animal = _new(Animal, 'gorilla')
console.log(_animal.__proto__)