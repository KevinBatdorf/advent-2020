const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { partOne, partTwo } = require('./day9')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the rukes
    window.data = document.querySelector('pre')
        // Split by line
        .textContent.split('\n')
        // Trim and remove new lines, collect by sets of groups
        .map(n => n.trim())
        // Remove anytihng falsey
        .filter(Boolean)
})

test('Part 1 - Find first incorrect number', async () => {
    expect(partOne(data, 25)).toBe(756008079)
})

test('Part 2 - fix the bug', async () => {
    expect(partTwo(data, 25)).toBe(93727241)
})
