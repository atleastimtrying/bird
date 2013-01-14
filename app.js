(function() {
  var Character, Table, Tree, Trees, char, logString, roundom, stdin, table, trees;

  stdin = process.openStdin();

  stdin.setEncoding('utf8');

  logString = function(string) {
    return console.log("\u001B[2J\u001B[0;0f" + string);
  };

  roundom = function(int) {
    return Math.ceil(Math.random() * int);
  };

  Table = (function() {

    function Table() {
      var x, y, _ref, _ref2;
      this.rows = 10;
      this.columns = 20;
      this.arr = [];
      for (y = 0, _ref = this.rows; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        this.arr[y] = [];
        for (x = 0, _ref2 = this.columns; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          this.arr[y].push(".");
        }
      }
    }

    Table.prototype.draw = function() {
      var cell, row, string, _i, _j, _len, _len2, _ref;
      string = '';
      _ref = this.arr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        string += '\n';
        for (_j = 0, _len2 = row.length; _j < _len2; _j++) {
          cell = row[_j];
          string += cell;
        }
      }
      return logString(string);
    };

    Table.prototype.get = function(x, y) {
      return this.arr[x][y];
    };

    Table.prototype.set = function(x, y, val) {
      return this.arr[y][x] = val;
    };

    return Table;

  })();

  Tree = (function() {

    function Tree() {
      this.x = roundom(table.columns);
      this.y = roundom(table.rows);
    }

    Tree.prototype.draw = function() {
      return table.set(this.x, this.y, "&");
    };

    return Tree;

  })();

  Trees = (function() {

    Trees.prototype.arr = [];

    function Trees() {
      var i;
      for (i = 0; i <= 20; i++) {
        this.arr.push(new Tree);
      }
    }

    Trees.prototype.draw = function() {
      var tree, _i, _len, _ref, _results;
      _ref = this.arr;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tree = _ref[_i];
        _results.push(tree.draw());
      }
      return _results;
    };

    return Trees;

  })();

  Character = (function() {

    function Character() {
      this.x = 0;
      this.y = 0;
    }

    Character.prototype.draw = function(input) {
      table.set(this.x, this.y, ".");
      this.move(input);
      this.edgeDetection();
      return table.set(this.x, this.y, "@");
    };

    Character.prototype.edgeDetection = function() {
      if (this.x > table.columns) this.x = 0;
      if (this.x < 0) this.x = table.columns;
      if (this.y > table.rows) this.y = 0;
      if (this.y < 0) return this.y = table.rows;
    };

    Character.prototype.move = function(input) {
      if (input === "w") this.y -= 1;
      if (input === "s") this.y += 1;
      if (input === "a") this.x -= 1;
      if (input === "d") return this.x += 1;
    };

    return Character;

  })();

  table = new Table;

  trees = new Trees;

  char = new Character;

  stdin.on('data', function(input) {
    trees.draw();
    char.draw(input[0]);
    return table.draw();
  });

}).call(this);
