

#utils
roundom = (int)-> Math.ceil Math.random()*int

class Table 
  constructor:()->
    @display = document.getElementById 'display'
    @input = document.getElementById 'input'
    @log "Welcome to catch the bird!<br>
    This is the bird &#3208;.<br>
    This is a tree &#8607; you can't walk through trees.<br>
    This is you &#9906;.<br>
    To move around type w s a or d and hit enter.<br>
    The aim of the game is to catch the bird.<br>
    Type commands and hit Enter to begin!"
    @rows = 10
    @columns = 20
    @won = no
    @arr = []
    for y in [0..@rows]
      @arr[y] = []
      @arr[y].push(" ") for x in [0..@columns]
    @input.addEventListener 'keyup', @draw, false
  
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
    @display.innerHTML = string

  get: (x,y)-> @arr[x][y]

  set: (x,y, val)-> @arr[y][x] = val

class Tree
  constructor: (@table)->
    @x = roundom table.columns
    @y = roundom table.rows
    @table.on 'draw', @draw
  draw: => @table.set @x, @y, "&#8607;"


class Bird
  constructor: (@table)->
    @x = 4
    @y = 4
    @table.on 'draw', @draw
  
  draw: => 
    @table.set @x, @y, " "
    @move()
    @edgeDetection()
    @table.set @x, @y, '&#3208;'
  
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

  draw: (data)=>
    @nextX = @x
    @nextY = @y
    @table.set @x, @y, " "
    @adjust data
    @edgeDetection()
    @treeDetection()
    @caughtBird()
    @move() if @moving
    @table.set @x, @y, "&#9906;" 

  caughtBird: =>
    @table.won is yes if @x is @bird.x and @y is @bird.y

  edgeDetection: ->
    @nextX = 0 if @nextX > @table.columns
    @nextX = @table.columns if @nextX < 0
    @nextY = 0 if @nextY > @table.rows
    @nextY = @table.rows if @nextY < 0

  treeDetection: ->
    if @table.get(@nextY, @nextX) isnt "&#8607;"
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
    table = new Table
    trees = []
    trees.push new Tree(table) for i in [0..20]
    bird = new Bird table
    player = new Player table, bird

window.onload = ->
  app = new App
