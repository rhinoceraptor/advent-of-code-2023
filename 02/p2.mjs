import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

let cubePowers = []

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    const gameId = line.match(/(\d+):/)[1]

    let rest = line.split(':')[1].trim()
    let rounds = rest.split(';').map(s => s.trim())

    let possible = true;

    let maxR = 0;
    let maxG = 0;
    let maxB = 0;

    for (const round of rounds) {
        console.log(`Game ID ${gameId}: ${round}`)

        let r = round.match(/(\d+) red/)
        let g = round.match(/(\d+) green/)
        let b = round.match(/(\d+) blue/)

        r = r && r.length ? r[1] : 0
        g = g && g.length ? g[1] : 0
        b = b && b.length ? b[1] : 0

        console.log(`Red: ${r} Green: ${g} Blue: ${b}`)

        maxR = Math.max(maxR, r)
        maxG = Math.max(maxG, g)
        maxB = Math.max(maxB, b)
    }

    cubePowers.push(maxR * maxG * maxB)
}

let sum = 0

for (let cubePower of cubePowers) {
    sum += cubePower
}

console.log(`Sum of cube powers: ${sum}`)

