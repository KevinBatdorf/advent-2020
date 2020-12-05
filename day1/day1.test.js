const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()

const spoilerMask = 12345

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.numbers = document.querySelector('pre')
        // Split by new line
        .textContent.split('\n')
        // Convert strings to integers
        .map(n => parseInt(n, 10))
        // Filter out any non numbers that creeped in.
        .filter(Number)
})

test('Part 1 - Find two numbers that sum to 2020 and multiply them', done => {

    const result = numbers
        // This will cycle through each number a and check whether another number
        // "2020 - n" exists. If it does, we have a match
        .filter(n => numbers.includes(2020 - n))
        // This will multiply all numbers in an array
        .reduce((a, b) => a * b, 1)

    expect(result).toBe(793386 + spoilerMask)
    done()
})

test('Part 2 - Find three numbers that sum to 2020 and multiply them', done => {

    // Uses the same logic as the first part, but considers the third number
    const findRemaining = single => numbers
        .filter(n => numbers.includes(2020 - single - n))

    // Will add together all numbers of an array
    const sum = list => list.reduce((a, b) => a + b)

    // This will cycle through every number n
    const result = numbers.filter(number => {
        // Then check whether "2020 - n" can fit into the pattern from part 1
        const remaining = findRemaining(number)
        // This checks whether something was found
        return remaining.length ? remaining : false
    })
    // Multiplies everything together
    .reduce((a, b) => a * b, 1)

    // Note that this assumes the game only has one solution
    // The above wouldn't work otherwise. You would need
    // to check the array length and confirm the results
    expect(result).toBe(192672615 + spoilerMask)
    done()
})
