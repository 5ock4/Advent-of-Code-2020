const { e } = require("mathjs");

const init = require("fs")
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((v) => v)
  .map((v) =>
    v.split(" = ").map((v) => {
      if (v == "mask") {
        return ("mask"); 
      } else if (v.slice(0, 3) == "mem") {
        return (v.match(/\d+/)[0])
      } else if (v.length == 36) {
        return v
      } else {
        return (parseInt(v).toString(2).padStart(36,'0'))
      }
    })
  );

const switchBits = (mask, num) => {
  let res = ''
  for (let i = 0; i < mask.length; i++) {
    res = res.concat(mask[i] == 'X' ? num[i] : mask[i])
  }

  return res
}

const convertBinStr2Int = (binStr) => {
  let cnt = 0
  for (let i = (binStr.length - 1); i >= 0; i--){
    if (binStr[i] == 1) {
      cnt += 2**(binStr.length - 1 - i)
    }
  }

  return cnt
}

let mask
let memory = new Map()

for (let i = 0; i < init.length; i++) {
  console.log(`i: ${i}`)
  if (init[i][0] == 'mask') {
    mask = init[i][1]
  } else {
    memory.set(init[i][0], convertBinStr2Int(switchBits(mask, init[i][1])))
  }
}

let sum = 0;
memory.forEach((v) => {
  sum += v;
})
console.log(memory)
console.log(sum)