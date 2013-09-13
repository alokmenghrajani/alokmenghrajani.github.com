/**
 * @jsx React.DOM
 */

/**
 * Ths game just contains a TicTacToe and a Chat.
 */
var Game = React.createClass({
  /**
   * Called when two players are connected together.
   */
  onConnect: function(node, is_player1) {
    this.refs.tictactoe.onConnect(node, is_player1);
    this.refs.chat.onConnect(node, is_player1);
  },

  /**
   * Called when two players are no longer connected.
   */
  onDisconnect: function() {
    this.refs.tictactoe.onDisconnect();
    this.refs.chat.onDisconnect();
  },

  /**
   * Render a TicTacToe and a Chat
   */
  render: function() {
    var table = <div class="span6"><TicTacToe ref="tictactoe" player_id={this.props.id}/></div>;
    var chat = <div class="span6"><Chat ref="chat" player_id={this.props.id}/></div>;
    return <div id="inner1" class="row-fluid">{table}{chat}</div>;
  }
});
