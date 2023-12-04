import fs from 'fs'

const path = process.argv.slice(-1)[0]
const file = fs.readFileSync(path, 'utf-8')
const lines = file.split('\n')

let schematic = []

const getChar = (i, j) => (schematic[i] || [])[j]

for (const line of lines) {
    if (line.trim() === "") {
        break
    }

    schematic.push(line.trim().split(''))
}

for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic.length; j++) {
        process.stdout.write(getChar(i, j))
        process.stdout.write(" ")
    }
    process.stdout.write("\n")
}
process.stdout.write("\n")

const isDigit = c => {
    const match = c && c.match(/^(\d)$/)
    return !!match && !!match.length
}

const isSymbol = c => c && c !== '.' && !isDigit(c)

const chaseNumberInRow = (i, j) => {
    let left = j
    let foundLeft = false
    let num = ''

    // Traverse left, e.g. decrement j until no longer a digit
    while (!foundLeft) {
        if (isDigit(getChar(i, left - 1))) {
            left--
        } else {
            foundLeft = true
        }
    }

    num = num.concat(getChar(i, left))

    let right = left
    let foundRight = false
    // Traverse right, and add to num until no longer a digit
    while (!foundRight) {
        if (isDigit(getChar(i, right + 1))) {
            num = num.concat(getChar(i, right + 1))
            right++
        } else {
            foundRight = true
        }
    }

    return parseInt(num, 10)
}

let totalSum = 0

for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic.length; j++) {

        const c = getChar(i, j)

        if (isSymbol(c)) {
            console.log(`Found symbol ${c} at ${i}, ${j}`)
        } else {
            continue
        }

        // These are disjoint from  others
        const leftIsNum      = isDigit(getChar(i, j - 1))
        const rightIsNum     = isDigit(getChar(i, j + 1))

        const upLeftIsNum    = isDigit(getChar(i - 1, j - 1))
        const upIsNum        = isDigit(getChar(i - 1, j))
        const upRightIsNum   = isDigit(getChar(i - 1, j + 1))

        const downLeftIsNum  = isDigit(getChar(i + 1, j - 1))
        const downIsNum      = isDigit(getChar(i + 1, j))
        const downRightIsNum = isDigit(getChar(i + 1, j + 1))

        let gears = []

        const foundGear = num => gears.push(num)

        if (leftIsNum) {
            let num = chaseNumberInRow(i, j - 1)
            foundGear(num)
        }
        if (rightIsNum) {
            let num = chaseNumberInRow(i, j + 1)
            foundGear(num)
        }

        if (upLeftIsNum) {
            let num = chaseNumberInRow(i - 1, j - 1)
            foundGear(num)
        }
        if (upIsNum && !upLeftIsNum) {
            let num = chaseNumberInRow(i - 1, j)
            foundGear(num)
        }
        if (upRightIsNum && !upIsNum) {
             let num = chaseNumberInRow(i - 1, j + 1)
            foundGear(num)
        }

        if (downLeftIsNum) {
            let num = chaseNumberInRow(i + 1, j - 1)
            foundGear(num)
        }
        if (downIsNum && !downLeftIsNum) {
            let num = chaseNumberInRow(i + 1, j)
            foundGear(num)
        }
        if (downRightIsNum && !downIsNum) {
             let num = chaseNumberInRow(i + 1, j + 1)
            foundGear(num)
        }

        if (c === "*" && gears.length === 2) {
            console.log(`Found gear at ${i}, ${j}, ${gears}`)
            totalSum += (gears[0] * gears[1])
        }
    }
}

console.log(totalSum)
