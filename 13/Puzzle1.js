const notes = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                          .split('\n')
                          .filter(v => v)
                          // .map( x => x.split(/(?<=^\w)(?=\d+$)/))
const timestamp = notes[0]
const buses = notes[1].split(',')
                      .filter(v => v != 'x')
                      
const minutes = buses.map(v => parseInt(v) - timestamp % parseInt(v))

console.log(Math.min(...minutes) * buses[minutes.indexOf(Math.min(...minutes))])
console.log(notes)
console.log(timestamp)
console.log(buses)
console.log(minutes)