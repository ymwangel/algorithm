const http = require('http')
const fs = require('fs')

http.createServer(handlerRequest).listen(8888)
console.log('server listening on 8888')

function handlerRequest(req, res) {
    console.log('request come', req.url)
    if(req.url == '/'){
        const html = fs.readFileSync('../index.html','utf8')
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end(html)
    }else if(req.url === '/js/client.js') {
        const jsFile = fs.readFileSync('client.js','utf8')
        res.writeHead(200, {
            'Content-Type': 'text/javascript            '
        })
        res.end(jsFile)
    }
    
}