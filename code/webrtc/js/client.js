'use strict'

if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices is not suppoerted')
}else {
    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .catch(handlerError)
}

function gotDevices (deviceInfos) {
    deviceInfos.forEach(deviceInfo => {
        console.log(deviceInfo.kind + ':' 
        + ':label=' + deviceInfo.label 
        + ': id=' + deviceInfo.deviceId
        + ': groupId' + deviceInfo.groupId)
    });
}
function handlerError(err) {
    console.log(err.name + ':' + err.message)
}