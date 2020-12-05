module.exports = {
    // [ '4-7', 'z', 'zzzfzlzzz' ] - Expect a record like this
    validPasswords: data => data.filter(data => {
        let [rule, code, password] = data

        // 4-7 into [4, 7]
        let bounds = rule.split('-').map(c => parseInt(c, 10))

        // Will count z from zzzfzlzzz and produce 7
        let count = password.split('').reduce((total, next) => total +(code === next), 0)

        // Will turn [4, 7] into [4, 5, 6, 7]
        let range = (start, end) => {
            return Array.from({ length: (end - start + 1) }, (_, i) => (i + start))
        }

        // Will look like [4, 5, 6, 7].includes(7)
        return range(...bounds).includes(count)
    }),

    validatePasswordsNew: data => data.filter(data => {
        let [rule, code, password] = data

        // 4-7 into [4, 7]
        let bounds = rule.split('-').map(c => parseInt(c, 10))

        // Will count z from zzzfzlzzz and produce 7
        let places = password.split('')
        let options = [places[bounds[0] - 1], places[bounds[1] - 1]]

        // If it's neither
        if (!options.includes(code)) {
            return false
        }

        // The two options are the same, ['n', 'n']
        if (options.slice(1).reduce((a,b) => a === b, options[0])) {
            return false
        }

        // It's in there!
        return true
    }),

}
