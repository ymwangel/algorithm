// function testCatch() {
//     errInfo().then(()=>{},(err)=>{
//         console.log('reject err: ',err)
//         throw ('error sfjlfsdjf')
//     }).catch(err=>{
//         console.log('catch err: ',err)
//         throw ('error sfjlfsdjf')
//     })
// }
// function errInfo () {
//     return new Promise((resolve,reject)=>{
//         reject('error：错了')
//     })
// }
// // try {
// //     testCatch()
// // }catch(error) {
// //     console.log('17 error',error)
// // }

// try {
//     errInfo().then(()=>{},(err)=>{
//         console.log('reject err: ',err)
//         throw ('error sfjlfsdjf')
//     }).catch(err=>{
//         console.log('catch err: ',err)
//         throw ('error sfjlfsdjf')
//     })
// }catch(error) {
//     console.log('30 error',error)
// }
// // function onState (state) {
// //     return state
// // }
// // function onStart (){
// //     let state = {code: 3}
// //     let result = onState(state)
// //     console.log(result)
// // }
// // onStart()
// // setTimeout(_=>{
// //     onState = (state)=>{
// //         console.log('25 ', state)
// //     }
// // },2000)

// async function test() {
//    try{
//        throw e
//    }catch(err){
//        console.log('sdfsdfsdf')
//        throw err
//    }
// }
  
// test().then((data)=>{
//     console.log(data)
// },err=>{
    
//     console.log('60===',err)
// })
// function stop(logfn){
//     return new Promise((resolve,reject)=>{
//         reject('123','reload')
//             logfn('error info')
//             return
//     })
// }
// async function stopRecord() {
//     try {
//         let result = await stop((mesg)=>{
//             console.log('71====',mesg)
//         })
//     }catch(err){
//         console.log(err)
        
//     }
// }
// stopRecord()

async function add (item){
    return await item + 1
}
async function test() {
    let arr = [1,2,3]
    let result = arr.map(async (item)=>{
        return await add(item)
    })
    console.log(result)
    let ss = await Promise.all(result)
    console.log(ss)
}

test()