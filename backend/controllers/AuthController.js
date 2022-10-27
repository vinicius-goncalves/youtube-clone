const jwt = require('jsonwebtoken')

const Utils = require('../Utils')
const Token = require('../Token')

async function verifyToken(request, response) {

    try {

        const bufferData = await Utils.handleBufferData(request)

        if(!bufferData.length) {

            const objTokenErrorResponse = JSON.stringify({
                error: true,
                message: 'Tokens don\'t exist.'
            })
            
            response.writeHead(400, { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            })
            
            response.write(objTokenErrorResponse)
            response.end()
            return
        }

        const tokens = JSON.parse(bufferData)

        const objValues = Object.entries(tokens)
        const tokensVerified = objValues.reduce((acc, item) => {
            const [ tokenType, value ] = item
            
            const secretKeyFromTokenType = tokenType === 'token' 
                ? process.env.TOKEN_SECRET_KEY
                : process.env.REFRESH_TOKEN_SECRET_KEY

            try {

                jwt.verify(value, secretKeyFromTokenType)

                const tokenTrueStatusObj = Token.createTokenObj(tokenType, true)
                Token.setTokenOverObjResponse(tokenTrueStatusObj, acc, tokenType)

                return acc

            } catch (error) {

                const tokenFalseStatusObj = Token.createTokenObj(tokenType, false)
                Token.setTokenOverObjResponse(tokenFalseStatusObj, acc, tokenType)
                
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

async function refreshToken(request, response) {

    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    verifyToken,
    refreshToken
}