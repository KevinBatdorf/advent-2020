module.exports = {
    // This joins the array of groups and uses Set to find uniques.
    // We care about the length/size of unique values
    questionsAnswered: answers =>
        answers.map(answer => new Set(answer.join('')).size)

            // Add them all together
            .reduce((prev, next) => prev + next),
    
    // This is part two
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
