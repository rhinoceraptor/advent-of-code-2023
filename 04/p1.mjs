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

let totalScore = 0

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    console.log(line)
    const cardNum = line.match(/^Card(.*)(\d+):/)[1]
    console.log(cardNum)

    const numbers     = line.split(':')[1].split('|')
    const winnerNums = getNumsHash(numbers[0])
    const haveNums    = getNumsHash(numbers[1])
    console.log({ winnerNums, haveNums })

    const winningNums = Object.keys(haveNums).filter(num => !!winnerNums[num])

    console.log({ winningNums })

    const score = winningNums.reduce((acc, cur, i) => acc ? acc * 2 : 1 , 0)

    console.log({score })

    totalScore += score
}

console.log({ totalScore })

