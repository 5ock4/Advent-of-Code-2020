math = require('./node_modules/mathjs')

// console.log( math.combinations(5,5) +
// math.combinations(5,4) + 
// math.combinations(5,3) +
// math.combinations(5,2) +
// math.combinations(5,1) +
// math.combinations(5,0))

// console.log( math.combinations(3,3) +
// math.combinations(3,2) +
// math.combinations(3,1) +
// math.combinations(3,0) )

// console.log( math.combinations(4,4) +
// math.combinations(4,3) +
// math.combinations(4,2) +
// math.combinations(4,1) +
// math.combinations(4,0) )


function fibonacci(num) {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
}


const getNumOfExludedComb = (arrLength) => {
 let arr = [0]

 while (arr.length < arrLength-1) {
  arr.push(arr[arr.length-1]*2+1)
 }

 return arr.slice(-1)[0]
}

const getCombAll = (num) => {
  let res = 0
  for (i = 0; i <= num; i++) {
     res += math.combinations(num, i)
  }

  return res
}

console.log(getNumOfExludedComb(3))

console.log(`${getCombAll(7)} ${getCombAll(11)} ... ${getCombAll(18)}`)

