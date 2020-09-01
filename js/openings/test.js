var getOpening_test = function() { // Caro-Kann

    const data = [
        // "1. e4 c6 2. d4 d5",
        // "1. e4 c6 2. d4 d5 3. exd5 cxd5",
        // "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4",
        // "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Nf3 Nf6",
        // "1. e4 c6 2. d4 d5 3. Nc3 e4 4. Ne4",
        // "1. e4 c6 2. d4 d5 3. Nc3 e4 4. f3 e3",
        // "1. e4 c6 2. d4 d5 3. Nc3 Nf6 4. Nxf6 exf6",
        // "1. e4 c6 2. d4 d5 3. Nc3 Nf6 4. Nxf6 gxf6",
        // "1. e4 c6 2. d4 d5 3. Nc3 bf5 4. Ng3 bf6",
        // "1. e4 c6 2. d4 d5 3. Nc3 bf5 4. Ng3 bf6 5. h4 h6",
           "1. e4 c6 2. d4 d5 3. f3 Nf6 4. Nc3 dxe4",

    ]
    
    const chess = new Chess();
    var openings = data.map((o, index) => {
        chess.reset();
        chess.load_pgn(o);
        const history = chess.history({ verbose: true });
        const x =  {
            name: 'Caro-Kann Defense: 10-Minute Chess Openings ['+index+']',
            family: 'Caro-Kann Defense: 10-Minute Chess Openings',
            fen: '',
            eco: '',
            moves: o,
            firstMove: history[0],
            line: history.map(o => {
                return new Move(o.from, o.to, o.piece)
            }),
            history: history
        }
        return x;
    });
    return Promise.resolve(openings)
  };