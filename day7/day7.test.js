const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { findHowManyBags, findHowManyBagsNeeded } = require('./day7')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the rukes
    window.rules = document.querySelector('pre')
        // Split by line
        .textContent.split('\n')
        // Trim and remove new lines, collect by sets of groups
        .map(n => n.trim())
        // Remove anytihng falsey
        .filter(Boolean)
})

test('Part 1 - Find how many bag options', async () => {
    expect(findHowManyBags(rules, 'shiny gold')).toBe(378)
})

test('Part 2 - Find total number of bags required', async () => {
    expect(findHowManyBagsNeeded(rules, 'shiny gold')).toBe(27526)
})
