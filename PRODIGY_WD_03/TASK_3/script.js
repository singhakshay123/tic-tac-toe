const board = document.getElementById('board');
const result = document.getElementById('result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create the Tic Tac Toe board
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

// Handle cell click event
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            result.textContent = `${currentPlayer} wins!`;
            gameActive = false;
        } else if (isBoardFull()) {
            result.textContent = 'It\'s a tie!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinnerCells(combination);
            return true;
        }
    }

    return false;
}

// Check if the board is full
function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

// Highlight the cells that form a winning combination
function highlightWinnerCells(combination) {
    for (const index of combination) {
        board.children[index].classList.add('winner');
    }
}

// Reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    result.textContent = '';
    board.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
}
