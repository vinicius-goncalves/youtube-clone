import { 
    BASE_LINK,
    digestText
 } from '../../utils.js'

const createNewChannelBtn = document.querySelector('[data-button="create-new-channel"]')
const acceptTermsCheckbox = document.querySelector('[id="accept-terms"]')

function removeDisabledAttribute({ target }) {
    const acceptTerms = target
    if(acceptTerms.nodeType !== Node.ELEMENT_NODE) {
        return
    }


    if(!createNewChannelBtn.hasAttribute('disabled')) {

        const disabledAttribute = document.createAttribute('disabled')
        createNewChannelBtn.setAttributeNode(disabledAttribute)
        return
    }

    createNewChannelBtn.removeAttribute('disabled')
}

acceptTermsCheckbox.addEventListener('click', (event) => {
    removeDisabledAttribute(event)
})

function handleChannelCreation() {
    
    const channelRegisterDetails = Array.from(document.querySelectorAll('[data-register-detail]')).map(item => item.value)
    
    const digestChannelRegisters = channelRegisterDetails.map(item => {
        console.log(item)
    })
}

createNewChannelBtn.addEventListener('click', () => {
    digestText('Padre Kelmon 2022').then(result => console.log(result))
    
    handleChannelCreation()
    
})