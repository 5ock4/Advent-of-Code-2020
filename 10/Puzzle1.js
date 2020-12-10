require('util').inspect.defaultOptions.maxArrayLength = null;
let jolts = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(v => v)
                         .map(v => parseInt(v))
                         .sort((a, b) => a-b)
                         
// Add 0 jolt of socket and max+3 for device    
jolts.unshift(0)
jolts.push(Math.max(...jolts)+3)

let counts = jolts.map((v, i) => v - jolts[i-1])
                  .filter(v => v)

let ones = counts.reduce(((a, b) => a += 1 ? b == 1 : a += 0), 0) // Initial value (2nd argument) must be 0
let threes = counts.reduce(((a, b) => a += 1 ? b == 3 : a += 0), 0) // Initial value (2nd argument) must be 0

console.log(ones)
console.log(threes)
console.log(ones*threes)