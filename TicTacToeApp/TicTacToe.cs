/* C# Version of Tic Tac Toe

  * UI Handling: Since there's no DOM in a console application, 
    I used the console for user interaction.

  * Input Handling: Users select their move by entering a number 
    between 1 and 9.

  * Game State: The game state is displayed as a 3x3 grid in the 
    console, with numbers representing available cells.

  * To Play: run "dotnet run" in the terminal.
    
*/

using System;
using System.Linq;

class Program
{
    // Stores the current state of the game board
    static string[] gameState = { "", "", "", "", "", "", "", "", "" };

    // Indicates if the game is still active
    static bool gameActive = true;

    // Tracks the current player ("X" or "O")
    static string currentPlayer = "X";

    static void Main()
    {
        // Main game loop runs until the game is no longer active
        while (gameActive)
        {
            // Display the game board to the console
            DisplayBoard();

            // Inform the current player of their turn
            Console.WriteLine($"It's {currentPlayer}'s turn");

            // Get the player's move and handle the cell they selected
            int cellIndex = GetPlayerMove();
            HandleCellPlayed(cellIndex);

            // Validate the result after the move (win, draw, or continue)
            HandleResultValidation();
        }

        // Display the final board state after the game ends
        DisplayBoard();
    }

    // Displays the current game board in the console
    static void DisplayBoard()
    {
        Console.Clear(); // Clear the console for a fresh display
        Console.WriteLine($"{GetCell(0)} | {GetCell(1)} | {GetCell(2)}");
        Console.WriteLine("--+---+--");
        Console.WriteLine($"{GetCell(3)} | {GetCell(4)} | {GetCell(5)}");
        Console.WriteLine("--+---+--");
        Console.WriteLine($"{GetCell(6)} | {GetCell(7)} | {GetCell(8)}");
    }

    // Returns the current value of a cell or its index if empty
    static string GetCell(int index)
    {
        return gameState[index] == "" ? (index + 1).ToString() : gameState[index];
    }

    // Prompts the player for their move and returns the selected cell index
    static int GetPlayerMove()
    {
        int cellIndex;

        while (true)
        {
            Console.Write("Choose your move (1-9): "); // Prompt for input
            string input = Console.ReadLine();

            // Validate input and ensure the selected cell is empty
            if (int.TryParse(input, out cellIndex) && cellIndex >= 1 && cellIndex <= 9 && gameState[cellIndex - 1] == "")
            {
                return cellIndex - 1; // Return the valid cell index
            }

            Console.WriteLine("Invalid move! Try again."); // Inform the user of invalid input
        }
    }

    // Marks the selected cell with the current player's symbol
    static void HandleCellPlayed(int cellIndex)
    {
        gameState[cellIndex] = currentPlayer;
    }

    // Switches the current player to the other one
    static void HandlePlayerChange()
    {
        currentPlayer = currentPlayer == "X" ? "O" : "X";
    }

    // Checks if the game has been won, drawn, or should continue
    static void HandleResultValidation()
    {
        // Possible winning combinations of cells
        int[][] winningConditions = {
            new[] {0, 1, 2},
            new[] {3, 4, 5},
            new[] {6, 7, 8},
            new[] {0, 3, 6},
            new[] {1, 4, 7},
            new[] {2, 5, 8},
            new[] {0, 4, 8},
            new[] {2, 4, 6}
        };

        // Check if any winning condition is met
        bool roundWon = winningConditions.Any(condition =>
            gameState[condition[0]] == currentPlayer &&
            gameState[condition[1]] == currentPlayer &&
            gameState[condition[2]] == currentPlayer
        );

        // If a player has won, display a message and end the game
        if (roundWon)
        {
            Console.WriteLine($"Player {currentPlayer} has won!");
            gameActive = false;
            return;
        }

        // Check for a draw if all cells are filled
        bool roundDraw = !gameState.Contains("");
        if (roundDraw)
        {
            Console.WriteLine("Game ended in a draw!");
            gameActive = false;
            return;
        }

        // If no win or draw, switch to the other player and continue
        HandlePlayerChange();
    }
}
