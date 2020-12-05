import json

with open('/home/5ock4/advent_of_code/05/input.txt') as f:
  lines = [line.strip() for line in f]

def computeSeatPos(binary_tree):
  d = { 'row_l' : 0,
        'row_u' : 127,
        'col_l' : 0,
        'col_u' : 7 }

  for el in binary_tree:
    row_span = d['row_u']-d['row_l']+1
    col_span = d['col_u']-d['col_l']+1

    d['row_l'] += row_span // 2 if el == 'B' else 0
    d['row_u'] -= row_span // 2 if el == 'F' else 0
    d['col_l'] += col_span // 2 if el == 'R' else 0
    d['col_u'] -= col_span // 2 if el == 'L' else 0

    # print(json.dumps(d))

  position = {
    'row' : d['row_l'],
    'col' : d['col_l']
  }

  return position

positions_list = [ computeSeatPos(line) for line in lines ]
positions_IDs = [ pos['row']*8+pos['col'] for pos in positions_list]

print(max(positions_IDs))