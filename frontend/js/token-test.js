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
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(tokens)

})();