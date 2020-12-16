const { isNegative } = require('mathjs')

const navs = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                          .split('\n')
                          .filter(v => v)
                          .map( x => x.split(/(?<=^\w)(?=\d+$)/))
                        
let ship = { 
  x: 0,
  y: 0,
  compas: ['N', 'E', 'S', 'W'],
  dir: 'E',
  degree: 90,
  move: (dir, val) => {
    switch (dir) {
      case 'E':
        ship.x += val
        break
      case 'W':
        ship.x -= val
        break
      case 'N':
        ship.y += val
        break
      case 'S':
        ship.y -= val
        break
      case 'F':
        ship.move(ship.dir, val)
        break
      case 'R':
        ship.degree = (ship.degree + val) % 360
        break
      case 'L':
        // console.log(`is negative? ${val} - ${ship.degree}: ${isNegative(val - ship.degree)}`)
        ship.degree = isNegative(ship.degree - val) ? (360 - (val - ship.degree)) : ship.degree - val
        break
      default:
        null
    }
    ship.dir = ship.compas[ship.degree/90]
  }
}

for (let i = 0; i < navs.length; i++){
  // console.log(`Nav: ${navs[i][0]} ${navs[i][1]}`)
  ship.move(navs[i][0], parseInt(navs[i][1]))
  // console.log(ship)
}

console.log(ship)
console.log(Math.abs(ship.x+ship.y))

