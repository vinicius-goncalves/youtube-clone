import { SERVER_BASE_LINK } from './utils.js'
import { TOKEN } from './data/token-storage.js'

(() => {
    const wrappers = document.querySelectorAll('[data-wrapper]')
    wrappers.forEach(wrapper => {
        wrapper.style.display = 'none'
    }) 

    const tokens = TOKEN.getTokens()
    const xhr = new XMLHttpRequest()

    xhr.open('POST', `${SERVER_BASE_LINK}/account?handleWith=token-verification`)
    xhr.addEventListener('load', (event) => {

        const { response } = event.target
        const tokenResponseObj = JSON.parse(response)
        console.log(tokenResponseObj)

        if(tokenResponseObj.error) {
            const backPage = new URL(window.location.origin)
            backPage.pathname = '/frontend/pages/credentials/register.html'
            window.location.href = backPage.href

            throw new Error('Token storage has not been found.')
            
        }

        const objValues = []
        for(let i in tokenResponseObj) {
            objValues.push(tokenResponseObj[i])
        }
        
        const allTokensAreInvalid = objValues.every(token => token.valid === false)
        
        if(allTokensAreInvalid) {
            document.querySelector('[data-wrapper="token-is-not-working"]').style.display = 'flex'
            return
        }

        const foundValidToken = objValues.find(token => token.valid === true)

    })

    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(tokens)

})();