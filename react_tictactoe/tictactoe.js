/**
 * @jsx React.DOM
 */

/**
 * A component which uses 9 Cells to create a grid.
 */
var TicTacToe = React.createClass({
  /**
   * Set the initial state.
   */
  getInitialState: function() {
    return {
      firebase: null,
      "me": null,
      // indicates current player, either 1 or -1
      "grid": [0,0,0,0,0,0,0,0,0],
      // It's convenient to keep the game_state as an int
      // 0  => waiting for another player to join
      // 1  => game has started, player 1's turn
      // -1 => game has started, player 2's turn
      // 3  => game has ended, player 1 won
      // -3 => game has ended, player 2 won
      // 4  => game has ended in a draw
      // 5  => opponent quit
      "game_state": 0,
      "move_number": 0
    }
  },

  /**
   * Called when data changes
   */
  onChange: function(data) {
    console.log("In TicTacToe: onChange");
    var val = data.val();
    this.setState(val);
  },

  /**
   * Called once we are connected.
   */
  onConnect: function(firebase, is_player1) {
    console.log("In TicTacToe: connected");
    var board = firebase.child('board');
    board.on('value', this.onChange.bind(this));
    var new_state = {"firebase": board};
    if (is_player1) {
      new_state.me = 1;
      board.update({
        "game_state": 1,
        "grid": [0,0,0,0,0,0,0,0,0],
        "move_number": 0
      });
    } else {
      new_state.me = -1;
    }
    this.setState(new_state);
  },

  /**
   * Called when we disconnect.
   */
  onDisconnect: function() {
    console.log("in TicTacToe: onDisconnect");
    if (Math.abs(this.state.game_state) > 2) {
      this.setState({"firebase": null});
    } else {
      // Game is suspended
      this.setState({"firebase": null, "game_state": 5});
    }
  },

  /**
   * Handle a click on the grid.
   */
  onClick: function(id) {
    if (this.state.game_state == this.state.me) {
      // player clicked when it was their turn to play
      var grid = this.state.grid.slice(0);
      grid[id] = this.state.game_state;
      var s = {};
      s.grid = grid;
      s.game_state = -this.state.game_state;
      s.move_number = this.state.move_number+1;
      s = this.checkGameEnd(s);
      if (this.state.firebase) {
        this.state.firebase.update(s);
      }
    }
  },

  /**
   * Ugly way to check if the game has ended.
   * Sum the grid across rows, cols and diagnals.
   * Check if any of the sums is 3 or -3.
   * Finally, the game is a draw if move_number==9.
   */
  checkGameEnd: function(state) {
    // check if either player won
    var sums = [0, 0, 0, 0, 0, 0, 0, 0];
    for (i=0; i<3; i++) {
      // diag1
      sums[6] += state.grid[i+3*i];
      // diag2
      sums[7] += state.grid[i-3*i+6];
      for (j=0; j<3; j++) {
        // rows
        sums[i] + state.grid[i+3*j];
        // cols
        sums[3+i] += state.grid[3*i+j];
      }
    }
    for (i=0; i<8; i++) {
      if (Math.abs(sums[i]) == 3) {
        state.game_state = sums[i];
        return state;
      }
    }

    // game ended in a draw
    if (state.move_number == 9) {
      state.game_state = 4;
    }
    return state;
  },

  /**
   * Render 3x3 grid using Cells.
   */
  render: function() {
    var cells = [];
    var row = [];
    for (var i=0; i<9; i++) {
      row.push(<Cell id={i} onClick={this.onClick} player={this.state.grid[i]}/>);
      if (row.length == 3) {
        cells.push(<tr>{row}</tr>);
        row = [];
      }
    }
    cells.push(<tr>{row}</tr>);
    var msg;
    switch (this.state.game_state) {
      case 1:
      case -1:
        if (this.state.game_state == this.state.me) {
          msg = <span>It is your turn to play ({Cell.getXorO(this.state.game_state)}).</span>;
        } else {
          msg = <span>Waiting for your opponent to move.</span>;
        }
        break;
      case 3:
      case -3:
        if (this.state.game_state == 3*this.state.me) {
          msg = <div><b>You win :)</b><div>Hit refresh to play against another random person.</div></div>;
        } else {
          msg = <div><b>You lost :(</b><div>Hit refresh to play against another random person.</div></div>;
        }
        break;
      case 4:
        msg = <div>This game ended in a draw. How boring...<div>Hit refresh to play against another random person.</div></div>;
        break;
      case 5:
        msg = <div><b>Sorry, your opponent disconnected :(</b><div>Hit refresh to play against another random person.</div></div>;
        break;
      case 0:
        msg = <div><b>Waiting for an opponent to join</b></div>;
        break;
      default:
        throw "unexpected state:"+this.state.game_state;
    }

    return <span id="tictactoe"><table>{cells}</table>{msg}</span>;
  }
});
