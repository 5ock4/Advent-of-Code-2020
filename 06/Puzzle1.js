const fs = require('fs');

let lines = fs.readFileSync('input.txt', {encoding: 'utf-8'})
              .split('\n\n')
              .map(x => x.replace(/[\n]+/g, ''))
              .map(x => String.prototype.concat(...new Set(x)))

let count = lines.map(x => x.length)
                 .reduce((a, b) => a + b, 0)
                 
console.log(count)