const fs = require('fs');
// const util = require('util');

let lines = fs.readFileSync('input.txt', {encoding: 'utf-8'})
              .split('\n\n')
              .map(x => x.split('\n')
                         .map( x => new Set(x))
                         .reduce((a, b) => [...a].filter(x => b.has(x)))) // Intersect the sets of answers
              .map(x => [...x]) // Convert Sets to Array if there is any

let count = lines.map(x => x.length)
                 .reduce((a, b) => a + b, 0)                        

console.log(count)

// console.log(util.inspect(lines, { maxArrayLength: null }))

// fs.writeFileSync('lines.txt', lines.join('\n'))
// fs.writeFileSync('count.txt', count.join('\n'))
// console.log(lines[286])

// let a = new Set([1,2,3]);
// let b = new Set([4,3,2]);
// let intersection = [...a].filter(x => b.has(x));

// console.log(intersection)
// console.log(intersection.length === a.size)