let rules = require('fs').readFileSync('input.txt', {encoding: 'utf-8'})
                         .split('\n')
                         .map( x => x.split(/\sbags\scontain\s|\sbags,\s|\sbag,\s|\sbag\.|\sbags\./)
                                     .slice(0,-1)
                                     .map( x => /\d/.test(x) ? x.split(/(?<=\d)\s/) : x))


let bagsOut = ['shiny gold']
let bags = rules.filter(val => val[0] == 'shiny gold')[0]
                .filter(val => Array.isArray(val))
                .map(val => val[1])
bagsOut = bagsOut.concat(bags)
bagsOld = []

while (bagsOut.length != bagsOld.length) {
  bagsOld = bagsOut

  bags.forEach(elem => {
    bags = rules.filter(val => val[0] == elem)[0]
                .filter(val => Array.isArray(val))
                .map(val => val[1])
    bagsOut = bagsOut.concat(bags)
  });
}

bagsWithCnt = rules.filter(val => bagsOut.includes(val[0])) // only 17 out of 24???
bagsBottom = bagsWithCnt.filter(val => val[1] == 'no other')
                        .map(val => val[0])

console.log(bagsBottom)
finalCnt = 0

bagsBottom.forEach(element => {

  let innerBag = element
  let OldCnt = 0
  let NewCnt = 1
  while (OldCnt != NewCnt) {
    OldCnt = NewCnt

    bagsWithCnt.forEach(ele1 => {
      ele1.slice(1).forEach(ele2 => {
        if (ele2[1] == innerBag) {
          console.log(`${ele1[0]} -> ${ele2[1]} ${ele2[0]}`)
          NewCnt *= parseInt(ele2[0])
          innerBag = ele1[0]
        }
      })
    })
  }
  console.log(`Count of branch: ${NewCnt}`)

  finalCnt += NewCnt
});

console.log(`Total cnt : ${finalCnt}+5`)