import Evaluater from "evaluater-vkm";

let errorObj = {
  '1000': '未知错误,请刷新后再次尝试~',
  '1001': 'SDK状态异常, 所调用函数和当前状态码不匹配',
  '1101': '环境不支持WebSocket功能',
  '1102': '当前无法录音，请检查你的录音设备是否打开哦,刷新后重试~',
  '1103': '无法获取录音权限',
  '1104': '服务无法连接',
  '1105': '服务连接超时',
  '1106': '网络异常',
  '1107': '认证失败，appId无效',
  '1108': '认证失败，userId无效',
  '1109': '录音时间过短',
  '1110': '录音时间过长',
  '4001': '文本信息错误, 包括必填项为空、类型错误等',
  '4002': '评测失败',
  '4003': '评测超时,请检查网络'
}

let evaluater, isIniting = false, isCanStart = false,isCanStop = false, isClosed = false;
let onEvaluateState = (state) => {
  console.log('state====',state)
}
// state.code : 1:未就绪, 2:连接中, 3:已就绪, 4:录音中, 5:评测结果获取中, 6:已获得评测结果, 7:服务已关闭, 8:录音被打断
let onEvaluateError = (error) => {}
let init = (config) => {
  return new Promise((resolve,reject)=>{
    try{
      evaluater = new Evaluater({
        appId: "5592a6df2ce344cf924dccf902b127b5",
        userId: config.accountId + "",
        env: "prod",
        audioFormat: "mp3",
        onState: state => {
          onEvaluateState(state)
          if(state.code && state.code == 3){
            isCanStart = true
            isClosed = false
            resolve(evaluater)
            isIniting = false
          }
          // else if(state.code == 7){
          //   isClosed = true
          //   console.log('init state code = 7,===', state)
          //   isIniting = false
          //   evaluater.close()
          //   evaluater = null
          //   reject(state)
          // }else {
          //   void null
          // }
        },
        onError: error=>{
          console.log('init onError===',error)
          // if(error.code == '1001'){
          //   alert(errorObj[error.code])
          //   location.reload()
          // }
          onEvaluateError(error)
          if(isIniting) {
            isIniting = false
            reject(error)
          }
        }
      })
    }catch(error){
      isIniting = false
      console.log('init catch error===', error)
      reject(error)
    }
  })
}

function start (config, param, logfn) {
  return new Promise((resolve,reject) => {
    console.log('evaluater====',evaluater)
    if(evaluater && isCanStart){
      evaluater.start(param)
      isCanStop = true
      resolve()
      logfn('star-success','',getMagicNumber())
    }else{
      if(isIniting) {
        return
      }
      isIniting = true
      init(config).then((evaluater)=>{
        evaluater.start(param)
        isCanStop = true
        resolve()
        logfn('star-success','',getMagicNumber())
      }, error=>{
        console.log('start reject error=====',error)
        isCanStop = false
        let code = error.code + ''
        if(errorObj.hasOwnProperty(code)){
          reject(errorObj[code])
          logfn('star-error',code + errorObj[code],getMagicNumber())
        }else {
          let errorObj = JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error)))
          reject(errorObj.message)
          logfn('star-error',code + errorObj.message,getMagicNumber())
        }
      }).catch(err=>{
        console.log('start catch error ====',err)
        isCanStop = false
        let errorObj = JSON.parse(JSON.stringify(err,Object.getOwnPropertyNames(err)))
        reject(errorObj.message)
        logfn('star-error',errorObj,getMagicNumber())
      })
    }
  })
}
function stop (logfn){
  return new Promise((resolve,reject)=>{
    console.log('111==isClosed',isClosed,evaluater)
    // if(isClosed) {
    //   console.log('113 ====', isClosed)
    //   reject('服务已关闭,请刷新页面重试')
    //   return
    // }
    if(evaluater){
      if(isCanStop){
        evaluater.stop()
        isCanStop = false
        onEvaluateState = (state) => {
          if(state.code && state.code == 6){
            console.log('拿到结果===',state.data)
            isCanStart = false
            resolve(state.data)
            logfn('stop-success',state.data, getMagicNumber())
          }
          // if(state.code && state.code == 3){
          //   isCanStart = true
          // }else if(state.code && state.code == 6){
          //   console.log('拿到结果===',state.data)
          //   isCanStart = false
          //   resolve(state.data)
          //   logfn('stop-success',state.data, getMagicNumber())
          // }else if(state.code && state.code == 7){
          //   console.log('Evaluate.js==130====')
          //   console.log('服务已关闭')
          //   evaluater.close()
          //   evaluater = null
          //   isCanStart = false
          //   // isCanStart = true  
          //   reject('服务已关闭,请刷新页面重试')
          // }
        }
        onEvaluateError = (error) => {
          console.log('stop recording onEvaluateError===', JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error))))
          isCanStop = false
          let code = error.code + ''
          reject()
          if(code == '4002' || code == "4003") {
            reject(error)
            // console.log('Evaluate.js==143====')
            // resolve({overall: 70,audioUrl:'nourl'})
            // logfn('audio-evaluate-error',code + errorObj[code], getMagicNumber())
          }else if(code=='1001'){
            reject(error)
            // evaluater = null
            // onEvaluateError = null
            // onEvaluateState = null
            // console.log('Evaluate.js==147====')
            // logfn('stop-error',code + errorObj[code], getMagicNumber())
            // alert(errorObj[code]+',请刷新重试')
            // location.reload()
            // // reject(code + errorObj[code]+',请刷新重试')
          }else if(errorObj.hasOwnProperty(code)){
            reject(error)
            // evaluater = null
            // onEvaluateError = null
            // onEvaluateState = null
            // console.log('Evaluate.js==155====')
            // reject(errorObj[code]+',请刷新重试')
            // logfn('stop-error',code + errorObj[code], getMagicNumber())
          }else {
            console.log('Evaluate.js==151====')
            evaluater = null
            onEvaluateError = null
            onEvaluateState = null
            let errorObj = JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error)))
            reject(errorObj)
            reject(errorObj.message+',请刷新重试')
            logfn('stop-error',code + errorObj, getMagicNumber())
          }
        }
      }
    }else {
      console.log('Evaluate.js==159====')
      reject('调用stop之前请先调用start')
      logfn('stop-error','调用stop之前请先调用start', getMagicNumber())
    }
  })
}
function cancel () {
  evaluater && evaluater.cancel()
}
function close() {
  evaluater && evaluater.close()
}
function getMagicNumber() {
  return evaluater && evaluater.getMagicNumber()
}
export default {
  start,
  stop,
  cancel,
  close,
  getMagicNumber,
  errorObj
}






import Evaluater from "evaluater-vkm";

let errorObj = {
  '1000': '未知错误,请刷新后再次尝试~',
  '1001': 'SDK状态异常, 所调用函数和当前状态码不匹配',
  '1101': '环境不支持WebSocket功能',
  '1102': '当前无法录音，请检查你的录音设备是否打开哦,刷新后重试~',
  '1103': '无法获取录音权限',
  '1104': '服务无法连接',
  '1105': '服务连接超时',
  '1106': '网络异常',
  '1107': '认证失败，appId无效',
  '1108': '认证失败，userId无效',
  '1109': '录音时间过短',
  '1110': '录音时间过长',
  '4001': '文本信息错误, 包括必填项为空、类型错误等',
  '4002': '评测失败',
  '4003': '评测超时,请检查网络'
}

let evaluater, isIniting = false, isCanStart = false,isCanStop = false, isClosed = false;
let onEvaluateState = (state) => {
  console.log('state====',state)
}
// state.code : 1:未就绪, 2:连接中, 3:已就绪, 4:录音中, 5:评测结果获取中, 6:已获得评测结果, 7:服务已关闭, 8:录音被打断
let onEvaluateError = (error) => {}
let init = (config) => {
  return new Promise((resolve,reject)=>{
    try{
      evaluater = new Evaluater({
        appId: "5592a6df2ce344cf924dccf902b127b5",
        userId: config.accountId + "",
        env: "prod",
        audioFormat: "mp3",
        onState: state => {
          onEvaluateState(state)
          if(state.code && state.code == 3){
            isCanStart = true
            isClosed = false
            console.log('40====',evaluater)
            resolve(evaluater)
            isIniting = false
          }
        },
        onError: error=>{
          console.log('init onError===',error)
          onEvaluateError(error)
          if(isIniting) {
            isIniting = false
            reject(error)
          }
        }
      })
    }catch(error){
      isIniting = false
      console.log('init catch error===', error)
      reject(error)
    }
  })
}

function start (config, param, logfn) {
  return new Promise((resolve,reject) => {
    console.log('evaluater====',evaluater)
    if(evaluater && isCanStart){
      evaluater.start(param)
      isCanStop = true
      resolve()
      logfn('star-success','',getMagicNumber())
    }else{
      if(isIniting) {
        return
      }
      isIniting = true
      init(config).then((evaluater)=>{
        evaluater.start(param)
        isCanStop = true
        resolve()
        logfn('star-success','',getMagicNumber())
      }, error=>{
        console.log('start reject error=====',error)
        isCanStop = false
        let code = error.code + ''
        if(errorObj.hasOwnProperty(code)){
          reject(errorObj[code])
          logfn('star-error',code + errorObj[code],getMagicNumber())
        }else {
          let errorObj = JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error)))
          reject(errorObj.message)
          logfn('star-error',code + errorObj.message,getMagicNumber())
        }
      }).catch(err=>{
        console.log('start catch error ====',err)
        isCanStop = false
        let errorObj = JSON.parse(JSON.stringify(err,Object.getOwnPropertyNames(err)))
        evaluater.close()
        evaluater = null
        reject(errorObj.message)
        logfn('star-error',errorObj,getMagicNumber())
      })
    }
  })
}
function stop (logfn){
  return new Promise((resolve,reject)=>{
    console.log('111==isClosed',isClosed,evaluater)
    if(isCanStop){
      evaluater.stop()
      isCanStop = false
      onEvaluateState = (state) => {
        if(state.code && state.code == 6){
          console.log('拿到结果===',state.data)
          isCanStart = false
          resolve(state.data)
          logfn('stop-success',state.data, getMagicNumber())
        }
      }
      onEvaluateError = (error) => {
        console.log('stop recording onEvaluateError===', JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error))))
        evaluater&&evaluater.close()
        evaluater = null
        isCanStop = false
        let code = error.code + ''
        onEvaluateError = (error) => {}
        reject(error)
      }
    }else{
      console.log('Evaluate.js==159====')
      reject('调用stop之前请先调用start')
      logfn('stop-error','调用stop之前请先调用start', getMagicNumber())
    }
    // if(evaluater){
    //   if(isCanStop){
    //     evaluater.stop()
    //     isCanStop = false
    //     onEvaluateState = (state) => {
    //       if(state.code && state.code == 6){
    //         console.log('拿到结果===',state.data)
    //         isCanStart = false
    //         resolve(state.data)
    //         logfn('stop-success',state.data, getMagicNumber())
    //       }
    //     }
    //     onEvaluateError = (error) => {
    //       console.log('stop recording onEvaluateError===', JSON.parse(JSON.stringify(error,Object.getOwnPropertyNames(error))))
    //       evaluater&&evaluater.close()
    //       evaluater = null
    //       isCanStop = false
    //       let code = error.code + ''
    //       onEvaluateError = (error) => {}
    //       reject(error)
    //     }
    //   }
    // }else {
    //   console.log('Evaluate.js==159====')
    //   reject('调用stop之前请先调用start')
    //   logfn('stop-error','调用stop之前请先调用start', getMagicNumber())
    // }
  })
}
function cancel () {
  evaluater && evaluater.cancel()
}
function close() {
  evaluater && evaluater.close()
}
function getMagicNumber() {
  return evaluater && evaluater.getMagicNumber()
}
export default {
  start,
  stop,
  cancel,
  close,
  getMagicNumber,
  errorObj
}

