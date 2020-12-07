let rules = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .map( x => x.split(/\sbags\scontain\s|\sbags,\s|\sbag,\s|\sbag\.|\sbags\./)
                                     .slice(0,-1)
                                     .map( x => /\d/.test(x) ? x.split(/(?<=\d)\s/) : x))

const getCanContainArr = (color, rules) => {
  let canContArr = []
  rules.forEach((rule, index) => {
    let ruleArr = []
    ruleArr = rule.slice(1).map( el => el[1])
    if (ruleArr.includes(color)) {
      canContArr.push(rule[0])
    }
  });

  return(
    canContArr
  )
}

const getNum = (color, rules) =>
{
  let colorsArr = getCanContainArr(color, rules);
  let cntOld = 0
  let cntOut = colorsArr.length

  while (cntOut != cntOld) {
    cntOld = cntOut

    colorsArr.forEach((col) => {
      colorsArrNext = getCanContainArr(col, rules);
      colorsArr = [...new Set([...colorsArr, ...colorsArrNext])]
    })

    cntOut = colorsArr.length
  }

  return(cntOut)
}

console.log(getNum('shiny gold', rules))
// console.log(rules)