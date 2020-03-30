// var app = require('express')();
var http = require('http').createServer();
var io = require('socket.io')(http);
var fs = require('fs')

http.listen(8886, function(){
  console.log('listening on *:8886');
});

io.on("connection", function(socket) {
  console.log('连接成功');
  //连接成功之后发送消息
  socket.on('message', function(data) {
    console.log('message=====', data)
    socket.broadcast.emit('receive', data.message)
  })
  socket.on('addUser', function(data) {
    socket.broadcast.emit('newUser', {msg: data})
  })
  socket.on('disconnect', timeout => {
    console.log('sdfsdfs')
  })
});
