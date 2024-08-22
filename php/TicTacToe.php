/* PHP Version of Tic Tac Toe
  * To Play: run "php TicTacToe.php" in the terminal.
*/

<?php
class TicTacToe {
    // Store game state
    private $gameState = ["", "", "", "", "", "", "", "", ""];
    
    // Store current player
    private $currentPlayer = "X";
    
    // Pause game in case of an end scenario
    private $gameActive = true;

    // Display the game board
    private function printBoard() {
        for ($i = 0; $i < count($this->gameState); $i++) {
            echo $this->gameState[$i] === "" ? ($i + 1) : $this->gameState[$i];
            
            if (($i + 1) % 3 !== 0) {
                echo " | ";
            } else if ($i !== 8) {
                echo "\n---------\n";
            }
        }
        echo "\n";
    }

    // Handle the player's move
    private function handleCellPlayed($index) {
        $this->gameState[$index] = $this->currentPlayer;
    }

    // Change the current player
    private function handlePlayerChange() {
        $this->currentPlayer = $this->currentPlayer === "X" ? "O" : "X";
        
        // If the current player is O (computer), make a move
        if ($this->currentPlayer === "O") {
            $this->handleComputerMove();
        }
    }

    // Validate the game result
    private function handleResultValidation() {
        $winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        $roundWon = false;

        foreach ($winningConditions as $winCondition) {
            $a = $this->gameState[$winCondition[0]];
            $b = $this->gameState[$winCondition[1]];
            $c = $this->gameState[$winCondition[2]];

            if ($a === "" || $b === "" || $c === "") {
                continue;
            }

            if ($a === $b && $b === $c) {
                $roundWon = true;
                break;
            }
        }

        if ($roundWon) {
            echo "Player " . $this->currentPlayer . " has won!\n";
            $this->gameActive = false;
            return;
        }

        $roundDraw = true;
        foreach ($this->gameState as $cell) {
            if ($cell === "") {
                $roundDraw = false;
                break;
            }
        }

        if ($roundDraw) {
            echo "Game ended in a draw!\n";
            $this->gameActive = false;
            return;
        }

        $this->handlePlayerChange();
    }

    // Handle player's input
    private function handleCellClick() {
        echo "Player " . $this->currentPlayer . ", choose your move (1-9):\n";
        $cellIndex = intval(trim(fgets(STDIN))) - 1;

        if ($cellIndex < 0 || $cellIndex > 8 || $this->gameState[$cellIndex] !== "") {
            echo "Invalid move. Try again.\n";
            $this->handleCellClick();
        } else {
            $this->handleCellPlayed($cellIndex);
            $this->printBoard();
            $this->handleResultValidation();
        }
    }

    // Computer makes a move by choosing a random available cell
    private function handleComputerMove() {
        $cellIndex = rand(0, 8);

        while ($this->gameState[$cellIndex] !== "") {
            $cellIndex = rand(0, 8);
        }

        echo "Computer chooses: " . ($cellIndex + 1) . "\n";
        $this->handleCellPlayed($cellIndex);
        $this->printBoard();
        $this->handleResultValidation();
    }

    // Restart the game
    private function handleRestartGame() {
        $this->gameActive = true;
        $this->currentPlayer = "X";
        $this->gameState = ["", "", "", "", "", "", "", "", ""];
        echo "Game restarted!\n";
        $this->printBoard();
    }

    public function startGame() {
        echo "Welcome to Tic Tac Toe!\n";
        $this->printBoard();

        while ($this->gameActive) {
            $this->handleCellClick();
        }

        echo "Do you want to play again? (yes/no)\n";
        $playAgain = trim(fgets(STDIN));

        if (strtolower($playAgain) === "yes") {
            $this->handleRestartGame();
            $this->startGame();
        } else {
            echo "Thanks for playing!\n";
        }
    }
}

// Start the game
$ticTacToe = new TicTacToe();
$ticTacToe->startGame();
?>
