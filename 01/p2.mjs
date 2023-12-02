import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

const reverse = str => str.split('').reverse().join('')

const numMap = {
    one:       '1',
    two:       '2',
    three:     '3',
    four:      '4',
    five:      '5',
    six:       '6',
    seven:     '7',
    eight:     '8',
    nine:      '9'
}

const regex        = /(\d|one|two|three|four|five|six|seven|eight|nine)/g
const reverseRegex = /(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)/g

let sum = 0

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    console.log(line)
    const firstMatch = line.match(regex)[0]
    const lastMatch  = reverse(
        reverse(line).match(reverseRegex)[0]
    )

    const firstNum   = numMap[firstMatch] || firstMatch
    const lastNum    = numMap[lastMatch]  || lastMatch

    const lineSum = parseInt(firstNum.concat(lastNum), 10)
    console.log(`first: ${firstNum}\t last: ${lastNum}\ttogether: ${lineSum}`)
    sum += lineSum
}

console.log(`sum: ${sum}`)

