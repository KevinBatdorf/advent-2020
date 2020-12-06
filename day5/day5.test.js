const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { getSeatIDs, findMissingSeat } = require('./day5')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.boardingPasses = document.querySelector('pre')
        // Split by line
        .textContent.split('\n')
        // Trim and remove new lines
        .map(n => n.trim())
        // Remove anytihng falsey
        .filter(Boolean)
})

test('Part 1 - Gather all seat IDs', async () => {
    expect(Math.max(...getSeatIDs(boardingPasses))).toBe(906)
})

test('Part 2 - Find your seat', async () => {
    expect(findMissingSeat(getSeatIDs(boardingPasses))).toBe(519)
})
