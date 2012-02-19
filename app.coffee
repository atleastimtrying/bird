STRING = "..........\n
..........\n
..........\n
..........\n
..........\n
..........\n"

stdin = process.openStdin()
stdin.setEncoding 'utf8'

logString = ->
  console.log "\u001B[2J\u001B[0;0f#{STRING}"

boxThis = (input)->
  string = ""
  for [0..40]
    do ()->
      string += input[0] for [0..80]
      string += '\n'
  string

inputCallback = (input)->
  STRING = boxThis(input)
  logString()

stdin.on 'data', (input)-> inputCallback input