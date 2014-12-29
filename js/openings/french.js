var getOpening_frenchAdvance = function() {
  var opening = 'e2 e4, e7 e6, d2 d4, d7 d5, e4 e5, c7 c5';
  var continuations = [
    // 4 c3 Nc6 5 Nf3 Qb6 6 a3 c4
    'c2 c3, b8 c6, g1 f3, d8 b6, a2 a3, c5 c4',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Bd3 cxd4
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 d3, c5 d4, c3 d4, c8 d7, e1 g1, c6 d4, ' +
        'f3 d4, b6 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 d3, c5 d4, f3 d4, c6 e5',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 Nxd4? Nxe5 8 Bf4 Bd6 9 Be3 Qd8
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, f3 d4, c6 e5, c1 f4, f8 d6, ' +
        'f4 e3, b6 d8',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Bd3 Bd7
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, e2 d3, c8 d7',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Nc3 Nf5
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b1 c3, h6 f5',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Bxh6 Qxb2
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'e1 g1, g7 h6, b1 d2, c6 d4, f3 d4, b2 d4, e2 b5, c8 d7, b5 d7, ' +
        'e8 d7, d1 b3, d4 b4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'e1 g1, g7 h6, b1 d2, c6 d4, a1 b1, d4 e2, d1 e2, b2 a3, e2 b5, ' +
        'c8 d7, b5 b7, a8 c8',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 g7, f8 g7, b1 d2, c6 d4, f3 d4, b2 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 g7, f8 g7, b1 d2, c6 d4, d1 a4, d4 c6, a1 b1, b2 c3',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 e3, b2 a1',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'h6 d2, b2 a1',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, c1 h6, b6 b2, ' +
        'b1 c3, b2 c3, h6 d2, c3 a3',

    // 4 c3 Nc6 5 Nf3 Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 b3? Bb4+
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'e1 f1, e8 g8',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'c1 d2, h6 f5, d2 b4, b6 b4, d1 d2, f5 d4, d2 b4, d4 f3, e2 f3, c6 b4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'c1 d2, h6 f5, d2 b4, b6 b4, d1 d2, f5 d4, f3 d4, b4 d4, d2 d4, c6 d4',
    'c2 c3, b8 c6, g1 f3, d8 b6, f1 e2, c5 d4, c3 d4, g8 h6, b2 b3, f8 b4, ' +
        'b1 d2, c6 d4, f3 d4, b6 d4, a1 b1, d4 e5, e1 g1, e8 g8',

    // 4 c3 Nc6 5 Be3 Qb6 6 Qd2 Bd7 7 Nf3 Rc8
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, d4 c5, f8 c5, ' +
        'e3 c5, b6 c5',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 e2, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',
    'c2 c3, b8 c6, c1 e3, d8 b6, d1 d2, c8 d7, g1 f3, a8 c8, f1 d3, c5 d4, ' +
        'c3 d4, f8 b4, b1 c3, c6 a5, e1 g1, a5 c4',

    // 4 c3 Nc6 5 Be3 Qb6 6 b3? cxd4
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, e3 d2, b6 d4, ' +
        'd2 b4, d4 e5, g1 e2, c6 b4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, c3 d4, f8 b4, b1 d2, b4 c3, ' +
        'a1 c1, c3 b2, c1 b1, b2 d4',
    'c2 c3, b8 c6, c1 e3, d8 b6, b2 b3, c5 d4, e3 d4, c6 d4, c3 d4, f8 b4, ' +
        'b1 d2, b4 c3, a1 c1, c3 b2, c1 b1, b2 d4',

    // 4 Nf3 cxd4
    'g1 f3, c5 d4, f1 d3, b8 c6, e1 g1, g8 e7, b1 d2, e7 g6',
    'g1 f3, c5 d4, f1 d3, b8 c6, f3 g5, c6 e5, g5 h7, e5 d3, d1 d3, f8 e7',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 f4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6, ' +
        'f3 g5, f7 f6, e5 f6, g7 f6, g5 f3, f8 h6',
    'g1 f3, c5 d4, d1 d4, b8 c6, d4 g4, g8 e7, f1 d3, e7 g6, d3 g6, h7 g6',
    'g1 f3, c5 d4, d1 d4, b8 c6, f1 b5, c8 d7, b5 c6, b7 c6',
    'g1 f3, c5 d4, f3 d4, b8 c6, d4 c6, b7 c6',

    // 4 dxc5 Bxc5
    'd4 c5, f8 c5, d1 g4, e8 f8, f1 d3, d8 b6',
    'd4 c5, f8 c5, g1 f3, b8 c6'
  ];
  return {
    lines: getLinesFromOpening(opening, continuations),
    isWhite: false
  };
};