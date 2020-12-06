module.exports = {
    getSeatIDs: boardingPasses => boardingPasses.map(pass => {
        let rows = Array.from({ length: 128 }, (_, i) => i)
        let columns = Array.from({ length: 8 }, (_, i) => i)
        const formula = [pass.slice(0, 7), pass.slice(7)]

        // Slice the first part of the bording pass
        formula[0].split('').forEach(section => {

            // Slice until you reach the end
            rows = rows.slice(

                // Slice works differently depending on what's passed in
                section === 'F' ? 0 : rows.length / 2,
                section === 'F' ? rows.length / 2 : undefined,
            )
        })
        // Same as above but for the row
        formula[1].split('').forEach(section => {
            columns = columns.slice(
                section === 'L' ? 0 : columns.length / 2,
                section === 'L' ? columns.length / 2 : undefined,
            )
        })

        // Formula provided by the game
        return rows[0] * 8 + columns[0]
    }),

    findMissingSeat: seats => {
        // Sort the seats in order
        let missing = seats.sort((a, b) => a - b)

        // Create an array of the same length
        // We're assuming only one seat is missing in the middle
        let full = Array.from({length: missing.length}, (_v, i) => i + missing[0])

        // Now just check the full array for the missing number
        return full.filter(seat => !missing.includes(seat))[0]
    }
}
