import re, json

with open('/home/5ock4/advent_of_code/04/input.txt') as f:
  lines = [line.strip() for line in f]

fields_list = []
fields_values_list = []
fields_dict = {}
cnt = 0
passports_cnt = 0
num_of_lines = len(lines)

def isValid(fields_list):
  VALID_FIELDS = {'byr','iyr','eyr','hgt','hcl','ecl','pid','cid'}
  OPTIONAL = {'cid'}

  if (VALID_FIELDS - OPTIONAL).issubset(set(fields_list)):
    return True
  return False

def isContentValid(fields_dict):
  is_valid = True

  for key in fields_dict:
    if key == 'byr':
      if not(re.search('^\d{4}$',fields_dict[key]) and 1920 <= int(fields_dict[key]) <= 2002):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'iyr':
      if not(re.search('^\d{4}$',fields_dict[key]) and 2010 <= int(fields_dict[key]) <= 2020):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'eyr':
      if not(re.search('^\d{4}$',fields_dict[key]) and 2020 <= int(fields_dict[key]) <= 2030):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'hgt':
      if not(re.search('\d+(in|cm)',fields_dict[key]) and \
        (( fields_dict[key][-2:] == 'cm' and 150 <= int(re.findall('\d+', fields_dict[key])[0]) <= 193) or \
        ( fields_dict[key][-2:] == 'in' and 59 <= int(re.findall('\d+', fields_dict[key])[0]) <= 76))):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'hcl':
      if not(re.search('#([0-9]|[a-f]){6}', fields_dict[key])):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'ecl': 
      if not(re.search('amb|blu|brn|gry|grn|hzl|oth',fields_dict[key])):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

    if key == 'pid':
      if not(re.search('^\d{9}$',fields_dict[key])):
        is_valid = False
        print(f"{key} : {fields_dict[key]} is not valid")
        break

  return is_valid


def convertListsToDict(list1, list2):
  dict = {}
  for i in range(len(list1)):
    
    dict.update({list1[i]:list2[i]})

  return dict


for i in range(num_of_lines):
  fields_list.extend(re.findall('\w+(?=:)', lines[i]))
  fields_values_list.extend(re.findall('(?<=:)\S+', lines[i]))
  fields_dict = convertListsToDict(fields_list, fields_values_list)

  if len(lines[i]) == 0 or i == num_of_lines-1:
    if isValid(fields_list) and isContentValid(fields_dict):
      cnt += 1
      print(f'Valid fields: {json.dumps(fields_dict)}')
    else:
      print(f'Invalid fields: {json.dumps(fields_dict)}')

    fields_list = []
    fields_values_list = []
    fields_dict = {}
    passports_cnt += 1
    
print(json.dumps(fields_dict))
print(f'Passports count: {passports_cnt}, Valids cnt: {cnt}')