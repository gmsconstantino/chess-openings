var getOpening_albin = function() {
  var opening = 'd2 d4, d7 d5, c2 c4, e7 e5, d4 e5, d5 d4, g1 f3';
  var continuations = [
    // 4 ... Bb4+ 5 Bd2
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, a7 a6, b5 d6, e8 f8, c4 c5',
    'f8 b4, c1 d2, b4 d2, d1 d2, c7 c5, e2 e3, b8 c6, e3 d4, c5 d4, b1 a3, ' +
        'g8 e7, a3 b5, e8 g8, b5 d4',
    'f8 b4, c1 d2, b4 d2, d1 d2, b8 c6, e2 e3, d4 e3, d2 e3',
    'f8 b4, c1 d2, c7 c5, d2 b4, c5 b4, d1 d4, d8 d4, f3 d4',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, c5 d4, d2 b4',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c6 b4, f3 d4, d8 a5, a2 a3',
    'f8 b4, c1 d2, b8 c6, d2 b4, c6 b4, b1 a3, c7 c5, a3 b5, a7 a6, b5 d6, ' +
        'e8 f8, d1 d2, b4 c6, b2 b4, c5 b4, f3 d4, c6 e5, d2 b4'
    // 4 ... Bb4+
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: true
  };
};