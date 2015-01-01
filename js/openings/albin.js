var getOpening_albin = function() {
  var opening = 'd2 d4, d7 d5, c2 c4, e7 e5, d4 e5, d5 d4, g1 f3';
  var continuations = [
    // 4 ... Nc6 5 g3
    'b8 c6, g2 g3, g8 e7, f1 g2, e7 g6, e1 g1, g6 e5, f3 e5, c6 e5, b2 b3, ' +
        'f8 c5, c1 b2, e8 g8, b1 d2',
    // 4 ... Bb4+? 5 Bd2 Bxd2 6 Qxd2
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, a7 a6, b5 d6, e8 f8, c4 c5',
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, e8 g8, b5 d4',
    'f8 b4, c1 d2, b4 d2, d1 d2, b8 c6, e2 e3, d4 e3, d2 e3',
    // 4 ... Bb4+? 5 Bd2 Nc6 6 Bxb4 Nxb4 7 Na3
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, c5 d4, d2 b4',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, d8 a5, a2 a3',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c5 b4, f3 d4, c6 e5, d2 b4',
    // 4 ... Bb4+? 5 Bd2 c5 6 Bxb4 cxb4 7 Qxd4 Qxd4 8 Nxd4
    'f8 b4, c1 d2, c7 c5, d2 b4, c5 b4, d1 d4, d8 d4, f3 d4',
    // 4 ... c5? 5 e3
    'c7 c5, e2 e3, d4 e3, d1 d8, e8 d8, c1 e3',
    'c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, f1 d3',
    'c7 c5, e2 e3, d8 a5, c1 d2, a5 b6, b2 b4, c5 b4, e3 d4, b8 c6, d2 e3',
    'c7 c5, e2 e3, d8 a5, c1 d2, a5 b6, b2 b4, c5 b4, e3 d4, c8 g4, d2 e3',
    'c7 c5, e2 e3, d8 a5, c1 d2, a5 b6, b2 b4, d4 e3, d2 e3, b6 b4, e3 d2, ' +
        'b4 b6, b1 c3, b8 c6, f1 d3',
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: true
  };
};