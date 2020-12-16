const lodash = require('../node_modules/lodash')
const math = require('../node_modules/mathjs')

// require('util').inspect.defaultOptions.maxArrayLength = null;

let grid = require('fs').readFileSync('input_tst2.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(v => v)
                         .map( v => v.split(''))

const countVisible = (x, y, grid, symbol) => {
  let cnt = 0
  let posBuffer = []
  let idxsFound = []

  for (step = 1; step < math.max([grid.length, grid[0].length]); step++) {
    let pos = [[x-step,y],
              [x+step,y],
              [x,y-step],
              [x,y+step],
              [x-step,y-step],
              [x-step,y+step],
              [x+step,y-step],
              [x+step,y+step]]

    for (i = 0; i < pos.length; i++) {
      if (!idxsFound.includes(i)) {
        try { 
          // console.log(`Checking position grid[${pos[i][0]}][${pos[i][1]}]: ${grid[pos[i][0]][pos[i][1]]}`)
          if (grid[pos[i][0]][pos[i][1]] == symbol) {
            cnt += 1
            idxsFound.push(i)
          }
        } catch (err){ 
          cnt += 0 
        }
      }
    }
    console.log(idxsFound)

    console.log(`Count for step ${step} is ${cnt}`)
  }

  return cnt
}


// console.log(grid)
console.log(grid[4][3])
console.log(countVisible(4,3,grid,'#'))