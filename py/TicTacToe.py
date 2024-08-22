"""

Python Version of Tic Tac Toe

  To Play: run "python3 TicTacToe.py" in the terminal.

""" 

import random

# Store current player
current_player = "X"

# Store game state
game_state = ["", "", "", "", "", "", "", "", ""]

# Store game status
game_active = True

# Winning conditions
winning_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

def print_board():
    """
    Display the game board.
    """
    for i in range(9):
        # Print cell value or cell number if empty
        if game_state[i] == "":
            print(i + 1, end=" ")
        else:
            print(game_state[i], end=" ")
        
        # Print vertical divider or line break
        if (i + 1) % 3 != 0:
            print("|", end=" ")
        elif i != 8:
            print("\n---------")
    print()

def handle_cell_played(index):
    """
    Update the game state to reflect the played move.
    
    :param index: The index of the cell that was played.
    """
    global game_state
    game_state[index] = current_player

def handle_player_change():
    """
    Change the current player and handle computer move if needed.
    """
    global current_player
    # Switch player between 'X' and 'O'
    current_player = "O" if current_player == "X" else "X"

    # If the new player is 'O', make a move (computer turn)
    if current_player == "O":
        handle_computer_move()

def handle_result_validation():
    """
    Check whether the game ended in a win, draw, or if there are still moves to be played.
    """
    global game_active
    round_won = False

    # Check all winning conditions
    for condition in winning_conditions:
        a, b, c = game_state[condition[0]], game_state[condition[1]], game_state[condition[2]]
        # If all three cells match and are not empty, we have a winner
        if a == b == c and a != "":
            round_won = True
            break

    # Announce win and end game if there's a winner
    if round_won:
        print(f"Player {current_player} has won!")
        game_active = False
        return

    # Check if the game is a draw (no empty cells left)
    if not any(cell == "" for cell in game_state):
        print("Game ended in a draw!")
        game_active = False
        return

    # Change player turn if the game is still active
    handle_player_change()

def handle_cell_click():
    """
    Handle player's input and continue the game flow.
    """
    global game_active
    if not game_active:
        return

    print(f"Player {current_player}, choose your move (1-9):")
    try:
        cell_index = int(input()) - 1
    except ValueError:
        print("Invalid input. Please enter a number between 1 and 9.")
        handle_cell_click()
        return

    # Validate move
    if cell_index < 0 or cell_index > 8 or game_state[cell_index] != "":
        print("Invalid move. Try again.")
        handle_cell_click()
    else:
        handle_cell_played(cell_index)
        print_board()
        handle_result_validation()

def handle_computer_move():
    """
    Computer makes a move by choosing a random available cell.
    """
    if not game_active:
        return

    # Find all available cells
    available_cells = [index for index, cell in enumerate(game_state) if cell == ""]
    if not available_cells:
        return

    # Choose a random cell from the available cells
    cell_index = random.choice(available_cells)
    print(f"Computer chooses: {cell_index + 1}")
    handle_cell_played(cell_index)
    print_board()
    handle_result_validation()

def handle_restart_game():
    """
    Restart the game by resetting game variables and board.
    """
    global game_active, current_player, game_state
    game_active = True
    current_player = "X"
    game_state = ["", "", "", "", "", "", "", "", ""]
    print("Game restarted!")
    print_board()

def main():
    """
    Main game loop that controls the flow of the game.
    """
    print("Welcome to Tic Tac Toe!")
    print_board()

    while game_active:
        handle_cell_click()

    print("Do you want to play again? (yes/no)")
    play_again = input().strip().lower()

    if play_again == "yes":
        handle_restart_game()
        main()
    else:
        print("Thanks for playing!")

if __name__ == "__main__":
    main()
