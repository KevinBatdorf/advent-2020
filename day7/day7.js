module.exports = {
findHowManyBags: (rules, bag) => {
    const canBeHeldBy = new Map()
    const holdableBags = new Set()
    rules.map(
        rule => rule
        .replace(/contain |[0-9] /g, '')
        .split(/ bags?./)
        .map(r => r.trim())
        .filter(Boolean)
    )
    .filter(r => !r.includes('no other'))
    .forEach(rule => rule.slice(1).forEach(r => {
        let value = canBeHeldBy.has(r) ? canBeHeldBy.get(r) : new Set()
        value.add(rule[0])
        canBeHeldBy.set(r, value)
    }))
    ;(function findBags(key) {
        canBeHeldBy.has(key) && canBeHeldBy.get(key).forEach(b => holdableBags.add(b) && findBags(b))
    })(bag)

    return holdableBags.size
},

findHowManyBagsNeeded: (rules, bag) => {
    const bagsCanHold = new Map()
    count = 0
    rules.map(
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
            value.push(...Array(parseInt(formula[0], 10)).fill(formula[1]))
        })
        bagsCanHold.set(rule[0], value)
    })
    ;(function findBags(key) {
        bagsCanHold.has(key) && bagsCanHold.get(key).forEach(b => {
            count++
            findBags(b)
        })
    })(bag)
    return count
}
}
