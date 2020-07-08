const cp = require('child_process') //用来控制子进程的调度

const child_process = cp.fork(__dirname + '/child.js')

child_process.send('haha') //主进程向子进程发送消息

child_process.on('message', str => {
    console.log('parent', str)
})