const Utils = require('../Utils')

function randomChannelURL() {

    const initialID = 'UC'
    const channelID = ''

    let flag = false
    
    do {

        const channelIDGenerated = Utils.randomCharacters(22, '-')
        const hasRepeatHifens = Utils.checkIfHasRepeat(channelIDGenerated)
        if(!hasRepeatHifens) {
            flag = true
            return channelID.concat(initialID, channelIDGenerated)
        }

        flag = false

    } while(!flag)

    return channelID
}

module.exports = {
    randomChannelURL
}