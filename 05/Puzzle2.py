with open('/home/5ock4/advent_of_code/05/input.txt') as f:
  lines = [line.strip() for line in f]

def computeSeatPos(binary_tree):
  d = { 'row_l' : 0, 'row_u' : 127, 'col_l' : 0, 'col_u' : 7 }

  for el in binary_tree:
    row_span = d['row_u']-d['row_l']+1
    col_span = d['col_u']-d['col_l']+1

    d['row_l'] += row_span // 2 if el == 'B' else 0
    d['row_u'] -= row_span // 2 if el == 'F' else 0
    d['col_l'] += col_span // 2 if el == 'R' else 0
    d['col_u'] -= col_span // 2 if el == 'L' else 0

  position = {
    'row' : d['row_l'],
    'col' : d['col_l']
  }

  return position

positions_list = [ computeSeatPos(line) for line in lines ]
positions_IDs = [ pos['row']*8+pos['col'] for pos in positions_list ]

# Sorting list of dictionaries
positions_sorted = sorted(positions_list, key = lambda i: (i['row'], i['col']))

for i, pos in enumerate(positions_sorted):
  next_col = positions_sorted[i+1]['col']

  if (0 <= pos['col'] <= 6 and next_col != pos['col']+1) or \
     pos['col'] == 7 and next_col != 0:
    my_seat_ID = pos['row']*8+pos['col']+1 if pos['row'] == positions_sorted[i+1]['row'] else (pos['row']+1)*8
    break

print(my_seat_ID)