import cardCroup from "../../code/array/lesson2"

test('cardCroup:[1,2,3,4,4,3,2,1]', ()=>{
    expect(cardCroup([1,2,3,4,4,3,2,1])).toBe(true)
})
test('cardCroup:[1,1,1,2,2,2,3,3]', ()=>{
    expect(cardCroup([1,1,1,2,2,2,3,3])).toBe(false)
})
test('cardCroup:[1,1,2,2,2,2]', ()=>{
    expect(cardCroup([1,1,2,2,2,2])).toBe(true)
})