
import fs from 'fs'
import readline from 'readline'

const path = process.argv.slice(-1)[0]
const filestream = fs.createReadStream(path)
const rl = readline.createInterface({
    input: filestream,
    ctrlDelay: Infinity
})

let sum = 0

const numMapFirst = {
    one:       '1',
    two:       '2',
    three:     '3',
    four:      '4',
    five:      '5',
    six:       '6',
    seven:     '7',
    eight:     '8',
    nine:      '9',
    twone:     '2',
    oneight:   '1',
    threeight: '3',
    fiveight:  '5',
    nineight:  '9',
    eightwo:   '8',
    eighthree: '8',
    sevenine:  '7'
}

const numMapLast = {
    one:       '1',
    two:       '2',
    three:     '3',
    four:      '4',
    five:      '5',
    six:       '6',
    seven:     '7',
    eight:     '8',
    nine:      '9',
    twone:     '1',
    oneight:   '8',
    threeight: '8',
    fiveight:  '8',
    nineight:  '8',
    eightwo:   '2',
    eighthree: '3',
    sevenine:  '9'
}

rl.on('line', line => {
    console.log(line)
    const digits = line.match(/(\d|twone|oneight|threeight|fiveight|nineight|eightwo|eighthree|sevenine|one|two|three|four|five|six|seven|eight|nine)/g)
    console.log(digits)
    const firstMatch = digits[0]
    const lastMatch = digits.slice(-1)[0]

    console.log(`first: ${firstMatch}\t last: ${lastMatch}`)

    const firstNum = numMapFirst[firstMatch] || firstMatch
    const lastNum = numMapLast[lastMatch] || lastMatch

    const lineSum = parseInt(firstNum.concat(lastNum), 10)
    console.log(`first: ${firstNum}\t last: ${lastNum}\ttogether: ${lineSum}`)
    sum += lineSum
})

rl.on('close', () => {
    console.log(`sum: ${sum}`)
});
