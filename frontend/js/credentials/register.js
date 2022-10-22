import { 
    BASE_LINK,
    SERVER_BASE_LINK,
    digestText
 } from '../utils.js'

 import { TOKEN } from '../data/token-storage.js'

const createNewChannelBtn = document.querySelector('[data-button="create-new-channel"]')
const acceptTermsCheckbox = document.querySelector('[id="accept-terms"]')

window.addEventListener('load', () => {
    const users = [`user${Math.floor(Math.random() * (9999 - 999) + 999)}`, `user${Math.floor(Math.random() * (9999 - 999) + 999)}`]
    const channelDetails = Array.from(document.querySelectorAll('[data-register-detail]'))
    channelDetails.forEach(item => item.value = `${users[Math.floor(Math.random() * users.length)]}`)
})

function removeDisabledAttribute({ target }) {
    const acceptTerms = target
    if(acceptTerms.nodeType !== Node.ELEMENT_NODE) {
        return
    }

    if(createNewChannelBtn.hasAttribute('disabled')) {
        createNewChannelBtn.removeAttribute('disabled')
        return 

    }
    
    const disabledAttribute = document.createAttribute('disabled')
    createNewChannelBtn.setAttributeNode(disabledAttribute)

}

acceptTermsCheckbox.addEventListener('click', (event) => {
    removeDisabledAttribute(event)
})

function sendCreationChannelRequest(channelDetails) {
    fetch(`${SERVER_BASE_LINK}/channel?type=account&handleWith=creation`, {
        method: 'POST',
        body: JSON.stringify(channelDetails)
    }).then(response => {
        if(!response.ok) {
            throw new Error('An error has occuried over the request response')
        }

        return response.json()
    }).then(registerDetails => {

        const { token, refreshToken } = registerDetails.tokens

        TOKEN.setTokens(token, refreshToken)

        const openURL = new URL(window.location.origin)
        openURL.pathname = '/frontend/pages/token-test.html'

        window.open(openURL, '_blank')

    })
}

function handleChannelCreation() {
    
    const channelRegisterDetails = Array.from(document.querySelectorAll('[data-register-detail]'))
    
    const digestChannelRegisters = channelRegisterDetails.map(async (credentials) => {

        const { registerDetail } = credentials.dataset
        
        if(registerDetail.toLowerCase() !== 'channel-name') {
            const digestCredential = await digestText(credentials.value)
            return `${registerDetail}:${digestCredential}`
        }
        
        return `${registerDetail.replace('channel-name', 'channelName')}:${credentials.value}`
    })

    Promise.all(digestChannelRegisters).then(credentials => {
        
        const crendObj = credentials.reduce((acc, item) => {
            const [ credential, value ] = item.split(':')
            acc[credential] = value
            return acc
        }, {})

        sendCreationChannelRequest(crendObj)

    })
}

createNewChannelBtn.addEventListener('click', handleChannelCreation)