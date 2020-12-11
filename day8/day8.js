module.exports = {
    getFinalValue: instructions => {
        return module.exports.processInstructions(instructions).total
    },

    valueWithBugFixed: instructions => {
        let testedValueIndex = -1
        let results = module.exports.processInstructions(instructions)

        function bugRepair(instructions) {
            let indexToTryAndReplace = instructions

                // For now just find the instructions
                .map(instruction => instruction[0])

                // We are looking for 'nop' or 'jmp' and want to ensure we havent tried it yet
                .findIndex((instruction, index) => ['nop', 'jmp'].includes(instruction) && index > testedValueIndex)

            // Set this index as tested so we can skip it next time
            testedValueIndex = indexToTryAndReplace

            // Do the actual replacement
            instructions[indexToTryAndReplace][0] =
                instructions[indexToTryAndReplace][0] === 'nop' ? 'jmp' : 'nop'
            return instructions
        }

        // Continue to replace the instructions with the patch until we find a winner
        while(instructions.length !== results.index) {
            // Splice in the map will clone the array so we don't alter the reference
            results = module.exports.processInstructions(bugRepair(instructions.map(i => i.slice(0))))
        }
        return results.total
    },

    processInstructions: instructions => {
        const instructionsRun = new Set()
        let index = 0
        let total = 0

        // As long as we have an instruction to run, and it hasn't yet been run
        while (!instructionsRun.has(index) && instructions[index]) {
            instructionsRun.add(index)
            let current = instructions[index]
            switch (current[0]) {
                case 'acc':
                    total = (new Function(`return ${total}${current[1]}`))()
                    index++
                    break
                case 'jmp':
                    index = (new Function(`return ${index}${current[1]}`))()
                    break
                default: index++
            }
        }
        return { total, index }
    }
}
