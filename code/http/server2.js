const http = require('http')
const fs = require('fs')
http.createServer(function(request, response) {
    console.log('request come', request.url)
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Allow-Methods': 'POST, PUT, Delete'
    })
    response.end('123')
}).listen(8887)
console.log('server listening on 8887')