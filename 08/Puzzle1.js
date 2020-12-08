let instructions = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(val => val)
                         .map(val => val.split(' '))
                         .map(val => [val[0], parseInt(val[1])])
                         

state = {
  operation: instructions[0][0],
  opValue: instructions[0][1],
  pos: 0,
  accumulator: 0,
  visited: new Array(instructions.length).fill(0)
}

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

  return(state)
}

while (!state.visited.includes(2)){
  state = performOperation(state)
}

console.log(state.accumulator)