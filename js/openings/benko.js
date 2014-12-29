var getOpening_benkoFullyAccepted = function() {
  var opening = 'd2 d4, g8 f6, c2 c4, c7 c5, d4 d5, b7 b5, c4 b5, a7 a6, ' +
      'b5 a6, g7 g6';
  var continuations = [
    // 6. Nc3
    'b1 c3, c8 a6, g1 f3, d7 d6, c1 g5, f8 g7',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, e2 e4, a6 f1, e1 f1, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, g2 g3, f8 g7, f1 h3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, g1 f3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, h2 h3, b8 d7, ' +
        'f1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, a1 b1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, g1 h3, b8 d7, h3 f4, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, a1 b1, b8 d7, g1 f3, e8 g8',
    'b1 c3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, a1 b1, b8 d7, b2 b3, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g1 f3, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g2 g3, f8 g7, g1 f3, b8 d7, ' +
        'f1 g2, e8 g8',
    'b1 c3, c8 a6, e2 e4, a6 f1, e1 f1, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, ' +
        'g1 f3, e8 g8',

    // 6. g3
    'g2 g3, c8 a6, b1 c3, d7 d6, f1 g2, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, f1 g2, f8 g7, g1 h3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g1 f3, b8 d7, ' +
        'f1 g2, e8 g8',
    'g2 g3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, f1 g2, b8 d7, ' +
        'g1 f3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 h3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 h3, b8 d7, h3 f4, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b1 c3, f8 g7, g1 f3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b2 b3, f8 g7, c1 b2, b8 d7, g1 h3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, b2 b3, f8 g7, c1 b2, b8 d7, g1 f3, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, g1 f3, f8 g7, b1 c3, b8 d7, e1 g1, e8 g8',
    'g2 g3, c8 a6, f1 g2, d7 d6, g1 f3, f8 g7, e1 g1, b8 d7, b1 c3, e8 g8',

    'g2 g3, c8 a6, b2 b3, f8 g7, c1 b2, d7 d6, f1 g2, b8 d7, g1 h3, e8 g8',
    'g2 g3, c8 a6, b2 b3, f8 g7, c1 b2, d7 d6, f1 g2, b8 d7, g1 f3, e8 g8',

    // 6. Nf3
    'g1 f3, c8 a6, b1 c3, d7 d6, g2 g3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'g1 f3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, g2 g3, b8 d7, ' +
        'f1 g2, e8 g8',
    'g1 f3, c8 a6, b1 c3, d7 d6, e2 e4, a6 f1, e1 f1, f8 g7, h2 h3, b8 d7, ' +
        'f1 g1, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, b1 c3, f8 g7, f1 g2, b8 d7, e1 g1, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, e1 g1, b8 d7, b1 c3, e8 g8',
    'g1 f3, c8 a6, g2 g3, d7 d6, f1 g2, f8 g7, e1 g1, b8 d7, f1 e1, e8 g8',

    // 6. b3
    'b2 b3, f8 g7, c1 b2, c8 a6, g2 g3, d7 d6, f1 g2, b8 d7, g1 h3, e8 g8',

    // 6. e3
    'e2 e3, d7 d6, b1 c3, f8 g7, g1 f3, e8 g8, e3 e4, b8 d7, f1 e2, c8 a6',
    'e2 e3, d7 d6, b1 c3, f8 g7, f1 b5, b8 d7, g1 f3, c8 a6',
    'e2 e3, d7 d6, b1 c3, f8 g7, e3 e4, e8 g8, f2 f4, d8 a5, c1 d2, c8 a6, ' +
        'f1 a6, b8 a6, g1 f3, a6 b4, e1 g1, c5 c4',
    'e2 e3, d7 d6, b1 c3, f8 g7, e3 e4, e8 g8, g1 f3, b8 d7, f1 e2, c8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, f1 e2, c8 a6, e1 g1, b8 d7, ' +
        'e2 a6, a8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, f1 c4, c8 a6, c4 a6, b8 a6',
    'e2 e3, d7 d6, g1 f3, f8 g7, b1 c3, e8 g8, e3 e4, b8 d7'
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: false
  };
};