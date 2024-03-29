export { 
    BASE_LINK,
    SERVER_BASE_LINK,
    isFalsy,
    digestText,
    colorByPercetange,
    randomUUID
 }

const PORT = 8080
const BASE_LINK = `http://127.0.0.1:5500`
const SERVER_BASE_LINK = `http://localhost:${PORT}`

function isFalsy(data) {
    const falsyValues = [0, false, '', -1, null, undefined]
}

function colorByPercetange(percentange, hue0, hue1) {
    const hueColor = (percentange * (hue1 - hue0) + hue0)
    console.log(hueColor)
    return `hsl(${hueColor}, 100%, 50%)`
}


function digestText(data) {

    const splittedData = data.split('')

    if(splittedData.length === 0) { return }

    const arrayBuffer = new ArrayBuffer(splittedData.length)
    const dataView = new DataView(arrayBuffer)

    splittedData.forEach((char, index) => {
        const asciiChar = String(char).charCodeAt()
        dataView.setUint8(index, asciiChar)
    })

    const hashArray = crypto.subtle.digest('SHA-256', arrayBuffer).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(ascii => ascii.toString(16)).join('')
        return hashHex
    })

    return hashArray
}

function randomUUID() {
    let dateTime = Date.now()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
        dateTime = dateTime / 16
        const random = (dateTime + (Math.random() * 16)) % 16 | 0
        return (char === 'x' ? random : random & 0x3 | 0x8).toString(16)
    })
    return uuid
}