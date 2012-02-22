(function() {
  var char, columns, drawTree, edgeDetection, logString, logTable, makeTable, modifyChar, moveChar, populateTrees, render, roundom, rows, stdin, table, trees;
  stdin = process.openStdin();
  stdin.setEncoding('utf8');
  trees = [];
  rows = 10;
  columns = 20;
  char = {
    x: 0,
    y: 0
  };
  roundom = function(int) {
    return Math.ceil(Math.random() * int);
  };
  populateTrees = function() {
    var whatever, _results;
    _results = [];
    for (whatever = 0; whatever <= 20; whatever++) {
      _results.push(trees.push({
        x: roundom(columns),
        y: roundom(rows)
      }));
    }
    return _results;
  };
  populateTrees();
  drawTree = function(tree) {
    return table[tree.y][tree.x] = "&";
  };
  makeTable = function() {
    var table, x, y;
    table = [];
    for (y = 0; 0 <= rows ? y <= rows : y >= rows; 0 <= rows ? y++ : y--) {
      table[y] = [];
      for (x = 0; 0 <= columns ? x <= columns : x >= columns; 0 <= columns ? x++ : x--) {
        table[y].push(".");
      }
    }
    return table;
  };
  table = makeTable();
  logString = function(string) {
    return console.log("\u001B[2J\u001B[0;0f" + string);
  };
  logTable = function() {
    var cell, row, string, _i, _j, _len, _len2;
    string = '';
    for (_i = 0, _len = table.length; _i < _len; _i++) {
      row = table[_i];
      string += '\n';
      for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
        cell = row[_j];
        string += cell;
      }
    }
    return logString(string);
  };
  moveChar = function(input) {
    modifyChar(input);
    return edgeDetection();
  };
  edgeDetection = function() {
    if (char.x > columns) {
      char.x = 0;
    }
    if (char.x < 0) {
      char.x = columns;
    }
    if (char.y > rows) {
      char.y = 0;
    }
    if (char.y < 0) {
      return char.y = rows;
    }
  };
  modifyChar = function(input) {
    if (input === "w" && table[char.y - 1][char.x] !== "&") {
      char.y -= 1;
    }
    if (input === "s" && table[char.y + 1][char.x] !== "&") {
      char.y += 1;
    }
    if (input === "a" && table[char.y][char.x - 1] !== "&") {
      char.x -= 1;
    }
    if (input === "d" && table[char.y][char.x + 1] !== "&") {
      return char.x += 1;
    }
  };
  render = function(input) {
    var tree, _i, _len;
    for (_i = 0, _len = trees.length; _i < _len; _i++) {
      tree = trees[_i];
      drawTree(tree);
    }
    table[char.y][char.x] = ".";
    moveChar(input[0]);
    table[char.y][char.x] = "@";
    return logTable();
  };
  stdin.on('data', function(input) {
    return render(input);
  });
}).call(this);
