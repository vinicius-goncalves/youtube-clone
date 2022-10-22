const http = require('http')
const nodeURL = require('url')

const AccountController = require('../controllers/AccountController')
const AuthController = require('../controllers/AuthController')

const port = process.env.PORT || 8080

const server = http.createServer((request, response) => {
    
    const { method, url } = request
    console.log(method)

    const params = nodeURL.parse(url, true).query
    const type = params.type
    const handleWith = params.handleWith
    

    switch(method) {

        case 'OPTIONS':
            response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': '*', 'Access-Control-Allow-Headers': '*' })
            response.end()
            break

        case 'POST':

            if(url.indexOf('/channel') !== -1) {


                if(type === 'account' && handleWith === 'creation') {
                    AccountController.initChannelCreation(request, response)
                    break
                }
            }

            if(url.indexOf('/account') !== -1 && handleWith === 'token-verification') {
                AuthController.verifyToken(request, response)
                break
            }

            response.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            })
            response.end(JSON.stringify('Hello WOrld'))
            break

        default:
            response.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            })
            response.end()
    }
})

server.listen(port, () => 
    console.log(`vinicius-goncalves.com | Server started on port ${port} - ${new Date()}`))