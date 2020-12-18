nums = [12,20,0,6,1,17,7]

let pos = nums.length - 1
while (nums.length < 20) {

  if (nums.slice(0,nums.length-1)
          .includes(nums[pos])) {
    nums.push(pos - nums.slice(0,nums.length-1)
                        .lastIndexOf(nums[pos]))
  } else {
    nums.push(0)
  }
  
  // console.log(nums[pos])
  pos += 1
}

// console.log(nums.slice(-1)[0])
console.log(nums)
