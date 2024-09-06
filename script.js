let board = ['', '', '', '', '', '', '', '', ''];
        const player = 'O';
        const ai = 'X';
        const cells = document.querySelectorAll('.cell');
        const result = document.getElementById('result');
        let currentPlayer = '';

        cells.forEach(cell => cell.addEventListener('click', handleClick));

        function startGame(firstPlayer) {
            document.getElementById('turn-selector').style.display = 'none';
            document.getElementById('game-board').style.display = 'grid';
            document.querySelector('button[onclick="resetGame()"]').style.display = 'block';
            
            currentPlayer = firstPlayer;
            if (firstPlayer === 'ai') {
                makeMove(bestMove(), ai);
            }
        }

        function handleClick(e) {
            const index = e.target.getAttribute('data-index');

            if (board[index] === '' && !checkWinner(board, player) && !checkWinner(board, ai)) {
                makeMove(index, player);
                if (!checkWinner(board, player) && !isBoardFull(board)) {
                    makeMove(bestMove(), ai);
                }
            }
        }

        function makeMove(index, currentPlayer) {
            board[index] = currentPlayer;
            const span = cells[index].querySelector('span');
            span.textContent = currentPlayer;
            span.classList.add('show');
            
            if (checkWinner(board, currentPlayer)) {
                result.innerText = currentPlayer === player ? 'You win!' : 'Computer wins!';
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
            let scores = { 'X': 10, 'O': -10, 'tie': 0 };
            let result = checkWinner(newBoard, ai) ? 'X' : (checkWinner(newBoard, player) ? 'O' : (isBoardFull(newBoard) ? 'tie' : null));

            if (result !== null) {
                return scores[result] - depth;  // Subtract depth to prioritize faster wins
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

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            cells.forEach(cell => {
                cell.querySelector('span').textContent = '';
                cell.querySelector('span').classList.remove('show');
            });
            result.innerText = '';
            document.getElementById('game-board').style.display = 'none';
            document.querySelector('button[onclick="resetGame()"]').style.display = 'none';
            document.getElementById('turn-selector').style.display = 'block';
        }