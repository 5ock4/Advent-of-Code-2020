const input = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                            .split('\n')
                            .filter(v => v)

math = {
  '+': (x,y) => x+y,
  '-': (x,y) => x-y,
  '*': (x,y) => x*y,
  '/': (x,y) => x/y,
}

computeString = (str) => {
  console.log(`str: ${str}`)

  let formula = str.split(' ')
  let opIdx = 1

  // Calculate result of 3 elements from array and merge into one - from the beginning
  // First compute pluses
  while (formula.includes('+')) {
    // console.log(`Computing +: ${formula}, opIdx: ${opIdx}`)
    if (formula[opIdx] == '+') {
      formula = [
        ...formula.slice(0, opIdx-1),
        math[formula[opIdx]](parseInt(formula[opIdx-1]), parseInt(formula[opIdx+1])), 
        ...formula.slice(opIdx+2)
      ]
      
      opIdx = 1
    } else {
      opIdx += 2
    }
  }

  // Then compute the rest
  while (formula.length > 1) {
    // console.log(`Computing the rest: ${formula}`)
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
    input = input.replace(regex2replace, computeString(input.match(regex2replace)[0].slice(1,-1)))
  }

  return computeString(input)
}

let result = input.map(v => computeFormula(v))
                  .reduce((a, b) => parseInt(a) + parseInt(b))

console.log(result)

