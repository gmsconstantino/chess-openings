/**
 * @constructor
 * @struct
 * @final
 */
var Move = function(source, target) {
  /** @private {string} */
  this.source_ = source;

  /** @private {string} */
  this.target_ = target;
};


/**
 * @param {!Move} o
 * @return {boolean}
 */
Move.prototype.equals = function(o) {
  return this.source_ == o.source_ && this.target_ == o.target_;
};


/** @return {string} */
Move.prototype.asString = function() {
  return this.source_ + '-' + this.target_;
};


/**
 * @constructor
 * @struct
 * @final
 */
var Line = function(moves, isWhite) {
  /** @private {!Array.<!Move>} */
  this.moves_ = moves;

  /** @private {boolean} */
  this.isWhite_ = isWhite;

  /** @private {number} */
  this.progress_ = 0;
};


/** @return {Move} */
Line.prototype.advance = function() {
  return this.progress_ < this.moves_.length ?
      this.moves_[this.progress_++] :
      null;
};


/** @return {boolean} */
Line.prototype.isComputerMoveNext = function() {
  return this.progress_ < this.moves_.length &&
      (this.progress_ % 2 == 0) != this.isWhite_;
};


/**
 * @param {!Move} move
 * @return {boolean}
 */
Line.prototype.equalsNextMove = function(move) {
  return this.progress_ < this.moves_.length &&
      this.moves_[this.progress_].equals(move);
};

/** @return {boolean} */
Line.prototype.isDone = function() {
  return this.progress_ >= this.moves_.length;
}


/**
 * @param {!Function} onDoneFn
 * @constructor
 * @struct
 * @final
 */
var Board = function(onDoneFn) {
  /** @private {!ChessBoard} */
  this.board_ = new ChessBoard('board', {
    draggable: true,
    onChange: this.onChange_.bind(this),
    onDrop: this.onDrop_.bind(this),
    pieceTheme: '../img/wikipedia/{piece}.png'
  });

  /** @private {Line} */
  this.line_ = null;

  /** @private {!Function} */
  this.onDoneFn_ = onDoneFn;
};


/**
 * @param {!Array.<!Move>} moves
 * @param {boolean} isWhite
 */
Board.prototype.initialize = function(moves, isWhite) {
  this.line_ = new Line(moves, isWhite);
  this.board_.start();
  this.board_.orientation(isWhite ? 'white' : 'black');
};


/**
 * @param {!Position} oldPos
 * @param {!Position} newPos
 * @private
 */
Board.prototype.onChange_ = function(oldPos, newPos) {
  if (this.line_.isComputerMoveNext()) {
    var computerMoveString = this.line_.advance().asString();
    var computerMoveFn;
    if (computerMoveString == 'e1-g1') {
      // White 0-0
      computerMoveFn = function() {
        this.move('e1-g1');
        this.move('h1-f1');
      };
    } else if (computerMoveString == 'e1-c1') {
      // White 0-0-0
      computerMoveFn = function() {
        this.move('e1-c1');
        this.move('a1-d1');
      };
    } else if (computerMoveString == 'e8-g8') {
      // Black 0-0
      computerMoveFn = function() {
        this.move('e8-g8');
        this.move('h8-f8');
      };
    } else if (computerMoveString == 'e8-c8') {
      // Black 0-0-0
      computerMoveFn = function() {
        this.move('e8-c8');
        this.move('a8-d8');
      };
    } else {
      computerMoveFn = function() {
        this.move(computerMoveString);
      };
    }
    setTimeout(computerMoveFn.bind(this.board_), 500);
  }

  if (this.line_.isDone()) {
    setTimeout(this.onDoneFn_, 1000);
  }
};


/**
 * @param {string} source
 * @param {string} target
 * @param {string} piece
 * @param {!Position} oldPos
 * @param {!Position} newPos
 * @param {string} orientation
 * @private
 */
Board.prototype.onDrop_ = function(
    source, target, piece, newPos, oldPos, orientation) {
  if (!this.line_.equalsNextMove(new Move(source, target))) {
    return 'snapback';
  }

  this.line_.advance();
};


var main = function() {
  var b = null;
  var openings = [];
  openings = openings.concat(getOpening_qga());

  var onDoneFn = function() {
    var opening = openings[Math.floor(Math.random() * openings.length)];
    var lines = opening.lines;
    var line = lines[Math.floor(Math.random() * lines.length)];
    b.initialize(line, opening.isWhite);
  };
  var b = new Board(onDoneFn);
  onDoneFn();
};

var getOpening_frenchAdvance = function() {
  var opening = 'e2 e4, e7 e6, d2 d4, d7 d5, e4 e5, c7 c5';
  var continuations = [
    // 4. c3
    'c2 c3, b8 c6, g1 f3, d8 b6, a2 a3, c5 c4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 d3, c5 d4, c3 d4, c8 d7, e1 g1, c6 d4, ' +
        'f3 d4, b6 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, g8 h6, b2 b3, c5 d4, c3 d4, h6 f5, ' +
        'c1 b2, f8 b4, e1 f1, e8 g8',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, g8 h6, c1 h6, b6 b2, b1 d2, g7 h6, ' +
        'a1 c1, b2 a2',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, g8 h6, c1 h6, b6 b2, h6 g7, f8 g7, ' +
        'b1 d2, b2 c3, a1 c1, c3 a3, e1 g1, c5 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, g8 h6, c1 h6, b6 b2, h6 g7, f8 g7, ' +
        'b1 d2, b2 c3, a1 c1, c3 a3, d4 c5, c6 e5',

    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, d4 c5, f8 c5, ' +
        'e3 c5, b6 c5',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 e2, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 d3, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, e3 d2, b6 d4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, b1 d2, b4 c3, ' +
        'a1 c1, c3 b2, c1 b1, b2 d4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, e3 d4, c6 d4, c3 d4, f8 b4, ' +
        'b1 d2, b4 c3, a1 c1, c3 b2, c1 b1, b2 d4',

    // 4. Nf3
    'g1 f3, c5 d4, f1 d3, b8 c6, e1 g1, g8 e7, b1 d2, e7 g6',
    'g1 f3, c5 d4, f1 d3, b8 c6, f3 g5, c6 e5, g5 h7, e5 d3, d1 d3, f8 e7',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 f4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6, ' +
        'f3 g5, f7 f6, e5 f6, g7 f6, g5 f3, f8 h6',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 g4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6',
    'g1 f3, c5 d4, d1 d4, b8 c6, f1 b5, c8 d7, b5 c6, b7 c6',
    'g1 f3, c5 d4, f3 d4, b8 c6, d4 c6, b7 c6',

    // 4. dxc5
    'd4 c5, f8 c5, d1 g4, e8 f8, f1 d3, d8 b6',
    'd4 c5, f8 c5, g1 f3, b8 c6'
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: false
  };
};

var getOpening_qga = function() {
  var opening = 'd2 d4, d7 d5, c2 c4, d5 c4, e2 e3';
  var continuations = [
    // 3 ... Nf6

    // 3 ... e5

    // 3 ... e6

    // 3 ... c5

    // 3 ... c6

    // 3 ... b5
    'b7 b5, a2 a4, b5 b4, f1 c4',

    'b7 b5, a2 a4, a7 a6, a4 b5, a6 b5, a1 a8',
    'b7 b5, a2 a4, c7 c6, a4 b5, c6 b5, d1 f3',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, b5 a6, d1 f3, c7 c6, a1 a6, ' +
        'b8 a6, f3 c6, d8 d7, c6 a8, d7 d8, a8 c6, d8 d7, c6 a6',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, c7 c6, b2 b3, g8 f6, b3 c4, ' +
        'b5 a6, c1 a3',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, c7 c6, b2 b3, c4 b3, c3 b5, ' +
        'c6 b5, f1 b5, b8 d7, d1 b3',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, a7 a6, c3 b5, a6 b5, a1 a8',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, d8 d7, g1 f3, f7 f6, f3 e5, ' +
        'f6 e5, d1 h5, e8 d8, h5 f3, d8 e8, f3 a8',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, d8 d7, g1 f3, f7 f6, f3 e5, ' +
        'f6 e5, d1 h5, e8 d8, h5 f3, e5 e4, f3 f8',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, d8 d7, g1 f3, f7 f6, f3 e5, ' +
        'f6 e5, d1 h5, g7 g6, h5 e5, g8 f6, c3 b5, b8 c6, e5 c7',
    'b7 b5, a2 a4, c8 d7, a4 b5, d7 b5, b1 c3, b5 d7, f1 c4'

    // 3 ... Be6
  ];

  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: true
  };
};

var getOpening_benkoFullyAccepted = function() {
  var opening = 'd2 d4, g8 f6, c2 c4, c7 c5, d4 d5, b7 b5, c4 b5, a7 a6, ' +
      'b5 a6, g7 g6';
  var continuations = [
    // 6. Nc3
    'b1 c3, c8 a6, g1 f3, d7 d6, c1 g5, f8 g7',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, e2 e4, a6 f1, e1 f1, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, f1 h3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, h2 h3, b8 d7, ' +
        'f1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, a1 b1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 h3, b8 d7, h3 f4, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, a1 b1, b8 d7, g1 f3, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, a1 b1, b8 d7, b2 b3, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g1 f3, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g2 g3, f8 g7, g1 f3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, ' +
        'g1 f3, e8 g8',

    // 6. g3
    'g2 g3, c8 a6, b1 c3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, f1 g2, f8 g7, g1 h3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g1 f3, b8 d7, ' +
        'f1 g2, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, f1 g2, b8 d7, ' +
        'g1 f3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 h3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 h3, b8 d7, h3 f4, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b2 b3, f8 g7, c1 b2, b8 d7, g1 h3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b2 b3, f8 g7, c1 b2, b8 d7, g1 f3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, g1 f3, f8 g7, b1 c3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, g1 f3, f8 g7, e1 g1, b8 d7, b1 c3, e8 g8',

    'g2 g3, c8 a6, b2 b3, f8 g7, c1 b2, d7 d6, f1 g2, b8 d7, g1 h3, e8 g8',
    'g2 g3, c8 a6, b2 b3, f8 g7, c1 b2, d7 d6, f1 g2, b8 d7, g1 f3, e8 g8',

    // 6. Nf3
    'g1 f3, c8 a6, b1 c3, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'g1 f3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'g1 f3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, h2 h3, b8 d7, ' +
        'f1 g1, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, b1 c3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, e1 g1, b8 d7, b1 c3, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, e1 g1, b8 d7, f1 e1, e8 g8',

    // 6. b3
    'b2 b3, f8 g7, c1 b2, c8 a6, g2 g3, d7 d6, f1 g2, b8 d7, g1 h3, e8 g8',

    // 6. e3
    'e2 e3, d7 d6, b1 c3, f8 g7, g1 f3, e8 g8, e3 e4, b8 d7, f1 e2, c8 a6',
    'e2 e3, d7 d6, b1 c3, f8 g7, f1 b5, b8 d7, g1 f3, c8 a6',
    'e2 e3, d7 d6, b1 c3, f8 g7, e3 e4, e8 g8, f2 f4, d8 a5, c1 d2, c8 a6, ' +
        'f1 a6, b8 a6, g1 f3, a6 b4, e1 g1, c5 c4',
    'e2 e3, d7 d6, b1 c3, f8 g7, e3 e4, e8 g8, g1 f3, b8 d7, f1 e2, c8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, f1 e2, c8 a6, e1 g1, b8 d7, ' +
        'e2 a6, a8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, f1 c4, c8 a6, c4 a6, b8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, e3 e4, b8 d7'
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: false
  };
};

var getLinesFromOpening = function(opening, continuations) {
  var lines = [];
  for (var i = 0; i < continuations.length; i++) {
    var raw_line = (opening + ', ' + continuations[i]).split(',');
    var line = []
    for (var j = 0; j < raw_line.length; j++) {
      var raw_move = raw_line[j].trim().split(' ');
      line.push(new Move(raw_move[0], raw_move[1]));
    }
    lines.push(line);
  }
  return lines;
};


window.onload = main;
