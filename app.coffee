stdin = process.openStdin()
stdin.setEncoding 'utf8'

#utils

logString = (string)-> console.log "\u001B[2J\u001B[0;0f#{string}"
roundom = (int)-> Math.ceil Math.random()*int

class Table
  constructor:->
    @rows = 10
    @columns = 20
    @arr = []
    for y in [0..@rows]
      @arr[y] = []
      @arr[y].push(" ") for x in [0..@columns]
  
  draw: ->
    string = ''
    for row in @arr
      string += '\n'
      string += cell for cell in row
    logString string

  get: (x,y)-> @arr[x][y]

  set: (x,y, val)-> @arr[y][x] = val

class Tree
  constructor: ->
    @x = roundom table.columns
    @y = roundom table.rows

  draw: -> table.set @x, @y, "↟"

class Trees
  arr: []
  constructor: -> @arr.push new Tree for i in [0..20]
  draw: -> tree.draw() for tree in @arr

class Enemy
  constructor: ->
    @x = 4
    @y = 4
  draw: -> 
    table.set @x, @y, " "
    @move()
    @edgeDetection()
    table.set @x, @y, 'ఈ'
  edgeDetection: ->
    @x = 0 if @x > table.columns
    @x = table.columns if @x < 0
    @y = 0 if @y > table.rows
    @y = table.rows if @y < 0

  move: (input)->
    @y -= 1
    @x += 1

class Character
  constructor: ->
    @x = 0
    @y = 0

  draw: (input)->
    table.set @x, @y, " "
    @move input
    @edgeDetection()
    table.set @x, @y, "⚲"

  edgeDetection: ->
    @x = 0 if @x > table.columns
    @x = table.columns if @x < 0
    @y = 0 if @y > table.rows
    @y = table.rows if @y < 0

  move: (input)->
    @y -= 1 if input is "w" 
    @y += 1 if input is "s"
    @x -= 1 if input is "a"
    @x += 1 if input is "d"

table = new Table
trees = new Trees
char = new Character
enemy = new Enemy

stdin.on 'data', (input)->
  trees.draw()
  enemy.draw()
  char.draw input[0]
  table.draw()
