export { TOKEN }

const TOKEN = {

    createTokenObj: function(token, refreshToken) {
        return {
            token,
            refreshToken
        }
    },

    getTokens: function() {
        return localStorage.getItem('tokens')
    },

    tokenStorageExists: function() {
        return this.getTokens() !== null ? true : false
    },

    setTokens: function(token, refreshToken) {

        const newTokenObj = this.createTokenObj(token, refreshToken)
        console.log(newTokenObj)
        localStorage.setItem('tokens', JSON.stringify(newTokenObj))

    }
}