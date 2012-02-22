stdin = process.openStdin()
stdin.setEncoding 'utf8'
trees = []
rows = 10
columns = 20
char = 
  x:0
  y:0

roundom = (int)-> Math.ceil Math.random()*int

populateTrees = ->
  for whatever in [0..20]
    trees.push 
      x: roundom columns
      y: roundom rows

populateTrees()

drawTree = (tree)-> table[tree.y][tree.x] = "&"

makeTable = ->
  table = []
  for y in [0..rows]
    table[y] = []
    table[y].push(".") for x in [0..columns] 
  table

table = makeTable()

logString = (string)->
  console.log "\u001B[2J\u001B[0;0f#{string}"

logTable = ->
  string = ''
  for row in table
    string += '\n'
    string += cell for cell in row
  logString string

moveChar = (input)->
  modifyChar input
  edgeDetection()


edgeDetection = ->
  char.x = 0 if char.x > columns
  char.x = columns if char.x < 0
  char.y = 0 if char.y > rows
  char.y = rows if char.y < 0

modifyChar = (input)->
  char.y -= 1 if input is "w" and table[char.y - 1][char.x] isnt "&"
  char.y += 1 if input is "s" and table[char.y + 1][char.x] isnt "&"
  char.x -= 1 if input is "a" and table[char.y][char.x - 1] isnt "&"
  char.x += 1 if input is "d" and table[char.y][char.x + 1] isnt "&"

render = (input)->
  drawTree tree for tree in trees
  table[char.y][char.x] = "."
  moveChar input[0]
  table[char.y][char.x] = "@"
  logTable()

stdin.on 'data', (input)-> render(input)