let nums = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                        .split('\n')
                        .filter(v => v)
                        .map(v => parseInt(v))

let sums = []

for (i = 25; i < nums.length; i++){
  sums = nums.slice(i-25, i)
  sums = sums.flatMap(
    (v, i) => sums.slice(i+1).map( w => v + w )
  )

  if (!sums.includes(nums[i])) {
    console.log(nums[i])
    break
  }
}


// sums = nums.slice(0, 25)

// sums = sums.flatMap((v, i) => sums.slice(i+1).map( w => v + w ))
// console.log(sums)