const { forEach } = require('mathjs');

math = require('../node_modules/mathjs')

require('util').inspect.defaultOptions.maxArrayLength = null;
let jolts = require('fs').readFileSync('input_tst1.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .filter(v => v)
                         .map(v => parseInt(v))
                         .sort((a, b) => a-b)

// Reduce dataset
const reduceDataset = (jolts) => {
  let joltsReduced = [...jolts] // We must use spread to clone an array!
  let index = 0

  for (i = 0; i<jolts.length;i++) {
    // console.log(`Prev/curr/next jolt: ${jolts[i-1]}/${jolts[i]}/${jolts[i+1]}`)
    // console.log(`jolts[i+1]-3: ${jolts[i+1]-3}, jolts[i-1]+3: ${jolts[i-1]+3}`)
    
    if (jolts[i] == jolts[i+1]-3 || jolts[i] == jolts[i-1]+3) {
      index = joltsReduced.indexOf(jolts[i])
      // console.log(`Removing element ${jolts[i]} from array, index: ${index}`)
      joltsReduced.splice(index, 1)
    }
  }

  return joltsReduced
}

// Split array to chunks of consecutive numbers
const splitArray = (arr) => {
  let arrLoc = [...arr]// WTF does not arr behavie as local var?
  let chunk = []
  let resArr = []
  let i = 0

  while (arrLoc.length != 0){
    console.log(`arrLoc.length: ${arrLoc.length}`)
    while (true) {
      console.log(`${arrLoc[i]+1} /// ${arrLoc[i+1]}`)
      chunk.push(arrLoc[i])

      if (arrLoc[i]+1 != arrLoc[i+1]) {
        arrLoc.splice(0, i+1)
        resArr.push(chunk)
        chunk = []
        i = 0
        break
      }

      i += 1
    }
  } 
  console.log(arrLoc)
  return resArr
}

// Calculate combination of each subset seperately
const getCombAll = (num) => {
  let res = 0
  for (i = 0; i <= num; i++) {
     res += math.combinations(num, i)
  }

  return res
}
const getNumOfExludedComb = (arrLength) => {
  let arr = [0]
 
  while (arr.length < arrLength-1) {
   arr.push(arr[arr.length-1]*2+1)
  }

  return arr.slice(-1)[0]
}

// Calculate number of possible combinations
let reducedJolts = reduceDataset(jolts)
let reduceJoltsSplit = splitArray(reducedJolts)
let cnt = reduceJoltsSplit.map(v => getCombAll(v.length)-getNumOfExludedComb(v.length))
                          .reduce((a, b) => a*b)


console.log(jolts)
console.log(reducedJolts)
console.log(reduceJoltsSplit)
console.log(cnt)