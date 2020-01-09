const person = {
    name: 'lisi',
    province: '江苏省',
    city: '南京市'
}

const enhancePerson = new Proxy(person, {
    get(target,name){
        switch(name) {
            case 'address':
                return `${target.province}-${target.city}`
            default:
                return target.name
        }
    }
})

console.log(enhancePerson.name)
console.log(enhancePerson.address)
console.log(enhancePerson.city)
console.log(Object.keys(enhancePerson))