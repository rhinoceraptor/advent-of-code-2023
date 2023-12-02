import fs from 'fs'
import readline from 'readline'

const path = process.argv.slice(-1)[0]
const filestream = fs.createReadStream(path)
const rl = readline.createInterface({
    input: filestream,
    ctrlDelay: Infinity
})

let sum = 0

rl.on('line', line => {
    console.log(line)
    const digits = line.match(/(\d)/g)

    const firstNum = digits[0]
    const lastNum = digits.slice(-1)[0]
    const lineSum = parseInt(firstNum.concat(lastNum), 10)
    console.log(`first: ${firstNum}\t last: ${lastNum}\ttogether: ${lineSum}`)

    sum += lineSum
})

rl.on('close', () => {
    console.log(`sum: ${sum}`)
});
