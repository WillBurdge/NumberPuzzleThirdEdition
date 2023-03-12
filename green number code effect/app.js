// Define the game board size
const ROWS = 3;
const COLS = 3;

// Define the puzzle pieces
const PIECES = ['1', '2', '3', '4', '5', '6', '7', '8', ''];

// Initialize the game board
let board = [];

// Shuffle the puzzle pieces
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Populate the game board with the shuffled pieces
function createBoard() {
  board = [];
  let pieces = shuffle([...PIECES]);
  for (let i = 0; i < ROWS; i++) {
    let row = [];
    for (let j = 0; j < COLS; j++) {
      row.push(pieces.pop());
    }
    board.push(row);
  }
}

// Define a function to print the game board
function printBoard() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.textContent = board[i][j];
      if (board[i][j] === '') {
        tile.classList.add('selected');
      }
      tile.addEventListener('click', () => {
        moveTile(i, j);
      });
      gameBoard.appendChild(tile);
    }
  }
}

// Define a function to check if the puzzle is solved
function isSolved() {
  const solvedBoard = [...PIECES];
  solvedBoard.splice(8, 1);
  return board.flat().join('') === solvedBoard.join('');
}

// Define a function to move the selected tile
function moveTile(row, col) {
  if (board[row][col] === '') {
    return;
  }
  if (row > 0 && board[row - 1][col] === '') {
    [board[row][col], board[row - 1][col]] = [board[row - 1][col], board[row][col]];
  }
  else if (col > 0 && board[row][col - 1] === '') {
    [board[row][col], board[row][col - 1]] = [board[row][col - 1], board[row][col]];
  }
  else if (row < ROWS - 1 && board[row + 1][col] === '') {
    [board[row][col], board[row + 1][col]] = [board[row + 1][col], board[row][col]];
  }
  else if (col < COLS - 1 && board[row][col + 1] === '') {
    [board[row][col], board[row][col + 1]] = [board[row][col + 1], board[row][col]];
  }
  printBoard();
  if (isSolved()) {
    clearInterval(timerInterval);
    alert('Congratulations! You solved the puzzle!');
  }
}

// Define the timer
let timeLeft = 30;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => { 
   // decrement the timeLeft variable
timeLeft--; 
// Update the timer display
const timerDisplay = document.getElementById('timer');
timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;

// If time runs out, stop the timer and end the game
if (timeLeft === 0) {
  clearInterval(timerInterval);
  alert('Game Over! Time has run out.');
}
}, 1000);
}

// Call the createBoard and printBoard functions to start the game
createBoard();
printBoard();

// Call the startTimer function to start the timer
startTimer();
