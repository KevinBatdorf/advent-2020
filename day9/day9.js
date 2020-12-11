module.exports = {
    partOne: (data, preamble) => {
        return data.reduce((accumulator, next) => {

            // If we have a number already, just return the accumulator
            // This could be more effeciently done.
            if (!Array.isArray(accumulator)) return accumulator

            // We need at least 25 (preamble from the game) in our set
            if (accumulator.length < preamble) {
                accumulator.push(next)
                return accumulator
            }

            // Loop through every preamble set
            if (accumulator.reduce((_a, _b, i, source) => {
                // Check whether there is a number in the source that equals the
                // next number we are testing minus another source number
                return source.filter(s => source.includes((next - Number(s)).toString())).length
            })) {
                // If so, then continue on and push/unshift the next number in series
                accumulator.push(next)
                return accumulator.slice(1)
            }

            // If the above test failed, then we have our number
            return Number(next)
        }, [])
    },

    partTwo: (data, preamble) => {
        const target = module.exports.partOne(data, preamble)
        let range = []

        // Use .some here to short circuit as soon as we find a match
        data.some((number, index) => {
            let total = 0

            // If it happens to be the target number, ignore it
            if (Number(number) === target) return false

            // cycle through every number starting at the next number from the parent loop
            return data.slice(index).some((n, i) => {

                // Keep track of the total
                total = Number(total) + Number(n)

                // If we find the total, set the range so we can later compute
                // filter the lowest and highest
                if (total === target) {
                    range = [index, index + i]
                    return true
                }
            })
        })
        // Create an array of the values, then add the lowest and highest
        let numbers = data.slice(range[0], range[1] + 1)
        return Math.max(...numbers) + Math.min(...numbers)
    }
}
