/**
 * @param {!Function} onDoneFn
 * @constructor
 * @struct
 * @final
 */
var Board = function(onDoneFn) {
  /** @private {!Chess} */
  this.game_ = new Chess();
  /** @private {!ChessBoard} */
  this.board_ = new ChessBoard('board', {
    draggable: true,
    onChange: this.onChange_.bind(this),
    onDrop: this.onDrop_.bind(this),
    onDragStart: this.onDragStart.bind(this),
    onMoveEnd: this.onMoveEnd.bind(this),
    onSnapEnd: this.onSnapEnd.bind(this),
    pieceTheme: '../img/wikipedia/{piece}.png',
    // position: 'rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq'
  });

  /** @private {Line} */
  this.line_ = null;

  /** @private {!Function} */
  this.onDoneFn_ = onDoneFn;    
};

Board.prototype.nextMove = function () {
  return this.line_.nextMove()
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
Board.prototype.onSnapEnd = function  () {
  this.board_.position(this.game_.fen())
}

Board.prototype.onMoveEnd = function () {
  // console.log('move end board', this.board_.fen())
  // console.log('move end game', this.game_.fen())
  // updateStatus()
  // $fen.html(this.game_.fen())
  // $pgn.html(this.game_.pgn())

  this.updateStatus()
}

Board.prototype.makeRandomMove = function() {
  var possibleMoves = this.game_.moves()

  // exit if the game is over
  if (this.game_.game_over()) return

  var randomIdx = Math.floor(Math.random() * possibleMoves.length)
  this.game_.move(possibleMoves[randomIdx])
  console.log('random move', this.game_.fen())
  this.board_.position(this.game_.fen())

  window.setTimeout(this.makeRandomMove.bind(this), 500)
}


/**
 * @param {!Array.<!Move>} moves
 * @param {boolean} isWhite
 */
Board.prototype.initialize = function(moves, isWhite) {
  this.line_ = new Line(moves, isWhite);
  // this.board_.start();
  // this.board_.orientation(isWhite ? 'white' : 'black');
  this.board_.orientation(isWhite);
  this.board_.position(this.game_.fen())
  // this.board_.position('rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq')
};



/**
 * @param {!Position} oldPos
 * @param {!Position} newPos
 * @private
 */
Board.prototype.onChange_ = function(oldPos, newPos) {
  // debugger;
  if (this.line_.isComputerMoveNext()) {
    var computerMoveString = this.line_.advance().asString();
    computerMoveFn = function() {
      var x = this.game_.move(computerMoveString, { sloppy: true })
      this.board_.position(this.game_.fen())
    };
    setTimeout(computerMoveFn.bind(this), 500);
  }

  if (this.line_.isDone()) {
    setTimeout(this.onDoneFn_, 1000);
  }
};

Board.prototype.onDragStart = function  (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (this.game_.game_over()) return false

  // only pick up pieces for the side to move
  if ((this.game_.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (this.game_.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}

/**
 * @param {string} source
 * @param {string} target
 * @param {string} piece
 * @param {!Position} oldPos
 * @param {!Position} newPos
 * @param {string} orientation
 * @private
 */
Board.prototype.onDrop_ = function(source, target, piece, newPos, oldPos, orientation) {
  if (!this.line_.isDone() && !this.line_.equalsNextMove(new Move(source, target))) {
    return 'snapback';
  }

  this.line_.advance();

  var move = this.game_.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })

  // this.board_.position(this.game_.fen())

  // illegal move
  if (move === null) return 'snapback'
};

Board.prototype.updateStatus = function () {
  var status = ''

  var moveColor = 'White'
  if (this.game_.turn() === 'b') {
    moveColor = 'Black'
  }

  // checkmate?
  if (this.game_.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }

  // draw?
  else if (this.game_.in_draw()) {
    status = 'Game over, drawn position'
  }

  // game still on
  else {
    status = moveColor + ' to move'

    // check?
    if (this.game_.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }

  var $status = $('#status')
  var $fen = $('#fen')
  var $pgn = $('#pgn')
  $status.html(status)
  $fen.html(this.game_.fen())
  $pgn.html(this.game_.pgn())
}



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
