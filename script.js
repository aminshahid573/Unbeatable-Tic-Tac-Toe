let board = ['', '', '', '', '', '', '', '', ''];
let player, ai;
let currentPlayer;
let player1Name = "Player 1";
let player2Name = "Player 2";
let gameMode = "ai"; // Default mode is AI
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');

cells.forEach(cell => cell.addEventListener('click', handleClick));

function selectMode(mode) {
    gameMode = mode;
    document.getElementById('mode-selector').style.display = 'none';
    
    if (mode === 'ai') {
        document.getElementById('symbol-selector').style.display = 'block';
    } else if (mode === 'friend') {
        document.getElementById('friend-mode').style.display = 'block';
    }
}

function selectSymbol(symbol) {
    player = symbol;
    ai = symbol === 'X' ? 'O' : 'X';
    document.getElementById('symbol-selector').style.display = 'none';
    document.getElementById('turn-selector').style.display = 'block';
}

function startGame(firstPlayer) {
    document.getElementById('turn-selector').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('reset-btn').style.display = 'block';
    document.getElementById('home-btn').style.display = 'block';
    currentPlayer = firstPlayer;
    if (firstPlayer === 'ai') {
        makeMove(bestMove(), ai);
    }
}

function startFriendGame() {
    player1Name = document.getElementById('player1-name').value || "Player 1";
    player2Name = document.getElementById('player2-name').value || "Player 2";
    
    document.getElementById('friend-mode').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('reset-btn').style.display = 'block';
    document.getElementById('home-btn').style.display = 'block';
    currentPlayer = player1Name; // Player 1 starts first
}

function handleClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] === '' && !checkWinner(board, player) && !checkWinner(board, ai)) {
        if (gameMode === 'ai') {
            makeMove(index, player);
            if (!checkWinner(board, player) && !isBoardFull(board)) {
                makeMove(bestMove(), ai);
            }
        } else if (gameMode === 'friend') {
            makeMove(index, currentPlayer === player1Name ? 'X' : 'O');
            currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
        }
    }
}

function makeMove(index, currentPlayer) {
    board[index] = currentPlayer;
    const span = cells[index].querySelector('span');
    span.textContent = currentPlayer;
    span.classList.add('show');
    
    if (checkWinner(board, currentPlayer)) {
        result.innerText = gameMode === 'ai' ? (currentPlayer === player ? 'You win!' : 'Computer wins!') : `${currentPlayer === 'X' ? player1Name : player2Name} wins!`;
    } else if (isBoardFull(board)) {
        result.innerText = 'It\'s a tie!';
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = ai;
            let score = minimax(board, 0, false, -Infinity, Infinity);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(newBoard, depth, isMaximizing, alpha, beta) {
    let scores = { [ai]: 10, [player]: -10, 'tie': 0 };
    let result = checkWinner(newBoard, ai) ? ai : (checkWinner(newBoard, player) ? player : (isBoardFull(newBoard) ? 'tie' : null));

    if (result !== null) {
        return scores[result] - depth;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = ai;
                let score = minimax(newBoard, depth + 1, false, alpha, beta);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = player;
                let score = minimax(newBoard, depth + 1, true, alpha, beta);
                newBoard[i] = '';
                bestScore = Math.min(score, bestScore);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) {
                    break;
                }
            }
        }
        return bestScore;
    }
}

function checkWinner(board, currentPlayer) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => pattern.every(index => board[index] === currentPlayer));
}

function isBoardFull(board) {
    return board.every(cell => cell !== '');
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.querySelector('span').textContent = '';
        cell.querySelector('span').classList.remove('show');
    });
    result.innerText = '';
}

function navigateHome() {
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('home-btn').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('mode-selector').style.display = 'block';
    resetBoard();
}
