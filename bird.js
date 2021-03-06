(function() {
  var App, Bird, Player, Table, Tree, app, events, roundom;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  events = require('events');

  roundom = function(int) {
    return Math.ceil(Math.random() * int);
  };

  Table = (function() {

    __extends(Table, events.EventEmitter);

    function Table(input) {
      this.draw = __bind(this.draw, this);
      var x, y, _ref, _ref2;
      this.setMaxListeners(0);
      this.rows = 10;
      this.columns = 20;
      this.won = false;
      this.arr = [];
      for (y = 0, _ref = this.rows; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        this.arr[y] = [];
        for (x = 0, _ref2 = this.columns; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
          this.arr[y].push(" ");
        }
      }
      input.on('data', this.draw);
    }

    Table.prototype.draw = function(string) {
      var cell, row, _i, _j, _len, _len2, _ref;
      this.emit('draw', string[0]);
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
      if (this.won === true) {
        return this.log('Winner!');
      } else {
        return this.log(string);
      }
    };

    Table.prototype.log = function(string) {
      return console.log("\u001B[2J\u001B[0;0f" + string);
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

    function Tree(table) {
      this.table = table;
      this.draw = __bind(this.draw, this);
      this.x = roundom(table.columns);
      this.y = roundom(table.rows);
      this.table.on('draw', this.draw);
    }

    Tree.prototype.draw = function() {
      return this.table.set(this.x, this.y, "\033[1;32m↟\033[1;0m");
    };

    return Tree;

  })();

  Bird = (function() {

    function Bird(table) {
      this.table = table;
      this.draw = __bind(this.draw, this);
      this.x = 4;
      this.y = 4;
      this.table.on('draw', this.draw);
    }

    Bird.prototype.draw = function() {
      this.table.set(this.x, this.y, " ");
      this.move();
      this.edgeDetection();
      return this.table.set(this.x, this.y, '\033[1;36mఈ\033[1;0m');
    };

    Bird.prototype.edgeDetection = function() {
      if (this.x > this.table.columns) this.x = 0;
      if (this.x < 0) this.x = this.table.columns;
      if (this.y > this.table.rows) this.y = 0;
      if (this.y < 0) return this.y = this.table.rows;
    };

    Bird.prototype.move = function(input) {
      this.y -= 1;
      return this.x += 1;
    };

    return Bird;

  })();

  Player = (function() {

    function Player(table, bird) {
      this.table = table;
      this.bird = bird;
      this.caughtBird = __bind(this.caughtBird, this);
      this.draw = __bind(this.draw, this);
      this.x = 0;
      this.y = 0;
      this.moving = true;
      this.nextX = 0;
      this.nextY = 0;
      this.table.on('draw', this.draw);
    }

    Player.prototype.draw = function(data) {
      this.nextX = this.x;
      this.nextY = this.y;
      this.table.set(this.x, this.y, " ");
      this.adjust(data);
      this.edgeDetection();
      this.treeDetection();
      this.caughtBird();
      if (this.moving) this.move();
      return this.table.set(this.x, this.y, "\033[1;34m⚲\033[1;0m");
    };

    Player.prototype.caughtBird = function() {
      if (this.x === this.bird.x && this.y === this.bird.y) {
        return this.table.won === true;
      }
    };

    Player.prototype.edgeDetection = function() {
      if (this.nextX > this.table.columns) this.nextX = 0;
      if (this.nextX < 0) this.nextX = this.table.columns;
      if (this.nextY > this.table.rows) this.nextY = 0;
      if (this.nextY < 0) return this.nextY = this.table.rows;
    };

    Player.prototype.treeDetection = function() {
      if (this.table.get(this.nextY, this.nextX) !== "\033[1;32m↟\033[1;0m") {
        return this.moving = true;
      } else {
        return this.moving = false;
      }
    };

    Player.prototype.adjust = function(input) {
      if (input === "w") this.nextY -= 1;
      if (input === "s") this.nextY += 1;
      if (input === "a") this.nextX -= 1;
      if (input === "d") return this.nextX += 1;
    };

    Player.prototype.move = function() {
      this.x = this.nextX;
      return this.y = this.nextY;
    };

    return Player;

  })();

  App = (function() {

    function App() {
      var bird, i, input, player, table, trees;
      input = process.openStdin();
      input.setEncoding('utf8');
      table = new Table(input);
      trees = [];
      for (i = 0; i <= 20; i++) {
        trees.push(new Tree(table));
      }
      bird = new Bird(table);
      player = new Player(table, bird);
      table.emit('draw');
    }

    return App;

  })();

  app = new App;

  console.log("\033[1;0mWelcome to catch the bird!\nThis is the bird \033[1;36mఈ\033[1;0m.\nThis is a tree \033[1;32m↟\033[1;0m you can't walk through trees.\nThis is you \033[1;34m⚲\033[1;0m.\nTo move around type w s a or d and hit enter.\nThe aim of the game is to catch the bird.\nHit Enter to begin!");

}).call(this);
