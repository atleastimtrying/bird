(function() {
  var STRING, boxThis, inputCallback, logString, stdin;

  STRING = "..........\n..........\n..........\n..........\n..........\n..........\n";

  stdin = process.openStdin();

  stdin.setEncoding('utf8');

  logString = function() {
    return console.log("\u001B[2J\u001B[0;0f" + STRING);
  };

  boxThis = function(input) {
    var string, _fn, _i;
    string = "";
    _fn = function() {
      var _j;
      for (_j = 0; _j <= 80; _j++) {
        string += input[0];
      }
      return string += '\n';
    };
    for (_i = 0; _i <= 40; _i++) {
      _fn();
    }
    return string;
  };

  inputCallback = function(input) {
    STRING = boxThis(input);
    return logString();
  };

  stdin.on('data', function(input) {
    return inputCallback(input);
  });

}).call(this);
