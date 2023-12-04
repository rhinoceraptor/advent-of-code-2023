import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')


const getNumsHash = s => {
    const nums = s.split(' ').map(s => s.trim()).filter(s => !!s)
    const hash = {}
    nums.forEach(num => {
        hash[num] = true
    })

    return hash
}

const getCardNumber = line => {
    return line.match(/^Card(.*)(\d*):/)[1].trim()
}

const getWinningNums = line => {
    const numbers     = line.split(':')[1].split('|')
    const winnerNums  = getNumsHash(numbers[0])
    const haveNums    = getNumsHash(numbers[1])
    const winningNums = Object.keys(haveNums).filter(num => !!winnerNums[num])
    return winningNums
}

let totalCards = 0

let cards = {}

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    const cardNum     = getCardNumber(line)
    const winningNums = getWinningNums(line)
    const score       = winningNums.length

    // console.log({ cardNum, winningNums })

    cards[cardNum] = score
    totalCards += 1
}

const processCard = (cardNum, indent = 0) => {
    // console.log(`${"\t".repeat(indent)} Card Num: ${cardNum}: ${cards[cardNum]}`)
    totalCards += cards[cardNum]

    for (let i = 0; i < cards[cardNum]; i++) {
        processCard(cardNum + i + 1, indent + 1)
    }
}

Object.keys(cards).forEach(card => processCard(parseInt(card, 10)))

console.log({ cards, totalCards })

