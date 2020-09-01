var main = function() {
  var b = null;
  var openings = [];
  
  var onDoneFn = function() {
    const openingName = '*';
    var opening = openings.filter(o => {
      return openingName === '*' ? true : o.name.includes(openingName)
    });
    // var lines = opening.length;
    var obj = opening[Math.floor(Math.random() * opening.length)];
    
    // const playerColor = 'white';
    const playerColor = 'black';

    if(obj) {
      b.initialize(obj.line, playerColor);
      $('#variation').text(obj.name);
      console.log(obj.moves)
      window.opening = obj
    } else {
      $('#status').html('Error!!!!!')
    }
  };
  var b = new Board(() => { 
    b.updateStatus();
    var $status = $('#status')
    $status.html('End of opening...')
  });

  getOpenings().then((d) => {
    openings = d.flat();
    onDoneFn();
  });

  $('#hint-button').click(() => {
    b.nextMove() ? alert(b.nextMove().pieceTarget()) : null;
  })
  
  $('#undo-button').click(() => {
    b.line_.undo();
    b.game_.undo();
    b.board_.position(b.game_.fen())
  })
};


window.onload = main;