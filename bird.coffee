#imports
events = require 'events'

#utils
roundom = (int)-> Math.ceil Math.random()*int

class Table extends events.EventEmitter
  constructor:(input)->
    @setMaxListeners 0
    @rows = 10
    @columns = 20
    @won = no
    @arr = []
    for y in [0..@rows]
      @arr[y] = []
      @arr[y].push(" ") for x in [0..@columns]
    input.on 'data', @draw
  
  draw: (string)=>
    @emit 'draw', string[0]
    string = ''
    for row in @arr
      string += '\n'
      string += cell for cell in row
    if @won is yes
      @log 'Winner!'
    else
      @log string
  
  log: (string)-> 
    console.log "\u001B[2J\u001B[0;0f#{string}"

  get: (x,y)-> @arr[x][y]

  set: (x,y, val)-> @arr[y][x] = val

class Tree
  constructor: (@table)->
    @x = roundom table.columns
    @y = roundom table.rows
    @table.on 'draw', @draw
  draw: => @table.set @x, @y, "\033[1;32m↟\033[1;0m"


class Bird
  constructor: (@table)->
    @x = 4
    @y = 4
    @table.on 'draw', @draw
  
  draw: => 
    @table.set @x, @y, " "
    @move()
    @edgeDetection()
    @table.set @x, @y, '\033[1;36mఈ\033[1;0m'
  
  edgeDetection: ->
    @x = 0 if @x > @table.columns
    @x = @table.columns if @x < 0
    @y = 0 if @y > @table.rows
    @y = @table.rows if @y < 0

  move: (input)->
    @y -= 1
    @x += 1

class Player
  constructor: (@table, @bird)->
    @x = 0
    @y = 0
    @moving = yes
    @nextX = 0
    @nextY = 0
    @table.on 'draw', @draw

  draw: (data)=>
    @nextX = @x
    @nextY = @y
    @table.set @x, @y, " "
    @adjust data
    @edgeDetection()
    @treeDetection()
    @caughtBird()
    @move() if @moving
    @table.set @x, @y, "\033[1;34m⚲\033[1;0m" 

  caughtBird: =>
    @table.won is yes if @x is @bird.x and @y is @bird.y

  edgeDetection: ->
    @nextX = 0 if @nextX > @table.columns
    @nextX = @table.columns if @nextX < 0
    @nextY = 0 if @nextY > @table.rows
    @nextY = @table.rows if @nextY < 0

  treeDetection: ->
    if @table.get(@nextY, @nextX) isnt "\033[1;32m↟\033[1;0m"
      @moving = yes
    else
      @moving = no

  adjust: (input)->
    @nextY -= 1 if input is "w" 
    @nextY += 1 if input is "s"
    @nextX -= 1 if input is "a"
    @nextX += 1 if input is "d"

  move: ->
    @x = @nextX
    @y = @nextY


class App
  constructor: ->
    input = process.openStdin()
    input.setEncoding 'utf8'
    table = new Table input
    trees = []
    trees.push new Tree(table) for i in [0..20]
    bird = new Bird table
    player = new Player table, bird
    table.emit 'draw'

app = new App

console.log "\033[1;0mWelcome to catch the bird!\n
This is the bird \033[1;36mఈ\033[1;0m.\n
This is a tree \033[1;32m↟\033[1;0m you can't walk through trees.\n
This is you \033[1;34m⚲\033[1;0m.\n
To move around type w s a or d and hit enter.\n
The aim of the game is to catch the bird.\n
Hit Enter to begin!"