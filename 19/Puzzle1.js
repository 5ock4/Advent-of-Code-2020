const fs = require('fs')

const { min } = require('lodash')
const input = fs.readFileSync('input.txt', {encoding: 'utf-8'})
                .split('\n')

// TODO: rewrite this to array of arrays
let rules = input.filter(v => v.match(/\d/) != null)
                 .map(v => v.replace(/"/g,'').split(': '))
                 .sort((a, b) => a[0] - b[0])
                 .map(v => v[1].split(' '))
fs.writeFile('output_ordered_rules.txt', JSON.stringify(rules, null, 1), (err) => {
                  if (err) return console.log(err)
                  console.log('rules > output.txt')
                })
// console.log(rules)

let messages = input.filter(v => v.match(/\d/) == null && v != '')

let toTranslateMap = new Map()
let finishedMap = new Map()
let finishedRules = []
// Way to check if list has any duplicates (set removes duplicates):
// (new Set(rules)).size !== rules.length
translateRule = (ruleStr, map) => {
  let regex = new RegExp([...map.keys()].map(v => '\\s'+v+'\\s').join('|'))
  // console.log(regex)
  if (regex.test(ruleStr)) {
    // console.log(`Translating rule <${ruleStr}> with map`)
    // console.log(map)
    map.forEach((val, key) => ruleStr = ruleStr.replace(new RegExp(key, 'g'), val))
    // console.log(`to: <${ruleStr}>`)
  } 
  // else if (!/\d/.test(ruleStr) && !ruleStr.match(/\(/)) {
  //   // console.log(`Finishing rule <${ruleStr}>`)
  //   ruleStr = '(' + ruleStr.replace(/\s/g,'') + ')'
  //   // console.log(`to: <${ruleStr}>`)
  // } else {
  //   // console.log(`Skipping rule <${ruleStr}>`)
  // }

  return ruleStr
}

finishRule = (ruleStr, idx) => {
  if (!/\d/.test(ruleStr) && !finishedRules.includes(idx)) {
    // console.log(`Finishing rule <${ruleStr}>`)
    ruleStr = '(' + ruleStr.replace(/\s/g,'') + ')'
    finishedRules.push(idx)
  }

  return ruleStr
}

while (rules.filter(v => v.match(/\d/) != null).length != 0 ) {
  for (let i = 0; i < rules.length; i++) {
    // console.log(`rules[i]: ${rules[i]}`)

    if (rules[i].match(/\d/) == null && !finishedMap.has(i)) {
      toTranslateMap.set(i, rules[i])
    }
  }
  if (toTranslateMap.size == 0) {
    fs.writeFile('output.txt', JSON.stringify(rules, null, 1), (err) => {
      if (err) return console.log(err)
      console.log('rules > output.txt')
    })
    break
  }
  
  rules = rules.map(v => translateRule(v, toTranslateMap))
               .map((v, i) => finishRule(v, i))
  finishedMap = new Map([...finishedMap,...toTranslateMap])
  toTranslateMap = new Map()

  console.log(rules.filter(v => v.match(/\d/) != null).length)
}

let regexRule = '^'+rules[0]+'$'
// Count matching rules
let cnt = messages.filter(v => v.match(new RegExp(regexRule, 'g'))).length

// console.log(cnt)
// console.log(rules)