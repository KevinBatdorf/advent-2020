const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { validPasswords, validatePasswordsNew } = require('./day2')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.data = document.querySelector('pre')
        // Split by new line
        .textContent.split('\n')
        // Trim and create array of arrays [ '4-7', 'z', 'zzzfzlzzz' ], remove falsey items
        .map(n => n.trim().replace(':', '').split(' ').filter(Boolean))
        // Filter out empty arrays
        .filter(a => a.length)
})

test('Part 1 - valid passwords', async () => {
    expect(validPasswords(data).length).toBe(396)
})

test('Part 2 - ', async () => {
    expect(validatePasswordsNew(data).length).toBe(428)
})
