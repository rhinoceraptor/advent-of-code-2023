import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    console.log(line)
}

