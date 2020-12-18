const input = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                            .split('\n')
                            .filter(v => v)

const inputTst = '1 + (1 + 1 * 3) + (4 * (5 + 6))'

math = {
  '+': (x,y) => x+y,
  '-': (x,y) => x-y,
  '*': (x,y) => x*y,
  '/': (x,y) => x/y,
}

computeString = (str) => {
  // console.log(`str: ${str}`)

  formula = str.split(' ')

  // Calculate result of 3 elements from array and merge into one - from the beginning
  while (formula.length > 1) {
    formula = [
      math[formula[1]](parseInt(formula[0]), parseInt(formula[2])), 
      ...formula.slice(3)
    ]   
  }

  // console.log(`Returning formula: ${formula}`)
  return formula
}

computeFormula = (input) => {
  regex2replace = /\([\d\s\+\-\*\/]+\)/

  while (input.match(regex2replace) != null) {
    // console.log(computeString(input))
    // console.log(computeString(input.match(regex2replace)[0].slice(1,-1)))
    
    input = input.replace(regex2replace, computeString(input.match(regex2replace)[0].slice(1,-1)))
    // console.log(input)
  }

  return computeString(input)
}

console.log(`Result: ${computeFormula(inputTst)}`)

let result = input.map(v => computeFormula(v))
                  .reduce((a, b) => parseInt(a) + parseInt(b))

console.log(result)

