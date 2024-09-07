let board = ['', '', '', '', '', '', '', '', ''];
let player, ai;
let currentPlayer;
let player1Name = "Player 1";
let player2Name = "Player 2";
let gameMode = "ai"; // Default mode is AI
const cells = document.querySelectorAll('.cell');
const result = document.getElementById('result');
const endgamePopup = document.querySelector('.endgame');
const endgameMessage = document.querySelector('.endgame .msg');
const endgameNewgameBtn = document.querySelector('.endgame-newgame');

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
    const cell = cells[index];
    const span = cell.querySelector('span');
    cell.classList.remove('x', 'o');
    cell.classList.add(currentPlayer.toLowerCase());
    cell.setAttribute('data-hover', currentPlayer); // Set hover effect text
    span.textContent = currentPlayer;
    span.classList.add('show');
    
    if (checkWinner(board, currentPlayer)) {
        showEndgamePopup(currentPlayer === player ? 'player' : 'ai');
    } else if (isBoardFull(board)) {
        showEndgamePopup('draw');
    }
}

function showEndgamePopup(resultType) {
    endgamePopup.style.display = 'block';
    if (resultType === 'player') {
        endgameMessage.className = 'msg msg--x-win';
        endgameMessage.textContent = gameMode === 'ai' ? 'You win!' : `${player1Name} wins!`;
    } else if (resultType === 'ai') {
        endgameMessage.className = 'msg msg--o-win';
        endgameMessage.textContent = gameMode === 'ai' ? 'Computer wins!' : `${player2Name} wins!`;
    } else if (resultType === 'draw') {
        endgameMessage.className = 'msg msg--draw';
        endgameMessage.textContent = 'It\'s a tie!';
    }
}

endgameNewgameBtn.addEventListener('click', () => {
    resetBoard();
    endgamePopup.style.display = 'none'; // Ensure popup is hidden
});

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.setAttribute('data-hover', ''); // Clear hover text
        const span = cell.querySelector('span');
        span.classList.remove('show');
        span.textContent = '';
    });
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('reset-btn').style.display = 'none';
    document.getElementById('home-btn').style.display = 'none';
    document.getElementById('mode-selector').style.display = 'block';
}

function checkWinner(board, player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function isBoardFull(board) {
    return board.every(cell => cell !== '');
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
    if (checkWinner(newBoard, ai)) return 10 - depth;
    if (checkWinner(newBoard, player)) return depth - 10;
    if (isBoardFull(newBoard)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = ai;
                let score = minimax(newBoard, depth + 1, false, alpha, beta);
                newBoard[i] = '';
                bestScore = Math.max(score, bestScore);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
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
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
}
