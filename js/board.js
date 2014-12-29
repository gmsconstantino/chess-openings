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
