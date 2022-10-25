function createTokenObj(tokenType, valid = false) {

    const newObj = Object.create(null)

    const objOptions = {
        value: {
            valid
        },
        writitable: true,
        enumerable: true
    }

    Object.defineProperty(newObj, tokenType, objOptions)
    
    return newObj

}

function getTokenValidation (tokenObj) {
    let tokenValidation = null
    for(let key in tokenObj) {
        tokenValidation = tokenObj[key].valid
    }
    return tokenValidation
}

function setTokenOverObjResponse (token, obj, tokenType) {

    const tokenValidation = getTokenValidation(token)

    const accObjOptions = {
        value: {
            valid: tokenValidation
        },
        enumerable: true,
        writable: true
    }

    Object.defineProperty(obj, tokenType, accObjOptions)
}

module.exports = {
    createTokenObj, 
    getTokenValidation,
    setTokenOverObjResponse
}
