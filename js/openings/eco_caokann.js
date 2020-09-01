var getOpening_test = function() { // Caro-Kann

    // var opening = 'e2 e4';
    // var continuations = [
    //     'c7 c6, d2 d4, d7 d5, e4 d5, c6 d5',
    //     // 'c7 c6, d2 d4, d7 d5,',
    //     // 'c7 c6, d2 d4, d7 d5, ',
    //     // 'g1 f3'
    // ];
    
    // return Promise.resolve({
    //   lines: getLinesFromOpening(opening, continuations),
    //   isWhite: false,
    // });
    // return Promise.resolve([]);
    
    return $.getJSON('/data/carokann.json').then( (data) => {
    // return $.getJSON('/data/eco.json').then( (data) => {
        const chess = new Chess();
        var openings = data.map((o) => {
            ;;
            chess.reset();
            chess.load_pgn(o.moves);
            const history = chess.history({ verbose: true });
            const x =  {
                name: o.name,
                family: o.name.slice(0, o.name.indexOf(',')),
                fen: o.fen,
                eco: o.eco,
                moves: o.moves,
                firstMove: history[0],
                line: history.map(o => {
                    return new Move(o.from, o.to)
                })
            }
            return x;
        });
        return openings
    });
  };