export { 
    BASE_LINK,
    digestText
 }

const PORT = 8080
const BASE_LINK = `https://localhost:${PORT}`

function digestText(data) {

    if(data.length === 0) { return }

    const dataSplitted = data.split('')

    const arrayBuffer = new ArrayBuffer(dataSplitted.length)
    const dataView = new DataView(arrayBuffer)

    dataSplitted.forEach((char, index) => {
        const asciiChar = String(char).charCodeAt()
        dataView.setUint8(index, asciiChar)
    })

    const hashArray = crypto.subtle.digest('SHA-256', arrayBuffer).then(hashBuffer => {
        const hashArray = [...new Uint8Array(hashBuffer)]
        const hashHex = hashArray.map(asciiChar => asciiChar.toString(16)).join('')
        return hashHex
    })

    return hashArray

}