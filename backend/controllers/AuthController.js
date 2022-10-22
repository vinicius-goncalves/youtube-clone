const jwt = require('jsonwebtoken')

const Utils = require('../Utils')

function createTokenObj(tokenType, valid = false) {

    const newObj = Object.create(null)

    const objOptions = {
        value: valid,
        writitable: true,
        configurable: true,
        enumerable: true
    }

    Object.defineProperty(newObj, tokenType, objOptions)
    
    return newObj

}

async function verifyToken(request, response) {

    try {

        const bufferData = await Utils.handleBufferData(request)
        const tokens = JSON.parse(bufferData)

        const objValues = Object.entries(tokens)
        const tokensVerified = objValues.reduce((acc, item) => {
            const [ tokenType, value ] = item
            
            const secretKeyType = tokenType === 'token' 
                ? process.env.TOKEN_PRIVATE_KEY
                : process.env.REFRESH_TOKEN_PRIVATE_KEY

            jwt.verify(value, secretKeyType, (error) => {
                if(error) {
                    acc[tokenType] = {
                        valid: false
                    }
                    return acc
                }

                acc[tokenType] = {
                    valid: true
                }
                return acc
            })

            return acc
        
        }, {})

        console.log(tokensVerified)


        response.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        response.end()

    } catch(error) {
        console.log(error)
        response.end()
    }
}

module.exports = {
    verifyToken
}