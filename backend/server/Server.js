const http = require('http')

const port = process.env.PORT || 8080

const server = http.createServer((request, response) => {
    
    const { method, url } = request
    switch(method) {
        case 'GET':
            break
        default:
            response.end()
    }
})

server.listen(port, () => 
    console.log(`vinicius-goncalves.com | Server started on port ${port} - ${new Date()}`))