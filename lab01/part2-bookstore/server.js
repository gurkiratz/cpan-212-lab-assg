const http = require('http')
const fs = require('fs');
const path = require('path');

const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, '/pages/page.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('500 - Internal Server Error')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    } else if (req.url === '/about') {
        // res.writeHead(200, {''})
        res.end('Welcome to About page')
    } else if (req.url === '/game') {
        fs.readFile(path.join(__dirname, 'pages/game.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end('500 - Internal Server Error')
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)
            }
        })
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end(`<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Node.js HTTP Server</title>
</head>
<body>
    <h1>You came on a wrong page buddy! Please check your url: <span style="background-color: lightblue;">${req.url}</span> again</h1>
</body>
</html>`)
    }

});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});