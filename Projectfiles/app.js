const http = require('http');
const https = require('https');

const server  = http.createServer((req, res) => {
    console.log(req)
})

server.listen(3000);

process.exit();