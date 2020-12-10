module.exports = {
    findHowManyBags: (rules, bag) => {
        const canBeHeldBy = new Map()
        const holdableBags = new Set()
        rules.map(
            // process the data into ["bag", "can hold"...]
            // where the first bag can be held by any number of bags
            rule => rule
            .replace(/contain |[0-9] /g, '')
            .split(/ bags?./)
            .map(r => r.trim())
            .filter(Boolean)
        )
        .filter(r => !r.includes('no other'))
        // This will create a map of all the bags that can fit into another bag,
        // Think of it as the reverse of the initial state
        .forEach(rule => rule.slice(1).forEach(r => {

            // Using both Map and Set keep the keys unique and lets you count the total
            let value = canBeHeldBy.has(r) ? canBeHeldBy.get(r) : new Set()
            value.add(rule[0])
            canBeHeldBy.set(r, value)
        }))
        // This is recursive. It will run through every bag and continue looking until
        // it finds a bag that can't be inserted into another
        ;(function findBags(key) {
            // if the rules has our bag, then it means it can fit inside something else still
            // It's a fancy one liner, but if key can hold bags, recursively find the bags key can hold, etc
            canBeHeldBy.has(key) && canBeHeldBy.get(key).forEach(b => holdableBags.add(b) && findBags(b))
        })(bag)

        return holdableBags.size
    },

    findHowManyBagsNeeded: (rules, bag) => {
        const bagsCanHold = new Map()
        count = 0
        rules.map(
            // process the data into ["bag", "can hold"...]
            // where the first bag can be held by any number of bags
            rule => rule
            .replace(/contain/g, '')
            .split(/ bags?./)
            .map(r => r.trim())
            .filter(Boolean)
        )
        .filter(r => !r.includes('no other'))
        .forEach(rule => {
            let value = bagsCanHold.has(rule[0]) ? bagsCanHold.get(rule[0]) : []
            rule.slice(1).forEach(r => {
                const formula = r.split(/([0-9])/).filter(Boolean).map(r => r.trim())
                // This creates an array like ['a', 'a', 'a']
                value.push(...Array(parseInt(formula[0], 10)).fill(formula[1]))
            })
            bagsCanHold.set(rule[0], value)
        })

        ;(function findBags(key) {
            // This probably isn't very effecient but it will run through every item
            // A better way would be to track the count how many of each item.
            // This works for tis game though!
            bagsCanHold.has(key) && bagsCanHold.get(key).forEach(b => {
                count++
                findBags(b)
            })
        })(bag)

        return count
    }
}
