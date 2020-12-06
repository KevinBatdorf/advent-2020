module.exports = {
    // This joins the array of groups and uses Set to find uniques,
    // ... speads it to an array, then returns the length for each group of answers
    questionsAnswered: answers => answers.map(answer => [...new Set(answer.join(''))].length),
    questionsAnsweredYes: answers =>
        // Cycles over every letter a-z and checks whether that letter is in every set
        answers.map(group =>
            ([...'abcdefghijklmnopqrstuvwxyz']).filter(letter =>
                group.every(g => g.includes(letter))))
}
