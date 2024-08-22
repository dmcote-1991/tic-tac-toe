/*
 * JavaScript Version of Tic Tac Toe
 */

/*
Store game status element 
*/
const statusDisplay = document.querySelector(".game--status");

/*
Pause game in case of an end scenario
*/
let gameActive = true;

/*
Store current player
*/
let currentPlayer = "X";

/*
Store current game state
*/
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/*
Set initial message
*/
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * Updates the internal game state to reflect the played move,
 * as well as updates the user interface to reflect the played move
 *
 * @param {HTMLElement} clickedCell - the .target of our click event
 * @param {number} clickedCellIndex - the index of the cell that has been clicked
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

/**
 * Changes the current player and updates the game status message to reflect the change
 */
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();

  if (currentPlayer === "O") {
    setTimeout(handleComputerMove, 500); // Add a small delay for a more natural feel
  }
}

/**
 * Checks whether the game ended in a win, draw, or if there are still moves to be played
 */
function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");

  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

/**
 * Checks if the clicked cell has already been clicked and if it hasn't
 * continues the game flow
 *
 * @param {Event} clickedCellEvent - the ClickEvent from the cell event listener
 */
function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );
  if (
    gameState[clickedCellIndex] !== "" ||
    !gameActive ||
    currentPlayer === "O"
  ) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

/**
 * Computer makes a move by choosing a random available cell
 */
function handleComputerMove() {
  if (!gameActive) return;

  const availableCells = gameState
    .map((cell, index) => (cell === "" ? index : null))
    .filter((index) => index !== null);

  if (availableCells.length === 0) return;

  const randomCellIndex =
    availableCells[Math.floor(Math.random() * availableCells.length)];
  const clickedCell = document.querySelector(
    `[data-cell-index='${randomCellIndex}']`
  );

  handleCellPlayed(clickedCell, randomCellIndex);
  handleResultValidation();
}

/**
 * Resets game tracking variables back to default values, clears the game board by removing all symbols
 * and updates the game status back to the current player message
 */
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

/*
Event listeners for game cells and restart button
*/
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
