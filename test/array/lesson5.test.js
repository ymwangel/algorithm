import twoSum from "../../code/array/lesson5"

test('twoSum:[2,7,11,15]', ()=>{
    expect(twoSum([2,7,11,15],9)).toEqual([0,1])
})
test('twoSum:[2,7,11,15]', ()=>{
    expect(twoSum([2,7,11,15],18)).toEqual([1,2])
})
test('twoSum:[3,2,4]', ()=>{
    expect(twoSum([3,2,4],6)).toEqual([1,2])
})
test('twoSum:[0,4,3,0]', ()=>{
    expect(twoSum([0,4,3,0],0)).toEqual([0,3])
})
test('twoSum:[0,4,3,0,0]', ()=>{
    expect(twoSum([0,4,3,0,0],0)).toEqual([0,3])
})
test('twoSum:[2,1,2,4]', ()=>{
    expect(twoSum([2,1,2,4],3)).toEqual([0,1])
})
test('twoSum:[-1,-2,-3,-4,-5]', ()=>{
    expect(twoSum([-1,-2,-3,-4,-5],-8)).toEqual([2,4])
})

