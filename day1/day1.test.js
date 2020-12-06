const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { two2020, three2020 } = require('./day1')

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

test('Part 1 - Find two numbers that sum to 2020 and multiply them', async () => {
    expect(two2020(numbers)).toBe(805731)
})

test('Part 2 - Find three numbers that sum to 2020 and multiply them', async () => {
    expect(three2020(numbers)).toBe(192684960)
})
