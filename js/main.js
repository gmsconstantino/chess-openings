var main = function() {
  var b = null;
  var openings = [];
  var openingsList = getOpenings();
  for (var i = 0; i < openingsList.length; i++) {
    openings = openings.concat(openingsList[i]);
  }

  var onDoneFn = function() {
    var opening = openings[Math.floor(Math.random() * openings.length)];
    var lines = opening.lines;
    var line = lines[Math.floor(Math.random() * lines.length)];
    b.initialize(line, opening.isWhite);
  };
  var b = new Board(onDoneFn);
  onDoneFn();
};


window.onload = main;