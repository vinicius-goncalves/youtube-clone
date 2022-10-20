const jwt = require('jsonwebtoken')

const Utils = require('../Utils')
const Generator = require('../controllers/Generator')
const UserAccount = require('../sql/UserAccount')

async function initChannelCreation(request, response) {

    try {

        const bufferData = await Utils.handleBufferData(request)
        const userAccCredentials = JSON.parse(bufferData)
        
        const { channelName, email, password } = userAccCredentials

        const userAlreadyExists = await UserAccount.getUserByCredentialsHash(email, password)
        console.log(userAlreadyExists)
        if(userAlreadyExists) {
            return
        }
        
        let flag = false

        do {

            const channelURL = Generator.randomChannelURL()
            const userFound = await UserAccount.getUserByChannelURL(channelURL)
            
            if(!userFound) {
                
                flag = true

                const UUID = Utils.randomUUID()
                UserAccount.insertUser(UUID, channelName, email, password, channelURL)
                
                response.writeHead(200, { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin': '*'
                })

                const tokenCreated = jwt.sign({ tokenExpiresAt: Date.now() + (30 * 1000)}, process.env.TOKEN_PRIVATE_KEY, { expiresIn: 30 })
                const refreshTokenCreated = jwt.sign({ refreshTokenExpiresAt: Date.now() * (3600 * 1000) }, 
                process.env.REFRESH_TOKEN_PRIVATE_KEY, { expiresIn: 3600 })

                response.write(JSON.stringify({
                    created: true,
                    message: 'The user account has been created succefully',
                    newChannelURL: channelURL,
                    createdAt: Date.now(),
                    tokens: {
                        token: tokenCreated,
                        refreshToken: refreshToken
                    }
                }))

                response.end()

                return
            }

            flag = false
            console.log('Not created', channelURL)

        } while(!flag)

        response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        response.end()

    } catch (error) {
        console.log(error)
        response.writeHead(400, { 'Access-Control-Allow-Origin': '*' })
        response.write(JSON.stringify({
            created: false,
            message: 'An error has occuried when tried to create user account.',
            responseCode: response.statusCode
        }))
        response.end()    
    }
}

module.exports = {
    initChannelCreation
}