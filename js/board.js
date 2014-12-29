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
  if (source == 'e1' && target == 'c1') {
    // White 0-0-0
    this.board_.move('a1-d1');
  }
  if (source == 'e1' && target == 'g1') {
    // White 0-0
    this.board_.move('h1-f1');
  }
  if (source == 'e8' && target == 'c8') {
    // Black 0-0-0
    this.board_.move('a8-d8');
  }
  if (source == 'e8' && target == 'g8') {
    // Black 0-0
    this.board_.move('h8-f8');
  }
  this.line_.advance();
};


var main = function() {
  var b = null;
  var openings = [];
  openings = openings.concat(getOpening_dutch());
  openings = openings.concat(getOpening_frenchAdvance());

  var onDoneFn = function() {
    var opening = openings[Math.floor(Math.random() * openings.length)];
    var lines = opening.lines;
    var line = lines[Math.floor(Math.random() * lines.length)];
    b.initialize(line, opening.isWhite);
  };
  var b = new Board(onDoneFn);
  onDoneFn();
};

var getOpening_albin = function() {
  var opening = 'd2 d4, d7 d5, c2 c4, e7 e5, d4 e5, d5 d4, g1 f3';
  var continuations = [
    // 4 ... Bb4+ 5 Bd2
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, a7 a6, b5 d6, e8 f8, c4 c5',
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, e8 g8, b5 d4',
    'f8 b4, c1 d2, b4 d2, d1 d2, b8 c6, e2 e3, d4 e3, d2 e3',
    'f8 b4, c1 d2, c7 c5, d2 b4, c5 b4, d1 d4, d8 d4, f3 d4',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, c5 d4, d2 b4',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, d8 a5, a2 a3',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c5 b4, f3 d4, c6 e5, d2 b4'
    // 4 ... Bb4+
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: true
  };
};

var getOpening_dutch = function() {
  var opening = 'd2 d4, f7 f5, b1 c3';
  var continuations = [
    // 2 ... d5 3 Bg5 Nf6 4 Bxf6 exf6 5 e3
    'd7 d5, c1 g5, g8 f6, g5 f6, e7 f6, e2 e3',
    // 2 ... d5 3 Bg5 Nf6 4 Bxf6 gxf6 5 e4 e6 6 Qh5+
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, e7 e6, d1 h5, e8 e7, e4 d5, ' +
        'e6 d5, e1 c1',
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, e7 e6, d1 h5, e8 d7, e4 d5, ' +
        'e6 d5, c3 d5',
    // 2 ... d5 3 Bg5 Nf6 4 Bxf6 gxf6 5 e4 Be6 6 exd5
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, c8 e6, e4 d5, e6 d5, c3 d5, ' +
        'd8 d5, d1 h5, d5 f7, h5 f5',
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, c8 e6, e4 d5, e6 d5, c3 d5, ' +
        'd8 d5, d1 h5, e8 d8, f1 e2, b8 d7, e2 f3',
    // 2 ... d5 3 Bg5 Nf6 4 Bxf6 gxf6 5 e4 dxe4 6 Qh5+
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, d5 e4, d1 h5, e8 d7, d4 d5, ' +
        'c7 c6, e1 c1, d7 c7, d5 c6',
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, d5 e4, d1 h5, e8 d7, d4 d5, ' +
        'c7 c5, h5 f5, d7 e8, f5 h5',
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, d5 e4, d1 h5, e8 d7, d4 d5, ' +
        'e7 e6, d5 e6, d7 e6, f1 c4',
    // 2 ... d5 3 Bg5 Nf6 4 Bxf6 gxf6 5 e4 fxe4 6 Qh5+
    'd7 d5, c1 g5, g8 f6, g5 f6, g7 f6, e2 e4, f5 e4, d1 h5, e8 d7, h5 d5, ' +
        'd7 e8, d5 h5, e8 d7, e1 c1',
    // 2 ... d5 3 Bg5 h6 4 Bh4 g5 5 e3 gxh4 6 Qh5+ Kd7 7 Nf3
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'g8 f6, f3 e5, d7 e6, h5 f7, e6 d6, c3 b5',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'g8 f6, f3 e5, d7 d6, c3 b5, d6 e6, h5 f7',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'e7 e6, f3 e5, d7 d6, c3 b5, d6 e7, h5 f7',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'e7 e6, f3 e5, d7 e7, h5 f7, e7 d6, c3 b5',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'f8 g7, h5 f7',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'b8 c6, c3 d5',
    'd7 d5, c1 g5, h7 h6, g5 h4, g7 g5, e2 e3, g5 h4, d1 h5, e8 d7, g1 f3, ' +
        'c7 c6, f3 e5, d7 c7, e5 f7, d8 e8, h5 g6',
    // 2 ... Nf6 3 Bg5 e6 4 e4
    'g8 f6, c1 g5, e7 e6, e2 e4, f5 e4, c3 e4, f8 e7, g5 f6, e7 f6, g1 f3, ' +
        'e8 g8, f1 d3, b8 c6, c2 c3',
    'g8 f6, c1 g5, e7 e6, e2 e4, f8 e7, e4 f5, e6 f5, f1 c4',
    'g8 f6, c1 g5, e7 e6, e2 e4, h7 h6, g5 f6, d8 f6, e4 f5, e6 f5, d1 e2, ' +
        'f8 e7, c3 d5, f6 d6, d5 e7, d6 e7, e1 d2',
    'g8 f6, c1 g5, e7 e6, e2 e4, h7 h6, g5 f6, d8 f6, e4 f5, e6 f5, d1 e2, ' +
        'f6 e6, e1 c1',
    // 2 ... Nf6 3 Bg5 g6 4 Bxf6 exf6 5 e3
    'g8 f6, c1 g5, g7 g6, g5 f6, e7 f6, e2 e3, d7 d5, f1 d3',
    // 2 ... g6 3 h4 Nf6 4 h5 gxh5 5 e4
    'g7 g6, h2 h4, g8 f6, h4 h5, g6 h5, e2 e4, f5 e4, c3 e4',
    'g7 g6, h2 h4, g8 f6, h4 h5, g6 h5, e2 e4, d7 d6, c1 g5',
    // 2 ... g6 3 h4 Nf6 4 h5 Nxh5 5 Rxh5 gxh5 6 e4 d6 7 Nh3
    'g7 g6, h2 h4, g8 f6, h4 h5, f6 h5, h1 h5, g6 h5, e2 e4, d7 d6, g1 h3, ' +
        'f5 e4, d1 h5, e8 d7, f1 c4, f8 g7, h5 f5, d7 e8, c4 f7, e8 f8, ' +
        'f7 e6, g7 f6, c1 h6, f8 e8, f5 h5',
    'g7 g6, h2 h4, g8 f6, h4 h5, f6 h5, h1 h5, g6 h5, e2 e4, d7 d6, g1 h3, ' +
        'f5 e4, d1 h5, e8 d7, f1 c4, f8 g7, h5 f5, d7 e8, c4 f7, e8 f8, ' +
        'f7 e6, g7 f6, c1 h6, f8 e8, f5 h5',
    // 2 ... g6 3 h4 Bg7 4 h5 gxh5? 5 e4
    'g7 g6, h2 h4, f8 g7, h4 h5, g6 h5, e2 e4, e7 e6, d1 h5, e8 f8, e4 f5, ' +
        'g8 f6, h5 h4, e6 f5, c1 h6',
    'g7 g6, h2 h4, f8 g7, h4 h5, g6 h5, e2 e4, d7 d6, d1 h5, e8 f8, f1 c4, ' +
        'd8 e8, h5 e8, f8 e8, c3 d5, e8 d7, e4 f5',
    // 2 ... e6? 3 e4 fxe4 4 Nxe4 d5? 5 Qh5+
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, g7 g6, h5 e5, d5 e4, e5 h8, ' +
        'g8 f6, c1 g5, b8 d7, e1 c1',
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, e8 e7, e4 g5, d8 e8, h5 h4, ' +
        'g8 f6, g1 f3',
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, e8 e7, e4 g5, g7 g6, h5 h3, ' +
        'g8 f6, g1 f3',
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, e8 d7, g1 f3, g8 f6, f3 e5, ' +
        'd7 e7, h5 f7',
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, e8 d7, g1 f3, d5 e4, f3 e5, ' +
        'd7 d6, e5 f7, d6 e7, f7 d8',
    'e7 e6, e2 e4, f5 e4, c3 e4, d7 d5, d1 h5, e8 d7, g1 f3, d5 e4, f3 e5, ' +
        'd7 e7, h5 f7, e7 d6, f1 b5, c7 c6, e5 c4, d6 d5, c4 b6, d8 b6, ' +
        'c2 c4, d5 d4, c1 e3, d4 d3, e1 c1, d3 e2, h1 e1'
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: true
  };
};

var getOpening_frenchAdvance = function() {
  var opening = 'e2 e4, e7 e6, d2 d4, d7 d5, e4 e5, c7 c5';
  var continuations = [
    // 4 c3 Nc6 5 Nf3 Qb6 6 a3 c4
    'c2 c3, b8 c6, g1 f3, d8 b6, a2 a3, c5 c4',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Bd3 cxd4
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 d3, c5 d4, c3 d4, c8 d7, e1 g1, c6 d4, ' +
        'f3 d4, b6 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 d3, c5 d4, f3 d4, c6 e5',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 Nxd4? Nxe5 8 Bf4 Bd6 9 Be3 Qd8
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, f3 d4, c6 e5, c1 f4, f8 d6, ' +
        'f4 e3, b6 d8',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Bd3 Bd7
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, e2 d3, c8 d7',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Nc3 Nf5
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b1 c3, h6 f5',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Bxh6 Qxb2
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'e1 g1, g7 h6, b1 d2, c6 d4, f3 d4, b2 d4, e2 b5, c8 d7, b5 d7, ' +
        'e8 d7, d1 b3, d4 b4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'e1 g1, g7 h6, b1 d2, c6 d4, a1 b1, d4 e2, d1 e2, b2 a3, e2 b5, ' +
        'c8 d7, b5 b7, a8 c8',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 g7, f8 g7, b1 d2, c6 d4, f3 d4, b2 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 g7, f8 g7, b1 d2, c6 d4, d1 a4, d4 c6, a1 b1, b2 c3',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 e3, b2 a1',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 d2, b2 a1',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'b1 c3, b2 c3, h6 d2, c3 a3',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 b3? Bb4+
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'e1 f1, e8 g8',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'c1 d2, h6 f5, d2 b4, b6 b4, d1 d2, f5 d4, d2 b4, d4 f3, e2 f3, c6 b4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'c1 d2, h6 f5, d2 b4, b6 b4, d1 d2, f5 d4, f3 d4, b4 d4, d2 d4, c6 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'b1 d2, c6 d4, f3 d4, b6 d4, a1 b1, d4 e5, e1 g1, e8 g8',

    // 4 c3 Nc6 5 Be3 Qb6 6 Qd2 Bd7 7 Nf3 Rc8
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, d4 c5, f8 c5, ' +
        'e3 c5, b6 c5',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 e2, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 d3, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',

    // 4 c3 Nc6 5 Be3 Qb6 6 b3? cxd4
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, e3 d2, b6 d4, ' +
        'd2 b4, d4 e5, g1 e2, c6 b4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, b1 d2, b4 c3, ' +
        'a1 c1, c3 b2, c1 b1, b2 d4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, e3 d4, c6 d4, c3 d4, f8 b4, ' +
        'b1 d2, b4 c3, a1 c1, c3 b2, c1 b1, b2 d4',

    // 4 Nf3 cxd4
    'g1 f3, c5 d4, f1 d3, b8 c6, e1 g1, g8 e7, b1 d2, e7 g6',
    'g1 f3, c5 d4, f1 d3, b8 c6, f3 g5, c6 e5, g5 h7, e5 d3, d1 d3, f8 e7',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 f4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6, ' +
        'f3 g5, f7 f6, e5 f6, g7 f6, g5 f3, f8 h6',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 g4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6',
    'g1 f3, c5 d4, d1 d4, b8 c6, f1 b5, c8 d7, b5 c6, b7 c6',
    'g1 f3, c5 d4, f3 d4, b8 c6, d4 c6, b7 c6',

    // 4 dxc5 Bxc5
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
