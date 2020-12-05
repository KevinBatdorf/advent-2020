module.exports = {
    two2020: numbers => {
        return numbers
            // This will cycle through each number a and check whether another number
            // "2020 - n" exists. If it does, we have a match
            .filter(n => numbers.includes(2020 - n))
            // This will multiply all numbers in an array
            .reduce((a, b) => a * b, 1)
    },
    three2020: numbers => {
        // Uses the same logic as the first part, but considers the third number
        const findRemaining = single => numbers
            .filter(n => numbers.includes(2020 - single - n))

        // This will cycle through every number n
        return numbers.filter(number => {
            // Then check whether "2020 - n" can fit into the pattern from part 1
            const remaining = findRemaining(number)
            // This checks whether something was found
            return remaining.length ? remaining : false
        })
        // Multiplies everything together
        .reduce((a, b) => a * b, 1)
    }
}
