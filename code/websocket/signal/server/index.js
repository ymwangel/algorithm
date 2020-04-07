var http = require('http')
var https = require('https')
var fs = require('fs')

var express = require('express')
// var serverIndex = require('serve-index') //将文件夹中文件列表显示到浏览器中

var socketIo = require('socket.io')
var log4js = require('log4js')
log4js.configure( {
    appenders: {
        file: {
            type: 'file',
            filename: 'app.log',
            layout: {
                type: 'pattern',
                pattern: '%r %p - %m',
            }
        }
    },
    categories: {
        default : {
            appenders: ['file'],
            level: 'debug'
        }
    }
})

var logger = log4js.getLogger()
var app = express()
app.get('/', handler)


var http_server = http.createServer(app)
// bind socketIo with http_server
var io = socketIo.listen(http_server)

http_server.listen(8855, function() {
    console.log('http listen 8855')
})

var options = {
    key: fs.readFileSync('../../key.pem'),
    cert: fs.readFileSync('../../cert.pem')
}
var https_server = https.createServer(options, app)

// bind socketIo with https_server
// var io = socketIo.listen(https_server)

/**
 * 也可以直接用 io.on
 * io.on(最新版本的写法) 和 io.sockets.on(以前的写法) 都是使用 default namespaces
 */
/**
 * 如果使用 cust namespaces
 * const nsp = io.of('/custom-namespace')
 * nsp.on('connection', (socket) => {})
 */
io.sockets.on('connection', socket=>{ //io下的所有客户端
    socket.on('join', (room) => { //加入房间
        socket.join(room)
        var myRoom = io.sockets.adapter.rooms[room]
        var users = myRoom && Object.keys(myRoom.sockets).length //所有用户数量
        logger.log('the number of use in room is: ' + users)
        // socket.emit('joined',room, socket.id) //给自己发消息
        // socket.to(room).emit('joined', room, socket.id) //给这个房间里除了自己之外的所有人
        io.in(room).emit('joined', room, socket.id) //给这个房间里的所有人（包括自己）
        socket.broadcast.emit('joined', room, socket.id) //给全部站点的除自己之外的所有人
    })
    socket.on('leave', room => {
        var myRoom = io.sockets.adapter.rooms[room]
        var users = myRoom && Object.keys(myRoom.sockets).length //所有用户数量
        // users-1 //实际用户数量
        logger.log('the number of use in room is: ' + (users - 1))
        socket.leave(room)
        socket.broadcast.emit('leaved', room, socket.id) //给全部站点的除自己之外的所有人
    })
    socket.on('message', (room,data) => {
      io.in(room).emit('message', room, data.split(':')[0], data)
    })
})

// https_server.listen(443, function() { //在浏览器访问的时候，需要使用https：https://localhost:443/
//     console.log('listen https')
// })

function handler(req, res) {
    console.log('req.url ===' , req.url)
    // res.send('hello world')
    // if(req.url === '/') {
    //   fs.readFile(__dirname + "/public/index.html", function(err, data) {
    //     if (err) {
    //       res.writeHead(500);
    //       return res.end("Error loading index.html");
    //     }

    //     res.writeHead(200);
    //     res.end(data);
    //   });
    // }
  }
