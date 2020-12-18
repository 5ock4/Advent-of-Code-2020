let instructions = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(val => val)
                         .map(val => val.split(' '))
                         .map(val => [val[0], parseInt(val[1])])

const performOperation = (state) => { 
  if (state.operation == 'acc') {
    state.accumulator += state.opValue
    state.visited[state.pos] += 1
    state.pos += 1
    state.operation = instructions[state.pos][0]
    state.opValue = instructions[state.pos][1]
  } else if (state.operation == 'jmp') {
    state.visited[state.pos] += 1
    state.pos += state.opValue
    state.operation = instructions[state.pos][0]
    state.opValue = instructions[state.pos][1]
  } else if (state.operation == 'nop') {
    state.visited[state.pos] += 1
    state.pos += 1
    state.operation = instructions[state.pos][0]
    state.opValue = instructions[state.pos][1]
  }

  // console.log(state)
  return(state)
}

// TODO: brutal force is enough... check github Befeleme: recursion solution

let i = 0
let highestOcc = 0
let instructionsOld = instructions

while (true) {
  instructions = instructionsOld

  for (i = 0; i < instructions.length; i++) {
    if (i > highestOcc && instructions[i][0] == 'jmp') {
      instructions[i][0] = 'nop'
      highestOcc = i
      console.log(`Changing instruction [${i+1}] to ${instructions[i][0]}`)
      break
    } else if (i > highestOcc && instructions[i][0] == 'nop') {
      instructions[i][0] = 'jmp'
      highestOcc = i
      console.log(`Changing instruction [${i+1}] to ${instructions[i][0]}`)
      break
    }
  }

  state = {
    operation: instructions[0][0],
    opValue: instructions[0][1],
    pos: 0,
    accumulator: 0,
    visited: new Array(instructions.length).fill(0)
  }

  while (!state.visited.includes(2) && state.visited.slice(-1)[0] != 1){
    state = performOperation(state)
  }
  console.log(`state.pos: ${state.pos}`)

  if (state.pos == instructions.length) {
    break
  }
}

console.log(`Accumulator: ${state.accumulator}`)
