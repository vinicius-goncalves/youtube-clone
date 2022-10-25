const jwt = require('jsonwebtoken')

const Utils = require('../Utils')

function createTokenObj(tokenType, valid = false) {

    const newObj = Object.create(null)

    const objOptions = {
        value: {
            valid
        },
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
        const tokensVerified = objValues.reduce((acc, item, index) => {
            const [ tokenType, value ] = item
            
            const secretKeyType = tokenType === 'token' 
                ? process.env.TOKEN_PRIVATE_KEY
                : process.env.REFRESH_TOKEN_PRIVATE_KEY

            try {

                jwt.verify(value, secretKeyType)
                const newObj = createTokenObj(tokenType, true)
                return acc

            } catch (error) {

                const obj = createTokenObj(tokenType, false)
                for(let key in obj) {
                    Object.defineProperty(acc, key, {
                        value: obj[key],
                        enumerable: true
                    })
                }
                return acc        
            }
        }, {})

        response.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        })
        response.end(JSON.stringify(tokensVerified))

    } catch(error) {
        console.log(error)
        response.end()
    }
}

module.exports = {
    verifyToken
}