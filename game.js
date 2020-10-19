const gameoverMoves = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11], [12, 13, 14], [15, 16, 17], [18, 19, 20],
    [21, 22, 23], [24, 25, 26], [0, 3, 6], [1, 4, 7], [2, 5, 8], [9, 12, 15], [8, 13, 18],
    [10, 13, 16], [11, 14, 17], [18, 21, 24], [19, 22, 25], [20, 23, 26],
    [0, 4, 8], [2, 4, 6], [9, 13, 17], [11, 13, 15], [18, 22, 26], [20, 22, 24],
    [0, 9, 18], [1, 10, 19], [2, 11, 20], [3, 12, 21], [4, 13, 22], [5, 14, 23],
    [6, 15, 24], [7, 16, 25], [8, 17, 26], [0, 12, 24], [1, 13, 25], [2, 14, 26],
    [6, 12, 18], [7, 13, 19], [8, 14, 20], [0, 10, 20], [3, 13, 23], [6, 16, 26],
    [2, 10, 18], [5, 13, 21], [8, 16, 24], [0, 13, 26], [2, 13, 24], [6, 13, 20]
];

const posInf = Number.POSITIVE_INFINITY;
const negInf = Number.NEGATIVE_INFINITY;

const validMoves = board => {
    let moves = [];
    let count = 0;
    for (let i = 0; i < 18; i++) {
        if (!board[i].selected) {
            moves.push(i);
            count++;
        }
    }
    return { moves, count };
}

const gameOver = board => {
    for (const move of gameoverMoves) {
        const [ pos1, pos2, pos3 ] = move;
        const g1 = board[pos1];
        const g2 = board[pos2];
        const g3 = board[pos3];
        if (!(g1.selected && g2.selected && g3.selected)) continue;
        const moveSum = g1.player + g2.player + g3.player;
        if (moveSum === 3) { // player 1 wins
            return 'B';
        } else if (moveSum === 0) { // player 0 wins
            return 'A';
        }
    }
    const { moves, count } = validMoves(board);
    if (count === 0) return 'Draw';
    return null;
}

const scores = {
    A: 10,
    B: -10,
    Draw: 0
}

// AI minimax
const minimax = (grids, depth, isMaximizer) => {
    const _winner = gameOver(grids);
    if (_winner || depth === 4) {
        return scores[_winner];
    }

    const { moves, count } = validMoves(board);
    if (isMaximizer) {
        let maxScore = -1000;
        for (const move of moves) {
            board[move].selected = true;
            board[move].player = 0; // AI
            let score = minimax(board, depth + 1, false);
            board[move].selected = false;
            board[move].player = '';
            maxScore = score > maxScore ? score : maxScore;
        }
        return maxScore;
    } else {
        let minScore = 1000;
        for (const move of moves) {
            board[move].selected = true;
            board[move].player = 1; // human
            let score = minimax(board, depth + 1, true);
            board[move].selected = false;
            board[move].player = '';
            minScore = score < minScore ? score : minScore;
        }
        return minScore;
    }
}

const AImove = () => {
    const { moves, count } = validMoves(grids);
    let maxScore = negInf;
    let bestMove = 0;
    for (let move of moves) {
        grids[move].selected = true;
        grids[move].player = 0;
        let score = minimax(grids, 0, false);
        grids[move].selected = false;
        grids[move].player = '';
        if (score > maxScore) {
            maxScore = score;
            bestMove = move;
        }
    }
    // }
    grids[bestMove].selected = true;
    grids[bestMove].player = 0;
    grids[bestMove].markColor = 'rgb(231, 76, 60)';
    playerA = false; // Human
}