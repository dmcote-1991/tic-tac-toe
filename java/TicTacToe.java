package java;

import java.util.Scanner;
import java.util.Random;

public class TicTacToe {
    // Store game state
    private static String[] gameState = { "", "", "", "", "", "", "", "", "" };

    // Store current player
    private static String currentPlayer = "X";

    // Pause game in case of an end scenario
    private static boolean gameActive = true;

    // Scanner for user input
    private static Scanner scanner = new Scanner(System.in);

    // Display the game board
    private static void printBoard() {
        for (int i = 0; i < gameState.length; i++) {
            if (gameState[i].equals("")) {
                System.out.print((i + 1));
            } else {
                System.out.print(gameState[i]);
            }

            if ((i + 1) % 3 != 0) {
                System.out.print(" | ");
            } else if (i != 8) {
                System.out.println("\n---------");
            }
        }
        System.out.println();
    }

    // Handle the player's move
    private static void handleCellPlayed(int index) {
        gameState[index] = currentPlayer;
    }

    // Change the current player
    private static void handlePlayerChange() {
        currentPlayer = currentPlayer.equals("X") ? "O" : "X";

        // If the current player is O (computer), make a move
        if (currentPlayer.equals("O")) {
            handleComputerMove();
        }
    }

    // Validate the game result
    private static void handleResultValidation() {
        int[][] winningConditions = {
                { 0, 1, 2 }, { 3, 4, 5 }, { 6, 7, 8 },
                { 0, 3, 6 }, { 1, 4, 7 }, { 2, 5, 8 },
                { 0, 4, 8 }, { 2, 4, 6 }
        };

        boolean roundWon = false;

        for (int i = 0; i < winningConditions.length; i++) {
            int[] winCondition = winningConditions[i];
            String a = gameState[winCondition[0]];
            String b = gameState[winCondition[1]];
            String c = gameState[winCondition[2]];

            if (a.equals("") || b.equals("") || c.equals("")) {
                continue;
            }

            if (a.equals(b) && b.equals(c)) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            System.out.println("Player " + currentPlayer + " has won!");
            gameActive = false;
            return;
        }

        boolean roundDraw = true;
        for (String cell : gameState) {
            if (cell.equals("")) {
                roundDraw = false;
                break;
            }
        }

        if (roundDraw) {
            System.out.println("Game ended in a draw!");
            gameActive = false;
            return;
        }

        handlePlayerChange();
    }

    // Handle player's input
    private static void handleCellClick() {
        System.out.println("Player " + currentPlayer + ", choose your move (1-9):");
        int cellIndex = scanner.nextInt() - 1;

        if (cellIndex < 0 || cellIndex > 8 || !gameState[cellIndex].equals("")) {
            System.out.println("Invalid move. Try again.");
            handleCellClick();
        } else {
            handleCellPlayed(cellIndex);
            printBoard();
            handleResultValidation();
        }
    }

    // Computer makes a move by choosing a random available cell
    private static void handleComputerMove() {
        Random random = new Random();
        int cellIndex;

        do {
            cellIndex = random.nextInt(9);
        } while (!gameState[cellIndex].equals(""));

        System.out.println("Computer chooses: " + (cellIndex + 1));
        handleCellPlayed(cellIndex);
        printBoard();
        handleResultValidation();
    }

    // Restart the game
    private static void handleRestartGame() {
        gameActive = true;
        currentPlayer = "X";
        gameState = new String[] { "", "", "", "", "", "", "", "", "" };
        System.out.println("Game restarted!");
        printBoard();
    }

    public static void main(String[] args) {
        System.out.println("Welcome to Tic Tac Toe!");
        printBoard();

        while (gameActive) {
            handleCellClick();
        }

        System.out.println("Do you want to play again? (yes/no)");
        String playAgain = scanner.next();

        if (playAgain.equalsIgnoreCase("yes")) {
            handleRestartGame();
            main(null);
        } else {
            System.out.println("Thanks for playing!");
        }
    }
}
