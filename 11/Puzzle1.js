const lodash = require('../node_modules/lodash')
const { e, i } = require('mathjs');

// require('util').inspect.defaultOptions.maxArrayLength = null;

let grid = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(v => v)
                         .map( v => v.split(''))

const countAdjacent = (x, y, grid, symbol) => {
  let cnt = 0
  // console.log(`${x} ${y}`)

  try { cnt += 1 ? grid[x-1][y] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x+1][y] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x][y-1] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x][y+1] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x-1][y-1] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x-1][y+1] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x+1][y-1] == symbol : 0 } catch (err){ cnt += 0 }
  try { cnt += 1 ? grid[x+1][y+1] == symbol : 0 } catch (err){ cnt += 0 }

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
  console.log(`Old grid: ${grid}`)
  cntGrid = cntHash(grid)

  for (x = 0; x < grid.length; x++){
    for (y = 0; y < grid[0].length; y++){
      if (grid[x][y] == 'L' && (countAdjacent(x, y, grid, '#') == 0)){
        newGrid[x][y] = '#'
      } else if (grid[x][y] == '#' && (countAdjacent(x, y, grid, '#') >= 4)) {
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
