let nums = new Map([
  [12, 0],
  [20, 1],
  [0, 2],
  [6, 3],
  [1, 4],
  [17, 5]
  // [7, 6]
])

let pos = 6
nextNum = 7

getKey = (map, val) => {
  return [...map].find(([key, value]) => val === value)[0]
}
lastEl = getKey(nums, Math.max(...nums.values()))

while (pos < 30000000) {
  if (nums.has(nextNum)) {
    oldPos = nums.get(nextNum)
    nums.set(nextNum, pos)
    nextNum = pos - oldPos
  } else {
    nums.set(nextNum, pos)
    nextNum = 0
  }

  pos++
}

console.log(nums.size)
console.log(getKey(nums, pos-1))