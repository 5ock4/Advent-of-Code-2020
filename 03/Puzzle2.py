with open('input.txt') as f:
  map_trees = [line.strip() for line in f]

cnt = 0
max_x = len(map_trees[0])
slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]]
product = 1

for slope in slopes:
  pos_x = 0
  pos_y = 0
  cnt = 0
  while True:
    if map_trees[pos_y][pos_x] == '#':
      cnt += 1
    
    pos_x += slope[0]
    pos_y += slope[1]

    # print(f'pos_x: {pos_x}, pos_y: {pos_y}')
    if pos_x >= max_x:
      pos_x = pos_x - max_x

    if pos_y >= len(map_trees):
      break
  
  print(f'slope: {slope}, cnt: {cnt}')
  product *= cnt

print(product)