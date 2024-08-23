=begin
Ruby Version of Tic Tac Toe
  To Play: run "ruby TicTacToe.rb" in the terminal.
=end

# Define the game board as a 3x3 grid
class TicTacToe
  def initialize
    # Initialize the game state
    @board = Array.new(9, " ")  # 9 spaces for a 3x3 board
    @current_player = "X"       # Start with player X
    @game_active = true         # Game is active at the beginning
  end

  # Display the game board
  def display_board
    puts " #{@board[0]} | #{@board[1]} | #{@board[2]} "
    puts "-----------"
    puts " #{@board[3]} | #{@board[4]} | #{@board[5]} "
    puts "-----------"
    puts " #{@board[6]} | #{@board[7]} | #{@board[8]} "
  end

  # Make a move on the board
  def make_move(index)
    if valid_move?(index)
      @board[index] = @current_player
      check_game_status
      switch_player
    else
      puts "Invalid move. Try again."
    end
  end

  # Check if the move is valid (i.e., the cell is empty)
  def valid_move?(index)
    index.between?(0, 8) && @board[index] == " "
  end

  # Switch the current player
  def switch_player
    @current_player = @current_player == "X" ? "O" : "X"
  end

  # Check the game status for a win, draw, or continue
  def check_game_status
    if winner?
      display_board
      puts "Player #{@current_player} wins!"
      @game_active = false
    elsif draw?
      display_board
      puts "The game is a draw!"
      @game_active = false
    end
  end

  # Check if there is a winner
  def winner?
    winning_combinations.any? do |combination|
      values = combination.map { |index| @board[index] }
      values.uniq.length == 1 && values.first != " "
    end
  end

  # Check if the game is a draw
  def draw?
    @board.none? { |cell| cell == " " }
  end

  # Define winning combinations for the board
  def winning_combinations
    [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
      [0, 4, 8], [2, 4, 6]              # Diagonals
    ]
  end

  # Start a new game
  def play
    while @game_active
      display_board
      print "Player #{@current_player}, enter your move (0-8): "
      move = gets.to_i
      make_move(move)
    end
  end
end

# Run the game
TicTacToe.new.play
