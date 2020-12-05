module.exports = {
    findTheTrees: (data, right, down = 1) => {
        let column = 0
        let items = []
        data.forEach((path, row) => {
            // Split the path into an array of individual pieces ['.', '#', etc]
            let pieces = path.split('')

            // If we are beyond the path, cycle to the next row
            if (column >= pieces.length) {
                column = column - pieces.length
            }

            // Fancy operator that says down is a multiple of row
            const onTheRightRow = !(row % down)

            // If there is a row (we don't cound row 0, the first row)
            // then add the current piece to our collection
            if (row && onTheRightRow) {
                row && items.push(pieces[column])
            }

            // The rules say to move right three places
            // Only move if we are on the correct row
            column = onTheRightRow ? column + right : column
        })

        // Filter out only trees
        return items.filter(piece => piece === '#')
    },
    checkMultiplePaths: (data, instructions = []) => {
        // Essentially this is just part A but with multiple paths.
        // So run it through the above function and return the collection
        let guide = []
        instructions.forEach(set => {
            guide.push(module.exports.findTheTrees(data, ...set).length)
        })
        return guide
    },
    multiply: (numbers) => numbers.reduce((prev, next) => prev * next)
}
