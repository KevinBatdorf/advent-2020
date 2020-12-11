const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { getFinalValue, valueWithBugFixed } = require('./day8')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the instructions
    window.instructions = document.querySelector('pre')
        // Split by line
        .textContent.split('\n')
        // Trim and remove new lines, collect by sets of groups
        .map(n => n.trim())
        // Remove anytihng falsey
        .filter(Boolean)
        // Break into instructions like [ 'nop', '+0' ]
        .map(i => i.split(' '))
})

test('Part 1 - run the instructions', async () => {
    expect(getFinalValue(instructions)).toBe(1553)
})

test('Part 2 - fix the bug', async () => {
    expect(valueWithBugFixed(instructions)).toBe(1877)
})
