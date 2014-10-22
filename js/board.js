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


/**
 * @constructor
 * @struct
 * @final
 */
var Board = function() {
  /** @private {!ChessBoard} */
  this.board_ = new ChessBoard('board', {
    draggable: true,
    onChange: this.onChange_.bind(this),
    onDrop: this.onDrop_.bind(this),
    pieceTheme: '../img/wikipedia/{piece}.png'
  });

  /** @private {Line} */
  this.line_ = null;
};


Board.prototype.initialize = function(moves, isWhite) {
  this.line_ = new Line(moves, isWhite);
  this.board_.start();
  this.board_.orientation(isWhite ? 'white' : 'black');
};


Board.prototype.onChange_ = function(oldPos, newPos) {
  if (this.line_.isComputerMoveNext()) {
    var computerMove = this.line_.advance();
    setTimeout(
        this.board_.move.bind(this.board_, computerMove.asString()), 500);
  }
};


Board.prototype.onDrop_ = function(
    source, target, piece, newPos, oldPos, orientation) {
  if (!this.line_.equalsNextMove(new Move(source, target))) {
    return 'snapback';
  }

  this.line_.advance();
};


var main = function() {
  var b = new Board();
  var moves = [
    new Move('d2', 'd4'),
    new Move('d7', 'd5'),
    new Move('c2', 'c4'),
    new Move('d5', 'c4'),
    new Move('g1', 'f3'),
    new Move('b7', 'b5'),
    new Move('a2', 'a4'),
    new Move('c7', 'c6'),
    new Move('a4', 'b5'),
    new Move('c6', 'b5'),
    new Move('b1', 'c3'),
    new Move('a7', 'a6'),
    new Move('c3', 'b5')
  ];
  var isWhite = false;
  b.initialize(moves, isWhite);
};


window.onload = main;