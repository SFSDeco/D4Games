document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');
    const cells = [];
    let currentPlayer = 'X';
    let isGameOver = false;
    let winCount = 0;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Erstelle das Spielfeld
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cells.push(cell);
        board.appendChild(cell);
        cell.addEventListener('click', handleCellClick);
    }

    function handleCellClick(e) {
        if (isGameOver || e.target.textContent !== '') return;
        const cellIndex = parseInt(e.target.dataset.index);
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].style.pointerEvents = 'none';
        if (checkForWin(currentPlayer)) {
            handleGameOver(`Player ${currentPlayer} wins!`);
        } 
        else if (checkForDraw()) {
            handleGameOver("It's a draw!");
        } 
        else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setTimeout(makeComputerMove, 500);
        }
    }

    
    function makeComputerMove() {

        const availableCells = cells.filter(cell => cell.textContent === '');
        if (Math.random() < 0.5 && availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const randomCell = availableCells[randomIndex];
            const cellIndex = parseInt(randomCell.dataset.index);
            
            randomCell.textContent = currentPlayer;
            randomCell.style.pointerEvents = 'none';
            
            if (checkForWin(currentPlayer)) {
                handleGameOver(`Computer wins!`);
            } 
            else if (checkForDraw()) {
                handleGameOver("It's a draw!");
            } 
            else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        } 
        else {
            if (availableCells.length > 0) {
                let bestScore = -Infinity;
                let bestMove;
                availableCells.forEach(cell => {
                    const cellIndex = parseInt(cell.dataset.index);
                    cells[cellIndex].textContent = currentPlayer;
                    const score = minimax(cells, 0, false);
                    cells[cellIndex].textContent = '';
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = cellIndex;
                    }
                });
                cells[bestMove].textContent = currentPlayer;
                cells[bestMove].style.pointerEvents = 'none';
                if (checkForWin(currentPlayer)) {
                    handleGameOver(`Computer wins!`);
                } else if (checkForDraw()) {
                    handleGameOver("It's a draw!");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }
    }

    function minimax(board, depth, isMaximizing) {
        const scores = {
            X: -1,
            O: 1,
            draw: 0
        };

        if (checkForWin('X')) {
            return scores.X;
        } else if (checkForWin('O')) {
            return scores.O;
        } else if (checkForDraw()) {
            return scores.draw;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            board.forEach((cell, index) => {
                if (cell.textContent === '') {
                    board[index].textContent = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[index].textContent = '';
                    bestScore = Math.max(score, bestScore);
                }
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            board.forEach((cell, index) => {
                if (cell.textContent === '') {
                    board[index].textContent = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[index].textContent = '';
                    bestScore = Math.min(score, bestScore);
                }
            });
            return bestScore;
        }
    }

    function checkForWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => cells[index].textContent === player);
        });
    }

    function checkForDraw() {
        return cells.every(cell => cell.textContent !== '');
    }

    function handleGameOver(message) {
        alert(message);
        isGameOver = true;
        if (message.includes('Player')) {
            winCount++;
            document.getElementById('winCount').textContent = winCount;
        }
        else{
            var finalScore = winCount;
            $.ajax({
                type:"GET",
                url: "../Backend/servicehandler.php",
                data: {method: "setLeader", param: finalScore},
                success: function(response){
                  console.log(response);
                  loadLeaderboard();
                },
                error: function(a, b, c){
                  console.log(a+"\n"+b+"\n"+c);
                }
            })
            winCount=0;
            document.getElementById('winCount').textContent = winCount
        }
        resetGame();
    }

    function resetGame() {
        currentPlayer = 'X';
        
        isGameOver = false;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
        });
        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500);
        }
    }
});