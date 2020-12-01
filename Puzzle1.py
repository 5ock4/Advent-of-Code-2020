with open('input.txt') as f:
  nums = [int(line) for line in f]
  for i in nums:
    for j in nums:
        if i + j == 2020:
          print(i * j)
          exit()