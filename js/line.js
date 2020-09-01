/**
 * @constructor
 * @struct
 * @final
 */
var Line = function(moves, isWhite) {
    /** @private {!Array.<!Move>} */
    this.moves_ = moves;
  
    /** @private {boolean} */
    this.isWhite_ = isWhite === 'white' ? 1 : 0;
  
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
   * @param {!Move} nextMove
   * @return {boolean}
   */
  Line.prototype.nextMove = function() {
    return this.progress_ < this.moves_.length ? this.moves_[this.progress_] : null;
  };

  /**
   * @param {!Move} nextMove
   * @return {boolean}
   */
  Line.prototype.previousMove = function() {
    return this.progress_ < this.moves_.length ? this.moves_[this.progress_-1] : null;
  };

  /**
   * @param {!Move} nextMove
   * @return {boolean}
   */
  Line.prototype.undo = function() {
    --this.progress_;
    return this.progress_ >= 0 ? this.moves_[this.progress_] : null;
  };
  
  /** @return {boolean} */
  Line.prototype.isDone = function() {
    return this.progress_ >= this.moves_.length;
  }