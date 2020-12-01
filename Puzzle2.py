with open('input.txt') as f:
  nums = [int(line) for line in f]
  for i in nums:
    for j in nums:
      for k in nums:
        if i + j + k == 2020:
          print(i * j * k)
          exit()