import regModeStr from "../../code/regexp/lesson2"

// test('regModeStr', ()=>{
//     expect(regModeStr('aaa','caa*')).toBe(false)
// })
test('regModeStr', ()=>{
    expect(regModeStr('mississippi','mis*is*p*.')).toBe(false)
})
// test('regModeStr', ()=>{
//     expect(regModeStr('aaabc','a*.*')).toBe(true)
// })
// test('regModeStr', ()=>{
//     expect(regModeStr('aa','a')).toBe(false)
// })
// test('regModeStr', ()=>{
//     expect(regModeStr('aab','c*a*b')).toBe(true)
// })
// test('regModeStr', ()=>{
//     expect(regModeStr('aab','.c*a*b')).toBe(true)
// })
// test('regModeStr', ()=>{
//     expect(regModeStr('ab','.*c')).toBe(false)
// })
