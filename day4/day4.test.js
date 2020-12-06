const { beforeAll } = require('@jest/globals')
const fs = require('fs')
const path = require('path')
const source = fs.readFileSync(path.resolve(__dirname, './source.html')).toString()
const { filterPassports, validatePassportFields } = require('./day4')

beforeAll(() => {
    // Grab the list from the webpage itself (mocked)
    document.documentElement.innerHTML = source

    // Grab all the numbers
    window.data = document.querySelector('pre')

        // Split by blank line
        // ['eyr:2029 pid:157374862 byr:1991 ecl:amb hcl:#a97842 hgt:178cm', etc]
        .textContent.split('\n\n')
        // Trim and remove new lines
        .map(n => n.replace(/\n/g, ' ').trim())
})

test('Part 1 - Filter passports', async () => {
    const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    expect(filterPassports(data, requiredKeys).length).toBe(245)
})

test('Part 2 - Can validate deeper', async () => {
    // Start with the above
    const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
    const preliminaryPass = filterPassports(data, requiredKeys, { fillKeyIfMissing: true })

    // I followed Laravel style rules here, plus a custom validator function
    const rules = {
        byr: 'size:4|between:1920,2002',
        iyr: 'size:4|between:2010,2020',
        eyr: 'size:4|between:2020,2030',
        hgt: v => {
            let n = v.slice(0, -2)
            if (v.endsWith('in')) return (59 <= n && n <= 76)
            if (v.endsWith('cm')) return (150 <= n && n <= 193)
            return false
        },
        hcl: 'regex:#[a-zA-Z0-9]{6}',
        ecl: 'in:amb,blu,brn,gry,grn,hzl,oth',
        pid: 'size:9',
        // cid: 'optional', // ended up hard-coding this removal
    }

    expect(validatePassportFields(preliminaryPass, rules).length).toBe(133)
})
