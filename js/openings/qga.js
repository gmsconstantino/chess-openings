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