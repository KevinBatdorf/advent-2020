module.exports = {
    // This joins the array of groups and uses Set to find uniques,
    // ... speads it to an array, then returns the length for each group of answers
    questionsAnswered: answers =>
        answers.map(answer => new Set(answer.join('')).size)
            // Add them all together
            .reduce((prev, next) => prev + next),
    questionsAnsweredYes: answers =>
        // Cycles over every letter a-z and checks whether that letter is in every set
        answers.map(group =>
            ([...'abcdefghijklmnopqrstuvwxyz']).filter(letter =>
                group.every(g => g.includes(letter))))
                    // Count how many
                    .map(a => a.length)
                    // Add them all together
                    .reduce((accumulator, next) => accumulator + next)
}
