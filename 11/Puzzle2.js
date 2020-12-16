const lodash = require('../node_modules/lodash')
const math = require('../node_modules/mathjs')
const { e, i } = require('mathjs');

// require('util').inspect.defaultOptions.maxArrayLength = null;

let grid = require('fs').readFileSync('input_tst.txt', {encoding: 'utf-8'})
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

    for (let i = 0; i < pos.length; i++) {
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
    // console.log(idxsFound)

    // console.log(`Count for step ${step} is ${cnt}`)
  }

  return cnt
}

const cntHash = (arr) => {
  return arr.map(v => v.filter(v2 => v2 == '#')
                       .reduce(a => a+1, 0))
            .reduce((a,b) => a+b,0)
}

let newGrid = []
let cntGrid = 0
let cntNewGrid = 0

while (true) {

  newGrid = lodash.cloneDeep(grid)
  // console.log(`Old grid: ${grid}`)
  cntGrid = cntHash(grid)

  for (x = 0; x < grid.length; x++){
    for (y = 0; y < grid[0].length; y++){
      if (grid[x][y] == 'L' && (countVisible(x, y, grid, '#') == 0)){
        newGrid[x][y] = '#'
      } else if (grid[x][y] == '#' && (countVisible(x, y, grid, '#') >= 5)) {
        newGrid[x][y] = 'L'
      }
    }
  }

  console.log(`New grid: ${newGrid}`)
  cntNewGrid = cntHash(newGrid)
  
  if (cntNewGrid == cntGrid) {
    break
  }

  grid = lodash.cloneDeep(newGrid)
}

console.log(cntNewGrid)
