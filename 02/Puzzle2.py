import re

with open('input.txt') as f:
  lines = [line.strip() for line in f]

cnt = 0

for line in lines:
  min_max = re.findall('\d+', line)
  letter = re.findall('\w(?=:)', line)[0]
  pswd = re.findall('\w+$', line)[0]
  num_of_occurence = pswd.count(letter)
  pos1 = int(min_max[0]) - 1
  pos2 = int(min_max[1]) - 1
  print(f'{min_max}, {letter}, {pswd}, {num_of_occurence}')

  if (pswd[pos1] == letter and pswd[pos2] != letter) or (pswd[pos1] != letter and pswd[pos2] == letter):
    cnt = cnt + 1

print(cnt)