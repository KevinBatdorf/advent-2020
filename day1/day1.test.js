const fs = require('fs')
const path = require('path')
const part1 = fs.readFileSync(path.resolve(__dirname, './a.html')).toString()

test('h', () => {
    document.documentElement.innerHTML = part1

    const numbers = document.querySelector('pre')
        .textContent.split('\n')
        .map(n => parseInt(n, 10))
        .filter(Number)

    const result = numbers
        .filter(n => numbers.includes(2020 - n))
        .reduce((a, b) => a * b, 1)

    expect(result).toBe(805731)
})
