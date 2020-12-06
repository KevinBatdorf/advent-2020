const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { questionsAnswered, questionsAnsweredYes } = require('./day6')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.answers = document.querySelector('pre')
        // Split by line
        .textContent.split('\n\n')
        // Trim and remove new lines, collect by sets of groups
        .map(n => n.split('\n').map(n => n.trim()).filter(Boolean))
        // Remove anytihng falsey
        .filter(Boolean)
})

test('Part 1 - questions answered', async () => {
    expect(questionsAnswered(answers)).toBe(6625)
})

test('Part 2 - Find number of questions every person in a group answered yes', async () => {
    expect(questionsAnsweredYes(answers)).toBe(3360)
})
