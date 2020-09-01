/**
 * @constructor
 * @struct
 * @final
 */
var Move = function(source, target, piece) {
    /** @private {string} */
    this.source_ = source;
  
    /** @private {string} */
    this.target_ = target;

    /** @private {string} */
    this.piece_ = piece;
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

  Move.prototype.pieceTarget = function() {
      return (this.piece_==='p'? '': this.piece_.toUpperCase())+this.target_
  }
  