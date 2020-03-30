var app = require('express')();
var http = require('http').createServer(handler);
var io = require('socket.io')(http);
var fs = require('fs')

http.listen(8889, function(){
  console.log('listening on *:8889');
});

function handler(req, res) {
  if(req.url === '/index') {
    fs.readFile(__dirname + "/index.html", function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading index.html");
      }
  
      res.writeHead(200);
      res.end(data);
    });
  }else if(req.url == '/receive'){
    fs.readFile(__dirname + "/receive.html", function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end("Error loading receive.html");
      }
      res.writeHead(200);
      res.end(data);
    });
  }else if(req.url === '/socket.io-client/dist/socket.io.js'){
    fs.readFile(__dirname + "/node_modules" + req.url, function(err,data) {
      if(err) {
        res.writeHead(500);
        return res.end("Error loading index.html");
      }
      res.writeHead(200);
      res.end(data);
    })
  }
  
}

io.on("connection", function(socket) {
    console.log('连接成功');
    //连接成功之后发送消息
    // socket.emit("new message", { mess: `初始消息` });
    socket.on('recive message', function(data) {
      console.log(data)
      socket.broadcast.emit('content', {message: data})
    })
});

