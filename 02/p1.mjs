import fs from 'fs'
import readline from 'readline'

const path = process.argv.slice(-1)[0]
const filestream = fs.createReadStream(path)
const rl = readline.createInterface({
    input: filestream,
    ctrlDelay: Infinity
})

rl.on('line', line => {
})

rl.on('close', () => {
});
