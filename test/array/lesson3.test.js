import flower from "../../code/array/lesson3"

test('flower:[1,0,0,0,1], n=1', ()=>{
    expect(flower([1,0,0,0,1],1)).toBe(true)
})
test('flower:[0,0,1,0,0], n=2', ()=>{
    expect(flower([0,0,1,0,0],2)).toBe(true)
})
test('flower:[1,0,0,0,1],n=2', ()=>{
    expect(flower([1,0,0,0,1],2)).toBe(false)
})