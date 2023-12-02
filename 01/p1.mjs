import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

let sum = 0

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    console.log(line)
    const digits = line.match(/(\d)/g)

    const firstNum = digits[0]
    const lastNum = digits.slice(-1)[0]
    const lineSum = parseInt(firstNum.concat(lastNum), 10)
    console.log(`first: ${firstNum}\t last: ${lastNum}\ttogether: ${lineSum}`)

    sum += lineSum
}

console.log(`sum: ${sum}`)
