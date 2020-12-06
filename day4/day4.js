module.exports = {

    filterPassports: (passports, requiredKeys, options) => passports.filter(passport => {
        // Pass in passport data, which is an array where each item looks like
        // 'byr:1962 pid:547578491 eyr:2028 ecl:hzl hgt:65in iyr:2013 hcl:#623a2f'
        // Also pass in the required keys

        return (
            // Split by space and : to build something like this:
            // [
            //     [ 'byr', '1999' ],
            //     [ 'ecl', 'hzl' ],
            //     [ 'pid', '813536928' ],
            //     [ 'iyr', '2015' ],
            //     [ 'hcl', '#6b5442' ],
            //     [ 'eyr', '2025' ],
            //     [ 'hgt', '186cm' ]
            //   ]
            passport.split(' ')
                .map(entry => entry.split(':'))

                // Filter out missing keys (ie don't count them)
                .filter(entry => requiredKeys.includes(entry[0]))
                .length
            // Only include passports that have the required length
            ===
            requiredKeys.length
        )
    }),
    validatePassportFields: (passports, rules) => {
        // Convert the simple rules list into callback validator functions
        let validator = module.exports.convertRulesToCallbacks(rules)

        // First split the entry into key:value
        return passports.filter(passport => passport.split(' ')

            // Next split into [key, value]
            .map(entry => entry.split(':'))

            // Hard coded, but you could compute optional fields here
            .filter(entry => entry[0] !== 'cid')

            // Run the validator on every entry. It will resemble ['size', 4]
            .filter(entry => validator[entry[0]].map(cb => {

                    // Allow for custom validator functions
                    if (typeof cb === 'function') {
                        return cb(entry[1])
                    }

                    // Call the callback with the value and test
                    return cb[0](entry[1], cb[1])

                // Make sure all entrie pass
                }).every(v => v === true)
            ).length

            // Finally compare the length of the rules + the length of the valid entries
            ===
            Object.keys(rules).length
        )
    },
    convertRulesToCallbacks: rules => {
        // Map over each rule to create a callback
        const validator = Object.entries(rules).map(rule => {

            // If a callback was supplied, use that
            if (typeof rule[1] === 'function') {
                rule[1] = [rule[1]]
                return rule
            }
            // Set up validation rules, v = value, t = test
            const validations = {
                size: (v, t) => String(v).length == t,
                between: (v, t) => {
                    let edge = t.split(',')
                    return edge[0] <= v && v <= edge[1]
                },
                regex: (v, t) => RegExp(t).test(v),
                in: (v, t) => t.split(',').includes(v),
                optional: () => true,
            }

            // Compute the rule 'size:4|in:a,b,c' becomes
            // [['size', 4], ['in', 'a,b,c']]
            rule[1] = rule[1]
                .split('|')
                .map(r => r.split(':'))
                .map(c => {
                    c[0] = validations[c[0]]
                    return c
                })
            return rule
        })
        return Object.fromEntries(validator)
    }
}
