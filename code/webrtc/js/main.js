var localVideo = document.querySelector('video#localvideo')
var remoteVideo = document.querySelector('video#remotevideo')

var btnStart = document.querySelector('button#start')
var btnCall = document.querySelector('button#call')
var btnHangup = document.querySelector('button#hangup')

var localStream
var pc1
var pc2

function getMediaStream(stream) {
    localVideo.srcObject = stream
    localStream = stream
}

function handleError(err) {
    console.log('Failed to get Media Stream!', err)
}

function start() {
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('the getUserMedia is not supported!')
        return
    }else {
        var constraints = {
            video: true,
            audio: false
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(getMediaStream)
            .catch(handleError)
    }
}

function getRemoteStream(e) {
    remoteVideo.srcObject = e.streams[0]
}

function getAnswer(desc) {
    pc2.setLocalDescription(desc)
    // 收集candidate ，然后 send desc to signal
    // receive desc from signal
    pc1.setRemoteDescription(desc)
}

function handlerAnswerError(err) {
    console.log('Failed to create answer: ', err)
}

function getOffer(desc) {
    pc1.setLocalDescription(desc)
    // send desc to signal 
    // signal - B, B receive desc from signal
    pc2.setRemoteDescription(desc)
    pc2.createAnswer()
        .then(getAnswer)
        .catch(handlerAnswerError)


}
function handleOfferError(err) {
    console.log('Failed to create offer: ', err)
}
function call() {
    // pc1 ：调用者，pc2:被调用者
    pc1 = new RTCPeerConnection() //本机内，所以没设置参数 ,本机与本机通信，所以没有设置信令
    pc2 = new RTCPeerConnection()

    pc1.onicecandidate = (e) => { 
        // 判断e.candidate的原因：当监听到onicecandidate的时候，是在收集链路的过程，但是有的连接是不可行的，所以需要判断
        e.candidate && pc2.addIceCandidate(e.candidate)
    }
    pc2.onicecandidate = (e) => {
        e.candidate && pc1.addIceCandidate(e.candidate)
    }
    pc2.ontrack = getRemoteStream //必须先获取流，再进行媒体协商

    localStream.getTracks().forEach(track => {
        pc1.addTrack(track, localStream)
    });

    var offerOptions = {
        offerToReceiveAudio: 0,
        offerToReceiveVideo: 1
    }
    pc1.createOffer(offerOptions) //媒体协商
        .then(getOffer)
        .catch(handleOfferError) 

}

function hanup() {
    pc1.close()
    pc2.close()
    pc1 = null
    pc2 = null
}

btnStart.onclick = start
btnCall.onclick = call
btnHangup.onclick = hanup