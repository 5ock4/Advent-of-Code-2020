import re

with open('./input.txt') as f:
  lines = [line.strip() for line in f]

def isValid(fields):
  VALID_FIELDS = {'byr','iyr','eyr','hgt','hcl','ecl','pid','cid'}
  OPTIONAL = {'cid'}

  if (VALID_FIELDS - OPTIONAL).issubset(set(fields)):
    return True
  return False


fields = []
cnt = 0
passports_cnt = 0
num_of_lines = len(lines)

for i in range(num_of_lines):
  fields.extend(re.findall('\w+(?=:)', lines[i]))

  if len(lines[i]) == 0 or i == num_of_lines-1:
    if isValid(fields):
      cnt += 1
      print(f'Valid fields: {fields}')
    else:
      print(f'Invalid fields: {fields}')
    fields = []
    passports_cnt += 1
    

print(f'Passports count: {passports_cnt}, Valids cnt: {cnt}')