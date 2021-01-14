const rules = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                           .split('\n')
                           .map( x => x.split(/\sbags\scontain\s|\sbags,\s|\sbag,\s|\sbag\.|\sbags\./)
                                       .slice(0,-1)
                                       .map( x => /\d/.test(x) ? x.split(/(?<=\d)\s/).reverse() : x)
                                     )
                           .map( x => [...x.slice(0,1), [...x.slice(1)]] )

const getCnt = (bag) => {
  const innerBags = rules.filter(x => x[0] == bag)[0][1]

  if (innerBags == 'no other') {
    return 1
  } else {
    const map = new Map(innerBags)

    let cnt = 0
    for (const [key, value] of map) {
      console.log(`key: value ${key}:${value}`)
      cnt += getCnt(key) * value      
    }
    console.log(`Outside of the loop`)
    return cnt + 1
  }
}


console.log(getCnt('shiny gold', rules) - 1)
