const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { findTheTrees, checkMultiplePaths, multiply } = require('./day3')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.data = document.querySelector('pre')
        // Split by new line
        .textContent.split('\n')
        // Trim and create array, like ['.........#..##..#..#........#..', etc]
        .map(n => n.trim())
})

test('Part 1 - Can count trees', async () => {
    expect(findTheTrees(data, 3).length).toBe(156)
})

test('Part 2 - Can count multiple paths', async () => {

    // This is set up like 1 right, 1 down, or 7 right, 1 down
    const instructions = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ]
    expect(multiply(checkMultiplePaths(data, instructions))).toBe(3521829480)
})
