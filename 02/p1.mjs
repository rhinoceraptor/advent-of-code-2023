import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

let possibleGameIds = []

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    const gameId = line.match(/(\d+):/)[1]

    let rest = line.split(':')[1].trim()
    let games = rest.split(';').map(s => s.trim())

    let possible = true;

    for (const game of games) {
        console.log(`Game ID ${gameId}: ${game}`)

        let r = game.match(/(\d+) red/)
        let g = game.match(/(\d+) green/)
        let b = game.match(/(\d+) blue/)

        r = r && r.length ? r[1] : 0
        g = g && g.length ? g[1] : 0
        b = b && b.length ? b[1] : 0

        console.log(`Red: ${r} Green: ${g} Blue: ${b}`)

        if (r > 12 || g > 13 || b > 14) {
            possible = false;
            break
        }
    }

    if (possible) {
        possibleGameIds.push(gameId)
    }
}

console.log(possibleGameIds)

let sum = 0

for (let gameId of possibleGameIds) {
    sum += parseInt(gameId)
}

console.log(sum)

