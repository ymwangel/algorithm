import subLoopStr from "../../code/regexp/lesson1"

test('subLoopStr: abab', ()=>{
    expect(subLoopStr('abab')).toBe(true)
})
test('subLoopStr: abababc', ()=>{
    expect(subLoopStr('abababc')).toBe(false)
})
