process.on('message', (str)=>{
    console.log('child',str)

    process.send('hehe') //子进程发送消息给主进程
})