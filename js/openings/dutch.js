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