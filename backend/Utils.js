function randomCharacters(length) {

    const arr  = Array(length).fill('')
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890-'

    const getRandomChar = () => {
        const sort = Math.random()
        const item = chars[Math.floor(Math.random() * chars.length)]
        return { sort, item }
    }

    const randomizeChars = (a, b) => a.sort - b.sort
    const ranodmCases = ({ item }) => Math.random() > .5 ? item.toUpperCase() : item.toLowerCase()
    
    const finalResult = arr.map(getRandomChar)
        .sort(randomizeChars)
        .map(ranodmCases)
        .join('')

    if(finalResult.endsWith('-') || finalResult.startsWith('-')) {
        const result = randomCharacters(length)
        return result
    }

    return finalResult

}

function checkIfHasRepeat(string, charToCheck = '-', giveAutomaticResult = true) {

    const charsCount = string.split('').reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1
        return acc
    }, {})

    const objItselfProperties = Object.keys(charsCount).reduce((acc, item) => {
        if(charsCount.hasOwnProperty(item)) {
            acc[item] = charsCount[item]
            return acc
        }
        return acc
    }, {})

    if(giveAutomaticResult) {
        const result = Object.entries(objItselfProperties).some(pair => {
            const [ property, value ] = pair
            if(value >= 2 && property.indexOf(charToCheck) !== -1) {
                return true
            }
        })
        return result
    }

    return objItselfProperties
}

module.exports = {
    randomCharacters,
    checkIfHasRepeat
}